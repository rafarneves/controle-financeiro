import React from 'react';
import * as Icons from 'lucide-react';
import { formatCurrency } from '../../utils/formatCurrency';

export const MetricCard = ({ title, value, iconName, colorClass, isCurrency = true }) => {
  const Icon = Icons[iconName] || Icons.Circle;

  return (
    <div className="bg-surface rounded-xl p-5 border border-border-subtle relative overflow-hidden transition-colors hover:bg-surface-hover">
      <div className="flex justify-between items-start mb-2">
        <span className="text-text-secondary text-sm font-medium">{title}</span>
        <div className={`p-2 rounded-lg bg-opacity-10`} style={{ backgroundColor: `${colorClass}1A` }}>
          <Icon size={20} style={{ color: colorClass }} />
        </div>
      </div>
      <div className="mt-2">
        <h3 className="text-2xl font-bold text-text-primary" style={{ color: colorClass }}>
          {isCurrency ? formatCurrency(value) : value}
        </h3>
      </div>
    </div>
  );
};
