export const calculateTotals = (monthData) => {
  const totalFixed = Object.values(monthData?.fixed ?? {})
    .reduce((sum, val) => sum + (Number(val) || 0), 0);

  const totalExtra = (monthData?.extras ?? [])
    .reduce((sum, e) => sum + (Number(e.value) || 0), 0);

  const totalExpenses = totalFixed + totalExtra;
  const salary = Number(monthData?.salary) || 0;
  const balance = salary - totalExpenses;
  const percentUsed = salary > 0 ? Math.min((totalExpenses / salary) * 100, 100) : 0;

  return { totalFixed, totalExtra, totalExpenses, balance, percentUsed };
};
