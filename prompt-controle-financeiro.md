# Prompt — Sistema de Controle Financeiro Pessoal

---

## Contexto geral

Crie um **sistema de controle financeiro pessoal** completo, usando **React**, **Tailwind CSS** e **Recharts** para gráficos. O sistema deve ter um visual moderno, dark mode, com identidade visual coesa e refinada — não genérica.

O sistema será usado por uma única pessoa para controlar suas finanças mensais. Os dados devem ser persistidos no **localStorage** do navegador para sobreviver a recarregamentos. No futuro, será integrado a um banco de dados, então o código deve estar preparado para isso (camada de serviços isolada).

---

## Stack e libs

- **React** (com hooks: useState, useEffect, useCallback, useMemo)
- **Tailwind CSS** (para toda estilização)
- **Recharts** (para gráficos: PieChart, BarChart, LineChart)
- **date-fns** (para manipulação de datas e nomes dos meses)
- **lucide-react** (para ícones)

---

## Arquitetura e Clean Code

### Estrutura de pastas

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx
│   │   └── MonthNavigator.jsx
│   ├── dashboard/
│   │   ├── MetricCard.jsx
│   │   ├── ProgressBar.jsx
│   │   └── SummaryPanel.jsx
│   ├── fixed/
│   │   ├── FixedExpenseList.jsx
│   │   └── FixedExpenseItem.jsx
│   ├── extras/
│   │   ├── ExtraExpenseForm.jsx
│   │   └── ExtraExpenseList.jsx
│   └── charts/
│       ├── CategoryPieChart.jsx
│       ├── MonthlyBarChart.jsx
│       └── BalanceLineChart.jsx
├── hooks/
│   ├── useFinanceData.js       ← lógica central de estado e persistência
│   └── useMonthNavigation.js   ← navegação entre meses
├── services/
│   └── storageService.js       ← camada de persistência (localStorage hoje, API futuramente)
├── constants/
│   └── categories.js           ← definição das categorias fixas
├── utils/
│   ├── formatCurrency.js       ← formatar valores em R$
│   └── calculateTotals.js      ← cálculos de totais, saldo e percentuais
├── App.jsx
└── main.jsx
```

### Princípios de Clean Code a seguir

1. **Single Responsibility**: cada componente e hook tem uma única responsabilidade.
2. **Separação de concerns**: lógica de negócio nos hooks, persistência nos services, UI nos components.
3. **Nomes descritivos**: variáveis, funções e componentes com nomes claros em inglês (exceto comentários).
4. **Sem lógica inline**: toda lógica não-trivial deve estar em funções nomeadas.
5. **Imutabilidade**: nunca mutar estado diretamente — sempre criar novos objetos/arrays.
6. **Abstrair o storage**: o `storageService.js` deve expor funções `getData()` e `saveData()`. Quando migrar para API, só esse arquivo muda.
7. **useMemo para cálculos**: totais e derivações do estado devem usar `useMemo` para evitar recalcular desnecessariamente.

---

## Modelo de dados

### Chave do localStorage
```
financeApp_data
```

### Estrutura JSON
```json
{
  "2025-04": {
    "salary": 5000,
    "fixed": {
      "nubank": 1200,
      "combustivel": 300,
      "academia": 100,
      "saude": 250,
      "personal": 400,
      "mei": 75
    },
    "extras": [
      {
        "id": "uuid-aqui",
        "description": "Consulta médica",
        "value": 180,
        "category": "Saúde",
        "date": "2025-04-10"
      }
    ]
  }
}
```

A **chave do mês** é sempre no formato `YYYY-MM` (ex: `"2025-04"`).

---

## Categorias fixas

Arquivo `src/constants/categories.js`:

```js
export const FIXED_CATEGORIES = [
  { id: 'nubank',      label: 'Fatura Nubank',  color: '#7C3AED', icon: 'CreditCard'   },
  { id: 'combustivel', label: 'Combustível',     color: '#F59E0B', icon: 'Fuel'         },
  { id: 'academia',    label: 'Academia',         color: '#10B981', icon: 'Dumbbell'     },
  { id: 'saude',       label: 'Plano de Saúde',  color: '#3B82F6', icon: 'Heart'        },
  { id: 'personal',    label: 'Personal',         color: '#F97316', icon: 'User'         },
  { id: 'mei',         label: 'MEI',              color: '#6B7280', icon: 'Briefcase'    },
];

export const EXTRA_CATEGORIES = [
  'Alimentação',
  'Saúde',
  'Lazer',
  'Vestuário',
  'Educação',
  'Transporte',
  'Outros',
];
```

---

## Camada de serviço — `storageService.js`

```js
const STORAGE_KEY = 'financeApp_data';

export const storageService = {
  getData: () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  },

  saveData: (data) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save data:', error);
    }
  },
};
```

> Quando migrar para API, substitua apenas esse arquivo por chamadas HTTP.

---

## Hook principal — `useFinanceData.js`

Deve expor:
```js
{
  monthData,           // dados do mês atual { salary, fixed, extras }
  allData,             // todos os meses (para gráficos históricos)
  updateSalary,        // (value: number) => void
  updateFixedExpense,  // (categoryId: string, value: number) => void
  addExtra,            // ({ description, value, category }) => void
  removeExtra,         // (id: string) => void
  totals,              // { totalFixed, totalExtra, totalExpenses, balance, percentUsed }
}
```

- Salvar no localStorage sempre que o estado mudar (useEffect).
- Inicializar a partir do localStorage no mount.
- Usar `useMemo` para calcular `totals`.

---

## Hook de navegação — `useMonthNavigation.js`

```js
// Deve expor:
{
  currentYear,   // number
  currentMonth,  // number (0-indexed)
  monthKey,      // string "YYYY-MM"
  monthLabel,    // string "abril de 2025"
  goToPrevMonth, // () => void
  goToNextMonth, // () => void
}
```

---

## Utilitários

### `formatCurrency.js`
```js
export const formatCurrency = (value) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value ?? 0);
```

### `calculateTotals.js`
```js
export const calculateTotals = (monthData) => {
  const totalFixed = Object.values(monthData?.fixed ?? {})
    .reduce((sum, val) => sum + val, 0);

  const totalExtra = (monthData?.extras ?? [])
    .reduce((sum, e) => sum + e.value, 0);

  const totalExpenses = totalFixed + totalExtra;
  const salary = monthData?.salary ?? 0;
  const balance = salary - totalExpenses;
  const percentUsed = salary > 0 ? Math.min((totalExpenses / salary) * 100, 100) : 0;

  return { totalFixed, totalExtra, totalExpenses, balance, percentUsed };
};
```

---

## Visual e Design

### Tema
- **Dark mode** como padrão absoluto
- Fundo principal: `#0F0F11` (quase preto)
- Superfícies/cards: `#1A1A1F` e `#22222A`
- Bordas sutis: `#2E2E3A`
- Texto primário: `#F1F1F3`
- Texto secundário: `#8B8B9E`
- Verde (receita/positivo): `#10B981`
- Vermelho (despesa/negativo): `#EF4444`
- Âmbar (aviso): `#F59E0B`
- Roxo (accent): `#7C3AED`

### Tipografia
- Use **Google Fonts**: `Syne` para headings e `DM Sans` para o restante.
- Heading principal: `font-family: 'Syne', sans-serif; font-weight: 700`
- Body: `font-family: 'DM Sans', sans-serif; font-weight: 400`

### Layout geral
- Header fixo no topo com nome do app, mês atual e navegação de mês (setas ← →)
- Abaixo do header: 4 **metric cards** em grid (Salário | Fixos | Avulsos | Saldo)
- Barra de progresso do orçamento abaixo dos cards (com cor dinâmica: verde → âmbar → vermelho conforme o percentual)
- **Tabs** para navegar entre as seções: Gastos Fixos | Gastos Avulsos | Gráficos
- Layout responsivo (mobile-first)

### Metric Cards
Cada card deve ter:
- Ícone pequeno no canto superior direito
- Label pequena (12px, cor secundária)
- Valor grande (24px, bold, cor semântica)
- Borda sutil e fundo levemente diferente do bg

### Gastos Fixos
- Lista com todas as 6 categorias sempre visíveis
- Cada item: ícone colorido da categoria + nome + input de valor à direita
- Input salva automaticamente ao sair do campo (`onBlur`)

### Gastos Avulsos
- Formulário no topo com campos: Descrição | Valor | Categoria | Botão Adicionar
- Lista abaixo com todos os lançamentos do mês
- Cada item: descrição, categoria (badge colorido), valor, botão de excluir (ícone de lixeira)

### Gráficos (Recharts)
1. **PieChart / Donut** — Gastos por categoria (fixos + avulsos agrupados por categoria)
   - Legenda customizada abaixo do gráfico
   - Tooltip formatado em R$

2. **BarChart** — Comparativo dos últimos 6 meses (barras para Salário e Gastos, lado a lado)
   - Eixo Y formatado em R$
   - Cores: verde para salário, vermelho para gastos

3. **LineChart** — Evolução do saldo nos últimos 6 meses
   - Linha roxa com área preenchida com gradiente
   - Tooltip com valor do saldo

---

## Funcionalidades obrigatórias

- [x] Cadastro e atualização do salário do mês
- [x] Atualização dos 6 gastos fixos (Nubank, Combustível, Academia, Plano de Saúde, Personal, MEI)
- [x] Adição e remoção de gastos avulsos com categoria
- [x] Cálculo automático de saldo (salário − fixos − avulsos)
- [x] Barra de progresso do orçamento com cor dinâmica
- [x] Navegação entre meses (manter histórico de todos os meses)
- [x] Persistência em localStorage
- [x] 3 gráficos (donut, barras, linha)
- [x] Layout responsivo

---

## Passo a passo de desenvolvimento

Siga esta ordem para desenvolver:

**1. Setup**
- Criar projeto com Vite + React
- Instalar dependências: tailwindcss, recharts, date-fns, lucide-react
- Configurar Tailwind com tema customizado (cores acima como variáveis)
- Importar as fontes Syne e DM Sans via Google Fonts no index.html

**2. Constantes e utilitários** (sem dependências)
- `src/constants/categories.js`
- `src/utils/formatCurrency.js`
- `src/utils/calculateTotals.js`

**3. Camada de serviço**
- `src/services/storageService.js`

**4. Hooks**
- `src/hooks/useMonthNavigation.js`
- `src/hooks/useFinanceData.js` (usa o storageService e calculateTotals)

**5. Componentes base** (do menor pro maior)
- `MetricCard.jsx`
- `ProgressBar.jsx`
- `MonthNavigator.jsx`
- `Header.jsx`

**6. Seção de gastos fixos**
- `FixedExpenseItem.jsx`
- `FixedExpenseList.jsx`

**7. Seção de gastos avulsos**
- `ExtraExpenseForm.jsx`
- `ExtraExpenseList.jsx`

**8. Gráficos**
- `CategoryPieChart.jsx`
- `MonthlyBarChart.jsx`
- `BalanceLineChart.jsx`

**9. Integração final**
- `SummaryPanel.jsx` (junta os 4 metric cards e a progress bar)
- `App.jsx` (orquestra tudo com as tabs)

---

## Observações finais

- Todos os inputs numéricos devem aceitar vírgula como separador decimal (converter antes de salvar)
- IDs dos gastos avulsos devem ser gerados com `crypto.randomUUID()`
- O app não precisa de autenticação nesta versão
- Comentários no código devem ser em português, código em inglês
- Evitar `any` e valores hardcoded fora das constantes
- O código deve estar pronto para receber uma prop/context de API futuramente sem grandes refatorações
