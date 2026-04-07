import React, { useState, useEffect } from 'react';
import * as Icons from 'lucide-react';

export const FixedExpenseItem = ({ category, value, onUpdate }) => {
  const formatForDisplay = (val) => val > 0 ? String(val).replace('.', ',') : '';

  const [inputValue, setInputValue] = useState(formatForDisplay(value));
  const Icon = Icons[category.icon] || Icons.Circle;

  useEffect(() => {
    setInputValue(formatForDisplay(value));
  }, [value]);

  const handleBlur = () => {
    const numValue = Number(String(inputValue).replace(',', '.'));
    if (!Number.isNaN(numValue) && numValue >= 0) {
      onUpdate(category.id, numValue);
      setInputValue(formatForDisplay(numValue));
    } else {
      setInputValue(formatForDisplay(value)); // revert on invalid string
    }
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex items-center justify-between p-4 bg-surface rounded-xl border border-border-subtle hover:bg-surface-hover transition-colors mb-3">
      <div className="flex items-center space-x-4">
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center bg-opacity-10" 
          style={{ backgroundColor: `${category.color}1A`, color: category.color }}
        >
          <Icon size={20} />
        </div>
        <span className="font-medium text-text-primary">{category.label}</span>
      </div>
      
      <div className="relative w-32">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary">R$</span>
        <input
          type="text"
          value={inputValue || ''}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="0,00"
          className="w-full bg-background border border-border-subtle rounded-lg py-2 pl-9 pr-3 text-right text-text-primary focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
        />
      </div>
    </div>
  );
};
