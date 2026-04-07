import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { FIXED_CATEGORIES } from '../../constants/categories';
import { formatCurrency } from '../../utils/formatCurrency';

export const CategoryPieChart = ({ monthData }) => {
  const data = useMemo(() => {
    const categoriesMap = new Map();

    // Sum fixed expenses
    FIXED_CATEGORIES.forEach((cat) => {
      const val = Number(monthData?.fixed?.[cat.id]) || 0;
      if (val > 0) {
        categoriesMap.set(cat.label, { name: cat.label, value: val, color: cat.color });
      }
    });

    // Sum extra expenses
    const extras = monthData?.extras || [];
    extras.forEach((ext) => {
      const val = Number(ext.value) || 0;
      if (val > 0) {
        const existing = categoriesMap.get(ext.category);
        if (existing) {
          existing.value += val;
        } else {
          // generate color based on string
          const colorHash = Array.from(ext.category).reduce((acc, char) => acc + char.charCodeAt(0), 0);
          const hue = colorHash % 360;
          categoriesMap.set(ext.category, { 
            name: ext.category, 
            value: val, 
            color: `hsl(${hue}, 70%, 50%)` 
          });
        }
      }
    });

    return Array.from(categoriesMap.values()).sort((a, b) => b.value - a.value);
  }, [monthData]);

  if (data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-text-secondary">
        Sem dados para exibir
      </div>
    );
  }

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-surface border border-border-subtle p-3 rounded-xl shadow-lg">
          <p className="font-medium text-text-primary">{payload[0].name}</p>
          <p className="font-bold text-brand-danger">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={2}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36} 
            iconType="circle"
            wrapperStyle={{ fontSize: '12px', color: '#F1F1F3' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
