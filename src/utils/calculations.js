// Utility functions for financial calculations

export const calculateTotalBalance = (transactions) => {
  return transactions.reduce((total, transaction) => {
    if (transaction.type === 'income') {
      return total + transaction.amount;
    } else {
      return total - transaction.amount;
    }
  }, 0);
};

export const calculateTotalIncome = (transactions) => {
  return transactions
    .filter((t) => t.type === 'income')
    .reduce((total, t) => total + t.amount, 0);
};

export const calculateTotalExpenses = (transactions) => {
  return transactions
    .filter((t) => t.type === 'expense')
    .reduce((total, t) => total + t.amount, 0);
};

export const calculateSavings = (transactions) => {
  const income = calculateTotalIncome(transactions);
  const expenses = calculateTotalExpenses(transactions);
  return income - expenses;
};

export const getSpendingByCategory = (transactions) => {
  const spending = {};

  transactions
    .filter((t) => t.type === 'expense')
    .forEach((transaction) => {
      if (!spending[transaction.category]) {
        spending[transaction.category] = 0;
      }
      spending[transaction.category] += transaction.amount;
    });

  return Object.entries(spending).map(([name, value]) => ({ name, value }));
};

export const getBalanceTrend = (transactions) => {
  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  const trendData = [];
  let balance = 0;
  const seenDates = new Set();

  sortedTransactions.forEach((transaction) => {
    const dateObj = new Date(transaction.date); // ✅ FIX
    const dateStr = dateObj.toISOString().split('T')[0]; // ✅ SAFE

    if (!seenDates.has(dateStr)) {
      seenDates.add(dateStr);

      if (transaction.type === 'income') {
        balance += transaction.amount;
      } else {
        balance -= transaction.amount;
      }

      trendData.push({
        date: dateStr,
        balance: balance,
        formattedDate: dateObj.toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
        }),
      });
    } else {
      if (transaction.type === 'income') {
        balance += transaction.amount;
      } else {
        balance -= transaction.amount;
      }

      const lastEntry = trendData[trendData.length - 1];
      if (lastEntry.date === dateStr) {
        lastEntry.balance = balance;
      }
    }
  });

  if (trendData.length > 30) {
    return trendData.filter((_, i) => i % Math.ceil(trendData.length / 30) === 0);
  }

  return trendData;
};

export const getHighestSpendingCategory = (transactions) => {
  const spending = getSpendingByCategory(transactions);
  if (spending.length === 0) return null;

  return spending.reduce((max, current) =>
    current.value > max.value ? current : max
  );
};

export const getMonthlyComparison = (transactions) => {
  const monthlyData = {};

  transactions.forEach((transaction) => {
    const date = new Date(transaction.date); // ✅ FIX
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { income: 0, expenses: 0, month: monthKey };
    }

    if (transaction.type === 'income') {
      monthlyData[monthKey].income += transaction.amount;
    } else {
      monthlyData[monthKey].expenses += transaction.amount;
    }
  });

  return Object.values(monthlyData)
    .sort((a, b) => a.month.localeCompare(b.month))
    .map((data) => ({
      ...data,
      formattedMonth: new Date(data.month + '-01').toLocaleDateString('en-US', {
        month: 'short',
        year: '2-digit',
      }),
    }));
};

export const getAverageTransactionAmount = (transactions) => {
  if (transactions.length === 0) return 0;
  const total = transactions.reduce((sum, t) => sum + t.amount, 0);
  return total / transactions.length;
};

export const getSpendingInsights = (transactions) => {
  const expenses = transactions.filter((t) => t.type === 'expense');
  const income = transactions.filter((t) => t.type === 'income');

  const totalExpenses = calculateTotalExpenses(transactions);
  const totalIncome = calculateTotalIncome(transactions);

  const savingsRate =
    totalIncome > 0
      ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1)
      : 0;

  const highestCategory = getHighestSpendingCategory(transactions);

  const categoryPercentage =
    totalExpenses > 0
      ? ((highestCategory?.value || 0) / totalExpenses * 100).toFixed(1)
      : 0;

  return {
    savingsRate: parseFloat(savingsRate),
    highestCategory: highestCategory
      ? { ...highestCategory, percentage: parseFloat(categoryPercentage) }
      : null,
    averageExpense:
      expenses.length > 0
        ? expenses.reduce((sum, t) => sum + t.amount, 0) / expenses.length
        : 0,
    averageIncome:
      income.length > 0
        ? income.reduce((sum, t) => sum + t.amount, 0) / income.length
        : 0,
    transactionCount: transactions.length,
    monthCount: new Set(
      transactions.map((t) => {
        const d = new Date(t.date);
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      })
    ).size,
  };
};