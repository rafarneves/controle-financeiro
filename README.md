# 💰 Aplicação de Controle Financeiro

> Uma aplicação moderna e completa para gestão de finanças pessoais, projetada para oferecer clareza, segurança e controle total sobre seu dinheiro.

---

## ✨ Funcionalidades

- 🔒 **Autenticação Segura:** Sistema de Login e Registro com senhas criptografadas e JWT.
- 📊 **Dashboard Dinâmico:** Visualização clara do seu saldo, receitas e despesas com gráficos interativos.
- 🧾 **Gestão de Transações:** Adicione, edite e remova despesas fixas e variáveis com facilidade.
- 📅 **Histórico Mensal:** Acompanhe o fluxo de caixa de cada mês de forma independente.
- 🌓 **Interface Premium:** Design moderno com suporte a Dark Mode e totalmente responsivo.

---

## 🚀 Tecnologias

Este projeto utiliza o que há de mais moderno no ecossistema JavaScript:

### Frontend

- **React 19 + Vite** (Performance e rapidez)
- **Tailwind CSS 4** (Estilização moderna e utilitária)
- **Lucide Icons** (Ícones elegantes)
- **Recharts** (Gráficos visualmente atraentes)
- **Axios** (Comunicação com a API)

### Backend

- **Node.js + Express** (Core da API)
- **Prisma ORM** (Gestão de banco de dados simplificada)
- **PostgreSQL (Supabase)** (Banco de dados relacional na nuvem)
- **JWT + Bcrypt** (Segurança e proteção de dados)

---

## 🛠️ Como rodar o projeto localmente

### Pré-requisitos

- Node.js instalado
- PostgreSQL rodando localmente (ou uma URL do Supabase)

### 1. Configure o Backend

```bash
cd backend
npm install
# Configure seu arquivo .env com DATABASE_URL e JWT_SECRET
npx prisma db push
npm run dev
```

### 2. Configure o Frontend

```bash
# Na raiz do projeto
npm install
npm run dev
```

---

## 🌐 Deploy (Vercel)

Este projeto foi configurado para rodar nativamente na **Vercel**.

- **Frontend & Backend:** Ambos são servidos no mesmo domínio através de _Serverless Functions_.
- **Configuração:** Veja o arquivo `vercel.json` na raiz para detalhes do roteamento.

---

## 📝 Licença

Este projeto está sob a licença [MIT](LICENSE.md).

---

Feito com ❤️ por [Rafael](https://github.com/SeuUsuario)
