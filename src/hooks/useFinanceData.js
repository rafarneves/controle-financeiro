import { useState, useEffect, useMemo, useCallback } from 'react';
import { api } from '../services/api';
import { calculateTotals } from '../utils/calculateTotals';
import { useAuth } from '../contexts/AuthContext';

export const useFinanceData = (monthKey) => {
  const [allData, setAllData] = useState({});
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  // Carrega os dados persistentes do backend MySQL ao iniciar.
  useEffect(() => {
    const fetchData = async () => {
      if (!user) return;
      try {
        setLoading(true);
        const { data } = await api.get('/finance');
        setAllData(data || {});
      } catch (error) {
        console.error('Failed to load finance data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [user]);

  // Função genérica para salvar no backend
  const syncToBackend = async (key, monthPayload) => {
    try {
      await api.post('/finance', { monthKey: key, data: monthPayload });
    } catch (error) {
      console.error('Failed to save finance data to server', error);
    }
  };

  const monthData = useMemo(() => {
    return allData[monthKey] || { salary: 0, fixed: {}, extras: [] };
  }, [allData, monthKey]);

  const updateSalary = useCallback((value) => {
    setAllData((prev) => {
      const currentMonthData = prev[monthKey] || { salary: 0, fixed: {}, extras: [] };
      const updatedMonthData = {
        ...currentMonthData,
        salary: value,
      };
      
      const newState = {
        ...prev,
        [monthKey]: updatedMonthData,
      };
      syncToBackend(monthKey, updatedMonthData);
      return newState;
    });
  }, [monthKey]);

  const updateFixedExpense = useCallback((categoryId, value) => {
    setAllData((prev) => {
      const currentMonthData = prev[monthKey] || { salary: 0, fixed: {}, extras: [] };
      const updatedMonthData = {
        ...currentMonthData,
        fixed: {
          ...currentMonthData.fixed,
          [categoryId]: value,
        },
      };

      const newState = {
        ...prev,
        [monthKey]: updatedMonthData,
      };
      syncToBackend(monthKey, updatedMonthData);
      return newState;
    });
  }, [monthKey]);

  const addExtra = useCallback(({ description, value, category, date }) => {
    setAllData((prev) => {
      const currentMonthData = prev[monthKey] || { salary: 0, fixed: {}, extras: [] };
      const updatedMonthData = {
        ...currentMonthData,
        extras: [
          ...currentMonthData.extras,
          {
            id: crypto.randomUUID(),
            description,
            value,
            category,
            date: date || new Date().toISOString().split('T')[0],
          },
        ],
      };

      const newState = {
        ...prev,
        [monthKey]: updatedMonthData,
      };
      syncToBackend(monthKey, updatedMonthData);
      return newState;
    });
  }, [monthKey]);

  const removeExtra = useCallback((id) => {
    setAllData((prev) => {
      const currentMonthData = prev[monthKey] || { salary: 0, fixed: {}, extras: [] };
      const updatedMonthData = {
        ...currentMonthData,
        extras: currentMonthData.extras.filter((e) => e.id !== id),
      };

      const newState = {
        ...prev,
        [monthKey]: updatedMonthData,
      };
      syncToBackend(monthKey, updatedMonthData);
      return newState;
    });
  }, [monthKey]);

  const totals = useMemo(() => calculateTotals(monthData), [monthData]);

  return {
    monthData,
    allData,
    updateSalary,
    updateFixedExpense,
    addExtra,
    removeExtra,
    totals,
    loading
  };
};
