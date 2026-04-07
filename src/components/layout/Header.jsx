import React from 'react';
import { Wallet } from 'lucide-react';
import { MonthNavigator } from './MonthNavigator';

export const Header = ({ monthLabel, goToPrevMonth, goToNextMonth }) => {
  return (
    <header className="bg-surface border-b border-border-subtle sticky top-0 z-10 w-full">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-brand-accent flex items-center justify-center">
            <Wallet size={24} className="text-white" />
          </div>
          <h1 className="text-xl tracking-tight hidden sm:block">Controle Financeiro</h1>
        </div>
        
        <MonthNavigator 
          monthLabel={monthLabel} 
          goToPrevMonth={goToPrevMonth} 
          goToNextMonth={goToNextMonth} 
        />
      </div>
    </header>
  );
};
