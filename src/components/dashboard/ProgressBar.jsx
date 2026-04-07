import React, { useMemo } from 'react';

export const ProgressBar = ({ percentUsed }) => {
  const colorClass = useMemo(() => {
    if (percentUsed < 70) return 'bg-brand-success';
    if (percentUsed < 90) return 'bg-brand-warning';
    return 'bg-brand-danger';
  }, [percentUsed]);

  return (
    <div className="w-full mt-6">
      <div className="flex justify-between items-end mb-2">
        <span className="text-text-secondary text-sm font-medium">Orçamento utilizado</span>
        <span className="text-text-primary text-sm font-bold">{percentUsed.toFixed(1)}%</span>
      </div>
      <div className="h-3 w-full bg-surface-hover rounded-full overflow-hidden border border-border-subtle">
        <div
          className={`h-full ${colorClass} transition-all duration-500 ease-out`}
          style={{ width: `${percentUsed}%` }}
        />
      </div>
    </div>
  );
};
