import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const MonthNavigator = ({ monthLabel, goToPrevMonth, goToNextMonth }) => {
  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={goToPrevMonth}
        className="p-2 rounded-full hover:bg-surface-hover text-text-secondary hover:text-text-primary transition-colors border border-transparent hover:border-border-subtle"
        aria-label="Mês anterior"
      >
        <ChevronLeft size={20} />
      </button>
      
      <span className="text-lg font-bold min-w-[160px] text-center capitalize">
        {monthLabel}
      </span>
      
      <button
        onClick={goToNextMonth}
        className="p-2 rounded-full hover:bg-surface-hover text-text-secondary hover:text-text-primary transition-colors border border-transparent hover:border-border-subtle"
        aria-label="Próximo mês"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};
