import React from 'react';
import { Trash2 } from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';
import { parseISO, format } from 'date-fns';

export const ExtraExpenseList = ({ expenses = [], onRemove }) => {
  if (expenses.length === 0) {
    return (
      <div className="bg-surface rounded-2xl p-8 border border-border-subtle text-center">
        <p className="text-text-secondary">Nenhum gasto avulso registrado neste mês.</p>
      </div>
    );
  }

  return (
    <div className="bg-surface rounded-2xl border border-border-subtle overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border-subtle bg-surface-hover">
              <th className="p-4 text-sm font-medium text-text-secondary font-syne">Data</th>
              <th className="p-4 text-sm font-medium text-text-secondary font-syne">Descrição</th>
              <th className="p-4 text-sm font-medium text-text-secondary font-syne">Categoria</th>
              <th className="p-4 text-sm font-medium text-text-secondary font-syne text-right">Valor</th>
              <th className="p-4 text-sm font-medium text-text-secondary font-syne w-16"></th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => {
              const dateStr = expense.date ? format(parseISO(expense.date), 'dd/MM/yyyy') : '-';
              
              return (
                <tr key={expense.id} className="border-b border-border-subtle hover:bg-surface-hover/50 transition-colors">
                  <td className="p-4 text-text-secondary whitespace-nowrap text-sm">
                    {dateStr}
                  </td>
                  <td className="p-4 font-medium text-text-primary">
                    {expense.description}
                  </td>
                  <td className="p-4">
                    <span className="inline-block px-2.5 py-1 pt-1.5 min-w-[100px] text-center rounded-full text-xs font-bold bg-border-subtle text-text-primary">
                      {expense.category}
                    </span>
                  </td>
                  <td className="p-4 text-right font-bold text-brand-danger whitespace-nowrap">
                    {formatCurrency(expense.value)}
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => onRemove(expense.id)}
                      className="p-2 text-text-secondary hover:text-brand-danger bg-transparent hover:bg-brand-danger/10 rounded-lg transition-colors"
                      aria-label="Excluir gasto"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
