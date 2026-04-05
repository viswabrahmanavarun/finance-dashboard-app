import { useEffect } from 'react';
import useTransactionStore from '../store/transactionStore';
import { mockTransactions } from '../utils/mockData';

export const useTransactions = () => {
  const transactions = useTransactionStore((state) => state.transactions);
  const setTransactions = useTransactionStore((state) => state.setTransactions);
  const addTransaction = useTransactionStore((state) => state.addTransaction);
  const deleteTransaction = useTransactionStore((state) => state.deleteTransaction);
  const updateTransaction = useTransactionStore((state) => state.updateTransaction);
  const filters = useTransactionStore((state) => state.filters);
  const setFilters = useTransactionStore((state) => state.setFilters);
  const resetFilters = useTransactionStore((state) => state.resetFilters);
  const sortConfig = useTransactionStore((state) => state.sortConfig);
  const setSortConfig = useTransactionStore((state) => state.setSortConfig);
  const getFilteredAndSortedTransactions = useTransactionStore(
    (state) => state.getFilteredAndSortedTransactions
  );

  // Initialize with mock data on first load
  useEffect(() => {
    if (transactions.length === 0) {
      setTransactions(mockTransactions);
    }
  }, []);

  return {
    transactions,
    setTransactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    filters,
    setFilters,
    resetFilters,
    sortConfig,
    setSortConfig,
    getFilteredAndSortedTransactions,
  };
};
