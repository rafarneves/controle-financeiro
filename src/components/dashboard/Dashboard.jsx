import React, { useState } from 'react';
import { useFinanceData } from '../../hooks/useFinanceData';
import { useMonthNavigation } from '../../hooks/useMonthNavigation';
import { useAuth } from '../../contexts/AuthContext';

import { Header } from '../layout/Header';
import { SummaryPanel } from './SummaryPanel';
import { FixedExpenseList } from '../fixed/FixedExpenseList';
import { ExtraExpenseForm } from '../extras/ExtraExpenseForm';
import { ExtraExpenseList } from '../extras/ExtraExpenseList';
import { CategoryPieChart } from '../charts/CategoryPieChart';
import { MonthlyBarChart } from '../charts/MonthlyBarChart';
import { BalanceLineChart } from '../charts/BalanceLineChart';

import { LayoutDashboard, Receipt, LineChart, LogOut } from 'lucide-react';

export function Dashboard() {
  const { monthKey, monthLabel, goToPrevMonth, goToNextMonth } = useMonthNavigation();
  const {
    monthData,
    allData,
    updateSalary,
    updateFixedExpense,
    addExtra,
    removeExtra,
    totals,
  } = useFinanceData(monthKey);
  const { logout, user } = useAuth();

  const [activeTab, setActiveTab] = useState('fixos'); // 'fixos', 'avulsos', 'graficos'

  return (
    <div className="min-h-screen bg-background text-text-primary pb-20">
      <Header 
        monthLabel={monthLabel} 
        goToPrevMonth={goToPrevMonth} 
        goToNextMonth={goToNextMonth} 
      />
      {/* Navbar Adicional de Autenticação */}
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center text-sm text-text-secondary border-b border-border-subtle mb-6">
        <div>Olá, <span className="font-bold text-text-primary">{user?.name}</span></div>
        <button 
          onClick={logout}
          className="flex items-center space-x-2 hover:text-brand-accent transition"
        >
          <LogOut size={16} /> <span>Sair</span>
        </button>
      </div>

      <main className="max-w-6xl mx-auto px-4">
        <SummaryPanel 
          totals={totals}
          salary={monthData.salary}
          onUpdateSalary={updateSalary}
        />

        {/* Tabs Navigation */}
        <div className="flex space-x-1 bg-surface p-1 rounded-xl border border-border-subtle w-full max-w-md mx-auto mb-8">
          <button
            onClick={() => setActiveTab('fixos')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'fixos' 
                ? 'bg-brand-accent text-white shadow-lg' 
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
            }`}
          >
            <LayoutDashboard size={18} />
            <span>Fixos</span>
          </button>
          
          <button
            onClick={() => setActiveTab('avulsos')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'avulsos' 
                ? 'bg-brand-accent text-white shadow-lg' 
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
            }`}
          >
            <Receipt size={18} />
            <span>Avulsos</span>
          </button>
          
          <button
            onClick={() => setActiveTab('graficos')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
              activeTab === 'graficos' 
                ? 'bg-brand-accent text-white shadow-lg' 
                : 'text-text-secondary hover:text-text-primary hover:bg-surface-hover'
            }`}
          >
            <LineChart size={18} />
            <span>Resumo</span>
          </button>
        </div>

        {/* Content Area */}
        <div className="mt-4 transition-all duration-300">
          {activeTab === 'fixos' && (
            <div className="max-w-2xl mx-auto animation-fade-in">
              <FixedExpenseList 
                fixedExpenses={monthData.fixed} 
                onUpdateExpense={updateFixedExpense} 
              />
            </div>
          )}

          {activeTab === 'avulsos' && (
            <div className="animation-fade-in">
              <ExtraExpenseForm onAdd={addExtra} />
              <ExtraExpenseList 
                expenses={monthData.extras} 
                onRemove={removeExtra} 
              />
            </div>
          )}

          {activeTab === 'graficos' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animation-fade-in">
              <div className="bg-surface rounded-2xl p-6 border border-border-subtle">
                <h3 className="text-xl mb-6">Gastos por Categoria</h3>
                <CategoryPieChart monthData={monthData} />
              </div>
              
              <div className="bg-surface rounded-2xl p-6 border border-border-subtle">
                <h3 className="text-xl mb-6">Comparativo 6 Meses</h3>
                <MonthlyBarChart allData={allData} currentKey={monthKey} />
              </div>
              
              <div className="bg-surface rounded-2xl p-6 border border-border-subtle lg:col-span-2">
                <h3 className="text-xl mb-6">Evolução do Saldo</h3>
                <BalanceLineChart allData={allData} currentKey={monthKey} />
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
