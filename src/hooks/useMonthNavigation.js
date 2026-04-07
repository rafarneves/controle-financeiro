import { useState, useCallback } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const useMonthNavigation = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const monthKey = format(currentDate, 'yyyy-MM');
  const monthLabel = format(currentDate, "MMMM 'de' yyyy", { locale: ptBR });

  const goToPrevMonth = useCallback(() => {
    setCurrentDate((prev) => subMonths(prev, 1));
  }, []);

  const goToNextMonth = useCallback(() => {
    setCurrentDate((prev) => addMonths(prev, 1));
  }, []);

  return {
    currentYear,
    currentMonth,
    monthKey,
    monthLabel,
    goToPrevMonth,
    goToNextMonth,
  };
};
