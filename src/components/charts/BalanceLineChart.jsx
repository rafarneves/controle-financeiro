import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { calculateTotals } from '../../utils/calculateTotals';

export const BalanceLineChart = ({ allData, currentKey }) => {
  const data = useMemo(() => {
    const result = [];
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
        Saldo: totals.balance
      });
    }

    return result;
  }, [allData, currentKey]);

  return (
    <div className="h-80 w-full relative">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSaldo" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#7C3AED" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#7C3AED" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#2E2E3A" />
          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#8B8B9E', fontSize: 12 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: '#8B8B9E', fontSize: 12 }} tickFormatter={(val) => `R$ ${val/1000}k`} />
          <Tooltip
            contentStyle={{ backgroundColor: '#1A1A1F', borderColor: '#2E2E3A', borderRadius: '8px' }}
            itemStyle={{ color: '#F1F1F3', fontWeight: 'bold' }}
            formatter={(value) => [new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value), 'Saldo Liquido']}
          />
          <Area type="monotone" dataKey="Saldo" stroke="#7C3AED" strokeWidth={3} fillOpacity={1} fill="url(#colorSaldo)" activeDot={{ r: 6, fill: '#7C3AED', stroke: '#1A1A1F', strokeWidth: 2 }} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
