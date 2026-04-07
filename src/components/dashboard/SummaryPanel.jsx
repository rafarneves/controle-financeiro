import React, { useState, useEffect } from 'react';
import { MetricCard } from './MetricCard';
import { ProgressBar } from './ProgressBar';

export const SummaryPanel = ({ totals, salary, onUpdateSalary }) => {
  const formatForDisplay = (val) => val > 0 ? String(val).replace('.', ',') : '';

  const [localSalary, setLocalSalary] = useState(formatForDisplay(salary));

  useEffect(() => {
    setLocalSalary(formatForDisplay(salary));
  }, [salary]);

  const handleSalaryBlur = () => {
    const numValue = Number(String(localSalary).replace(',', '.'));
    if (!Number.isNaN(numValue) && numValue >= 0) {
      onUpdateSalary(numValue);
      setLocalSalary(formatForDisplay(numValue));
    } else {
      setLocalSalary(formatForDisplay(salary));
    }
  };

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-surface rounded-xl p-5 border border-border-subtle relative overflow-hidden transition-colors hover:bg-surface-hover">
          <div className="flex justify-between items-start mb-2">
            <span className="text-text-secondary text-sm font-medium">Salário</span>
            <div className={`p-2 rounded-lg bg-opacity-10 bg-brand-success/10`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-success"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
            </div>
          </div>
          <div className="mt-2 relative">
            <span className="absolute left-0 top-1/2 -translate-y-1/2 text-text-secondary font-bold text-lg">R$</span>
            <input
              type="text"
              value={localSalary || ''}
              onChange={(e) => setLocalSalary(e.target.value)}
              onBlur={handleSalaryBlur}
              placeholder="0,00"
              className="w-full bg-transparent border-none py-0 pl-8 pr-0 text-text-primary focus:outline-none focus:ring-0 text-2xl font-bold h-8"
            />
          </div>
        </div>
        
        <MetricCard
          title="Gastos Fixos"
          value={totals.totalFixed}
          iconName="Target"
          colorClass="var(--color-brand-warning, #F59E0B)"
        />
        
        <MetricCard
          title="Gastos Avulsos"
          value={totals.totalExtra}
          iconName="ShoppingBag"
          colorClass="var(--color-brand-danger, #EF4444)"
        />
        
        <MetricCard
          title="Saldo Livre"
          value={totals.balance}
          iconName="PiggyBank"
          colorClass="var(--color-brand-accent, #7C3AED)"
        />
      </div>
      
      <ProgressBar percentUsed={totals.percentUsed} />
    </div>
  );
};
