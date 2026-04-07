import React from 'react';
import { FIXED_CATEGORIES } from '../../constants/categories';
import { FixedExpenseItem } from './FixedExpenseItem';

export const FixedExpenseList = ({ fixedExpenses = {}, onUpdateExpense }) => {
  return (
    <div className="bg-surface rounded-2xl p-6 border border-border-subtle">
      <h2 className="text-xl mb-6">Gastos Fixos</h2>
      <div className="space-y-1">
        {FIXED_CATEGORIES.map((category) => (
          <FixedExpenseItem
            key={category.id}
            category={category}
            value={fixedExpenses[category.id] || 0}
            onUpdate={onUpdateExpense}
          />
        ))}
      </div>
    </div>
  );
};
