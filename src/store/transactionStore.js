import { create } from 'zustand';

const STORAGE_KEY = 'finance-dashboard:transactions';

// Load from localStorage
const loadFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      const parsed = JSON.parse(data);
      return {
        transactions: parsed.transactions || [],
        userRole: parsed.userRole || 'viewer',
      };
    }
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
  }
  return { transactions: [], userRole: 'viewer' };
};

// Save to localStorage
const saveToStorage = (state) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      transactions: state.transactions,
      userRole: state.userRole,
    }));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

const useTransactionStore = create((set, get) => {
  const initialData = loadFromStorage();

  return {
    transactions: initialData.transactions,
    userRole: initialData.userRole,
    filters: {
      category: 'all',
      type: 'all',
      dateFrom: null,
      dateTo: null,
      searchTerm: '',
    },
    sortConfig: {
      key: 'date',
      direction: 'desc',
    },

    // Actions
    setTransactions: (transactions) => {
      set({ transactions });
      saveToStorage(get());
    },

    addTransaction: (transaction) => {
      const newTransaction = {
        id: Date.now(),
        ...transaction,
        date: new Date(transaction.date),
      };
      set((state) => {
        const newState = {
          transactions: [newTransaction, ...state.transactions],
        };
        saveToStorage(newState);
        return newState;
      });
      return newTransaction;
    },

    deleteTransaction: (id) => {
      set((state) => {
        const newState = {
          transactions: state.transactions.filter((t) => t.id !== id),
        };
        saveToStorage(newState);
        return newState;
      });
    },

    updateTransaction: (id, updatedTransaction) => {
      set((state) => {
        const newState = {
          transactions: state.transactions.map((t) =>
            t.id === id
              ? { ...t, ...updatedTransaction, date: new Date(updatedTransaction.date) }
              : t
          ),
        };
        saveToStorage(newState);
        return newState;
      });
    },

    setUserRole: (role) => {
      set({ userRole: role });
      saveToStorage(get());
    },

    setFilters: (filters) => {
      set((state) => ({
        filters: { ...state.filters, ...filters },
      }));
    },

    resetFilters: () => {
      set({
        filters: {
          category: 'all',
          type: 'all',
          dateFrom: null,
          dateTo: null,
          searchTerm: '',
        },
      });
    },

    setSortConfig: (sortConfig) => set({ sortConfig }),

    // Selectors
    getFilteredAndSortedTransactions: () => {
      const state = get();
      const { transactions, filters, sortConfig } = state;

      let filtered = transactions;

      if (filters.category !== 'all') {
        filtered = filtered.filter((t) => t.category === filters.category);
      }

      if (filters.type !== 'all') {
        filtered = filtered.filter((t) => t.type === filters.type);
      }

      if (filters.dateFrom) {
        const fromDate = new Date(filters.dateFrom);
        filtered = filtered.filter((t) => new Date(t.date) >= fromDate);
      }

      if (filters.dateTo) {
        const toDate = new Date(filters.dateTo);
        toDate.setHours(23, 59, 59, 999);
        filtered = filtered.filter((t) => new Date(t.date) <= toDate);
      }

      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        filtered = filtered.filter(
          (t) =>
            t.description.toLowerCase().includes(term) ||
            t.category.toLowerCase().includes(term)
        );
      }

      const sorted = [...filtered];
      sorted.sort((a, b) => {
        let aVal = a[sortConfig.key];
        let bVal = b[sortConfig.key];

        if (sortConfig.key === 'date') {
          aVal = new Date(aVal).getTime();
          bVal = new Date(bVal).getTime();
        } else if (sortConfig.key === 'amount') {
          aVal = parseFloat(aVal);
          bVal = parseFloat(bVal);
        }

        if (sortConfig.direction === 'asc') {
          return aVal > bVal ? 1 : -1;
        } else {
          return aVal < bVal ? 1 : -1;
        }
      });

      return sorted;
    },
  };
});

export default useTransactionStore;
