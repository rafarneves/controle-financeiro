import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { EXTRA_CATEGORIES } from '../../constants/categories';

export const ExtraExpenseForm = ({ onAdd }) => {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [category, setCategory] = useState(EXTRA_CATEGORIES[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim() || !value) return;

    const numValue = Number(value.replace(',', '.'));
    if (isNaN(numValue) || numValue <= 0) return;

    onAdd({
      description: description.trim(),
      value: numValue,
      category,
    });

    setDescription('');
    setValue('');
    setCategory(EXTRA_CATEGORIES[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-surface p-6 rounded-2xl border border-border-subtle mb-6">
      <h3 className="text-lg font-bold mb-4 text-text-primary">Novo Gasto Avulso</h3>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="md:col-span-2">
          <label className="block text-sm text-text-secondary mb-1">Descrição</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ex: Almoço de domingo"
            className="w-full bg-background border border-border-subtle rounded-lg py-2.5 px-3 text-text-primary focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm text-text-secondary mb-1">Categoria</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full bg-background border border-border-subtle rounded-lg py-2.5 px-3 text-text-primary focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all appearance-none"
          >
            {EXTRA_CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="relative">
          <label className="block text-sm text-text-secondary mb-1">Valor (R$)</label>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="0,00"
            className="w-full bg-background border border-border-subtle rounded-lg py-2.5 px-3 text-text-primary focus:outline-none focus:border-brand-accent focus:ring-1 focus:ring-brand-accent transition-all"
            required
          />
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="flex items-center space-x-2 bg-brand-accent hover:bg-opacity-90 text-white py-2 px-6 rounded-lg font-medium transition-colors"
        >
          <Plus size={18} />
          <span>Adicionar Despesa</span>
        </button>
      </div>
    </form>
  );
};
