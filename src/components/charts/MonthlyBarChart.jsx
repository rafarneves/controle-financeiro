import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import { parseISO, format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { calculateTotals } from '../../utils/calculateTotals';

export const MonthlyBarChart = ({ allData, currentKey }) => {
  const data = useMemo(() => {
    // Pegar os 6 meses, baseados na data atual
    const result = [];
    const dateObj = new Date();
    // Use the currentKey to define "current" month if needed, but the hook holds currentKey based on calendar navigation.
    // So let's parse currentKey instead of Date.now()
    let [year, month] = currentKey.split('-');
    let baseDate = new Date(Number(year), Number(month) - 1, 1);

    for (let i = 5; i >= 0; i--) {
      const ms = subMonths(baseDate, i);
      const k = format(ms, 'yyyy-MM');
      const label = format(ms, 'MMM', { locale: ptBR }).replace('.', '');
      const monthData = allData[k] || { salary: 0, fixed: {}, extras: [] };
      const totals = calculateTotals(monthData);
      
      result.push({
        name: label,
        Receita: Number(monthData.salary) || 0,
        Despesas: totals.totalExpenses
      });
    }

    return result;
  }, [allData, currentKey]);

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2E2E3A" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8B8B9E', fontSize: 12 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8B8B9E', fontSize: 12 }} tickFormatter={(val) => `R$ ${val/1000}k`} />
          <Tooltip
            cursor={{ fill: '#22222A' }}
            contentStyle={{ backgroundColor: '#1A1A1F', borderColor: '#2E2E3A', borderRadius: '8px' }}
            itemStyle={{ fontWeight: 'bold' }}
            formatter={(value) => [new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)]}
          />
          <Legend verticalAlign="top" height={36} iconType="circle" wrapperStyle={{ fontSize: '13px' }} />
          <Bar dataKey="Receita" fill="#10B981" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Despesas" fill="#EF4444" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
