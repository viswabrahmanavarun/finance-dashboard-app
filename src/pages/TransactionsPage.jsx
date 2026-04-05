import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTransactions } from '../hooks/useTransactions';
import TransactionForm from '../components/Transactions/TransactionForm';
import TransactionFilters from '../components/Transactions/TransactionFilters';
import TransactionList from '../components/Transactions/TransactionList';
import useTransactionStore from '../store/transactionStore';

function TransactionsPage() {
  const {
    transactions,
    filters,
    setFilters,
    resetFilters,
    sortConfig,
    setSortConfig,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    getFilteredAndSortedTransactions,
  } = useTransactions();

  const userRole = useTransactionStore((state) => state.userRole);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const filteredTransactions = getFilteredAndSortedTransactions();

  const handleAddTransaction = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300)); // Simulate API call
      addTransaction(data);
      setIsFormOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditTransaction = async (data) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 300));
      updateTransaction(editingTransaction.id, data);
      setEditingTransaction(null);
      setIsFormOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteTransaction = async (id) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      setDeletingId(id);
      try {
        await new Promise((resolve) => setTimeout(resolve, 300));
        deleteTransaction(id);
      } finally {
        setDeletingId(null);
      }
    }
  };

  const handleSort = (key) => {
    if (sortConfig.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      setSortConfig({ key, direction: 'desc' });
    }
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingTransaction(null);
  };

  const handleEditClick = (transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Transactions</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Manage and track all your transactions</p>
        </div>
        {userRole === 'admin' && (
          <button
            onClick={() => {
              setEditingTransaction(null);
              setIsFormOpen(true);
            }}
            className="btn-primary"
          >
            <Plus className="w-5 h-5" />
            Add Transaction
          </button>
        )}
      </div>

      {/* Filters */}
      <TransactionFilters 
        filters={filters} 
        onFilterChange={setFilters}
        onReset={resetFilters}
      />

      {/* Transaction List */}
      <TransactionList
        transactions={filteredTransactions}
        showActions={userRole === 'admin'}
        onDelete={handleDeleteTransaction}
        onEdit={handleEditClick}
        sortConfig={sortConfig}
        onSort={handleSort}
        isDeleting={deletingId}
      />

      {/* Transaction Form Modal */}
      <TransactionForm
        isOpen={isFormOpen}
        onClose={handleFormClose}
        onSubmit={editingTransaction ? handleEditTransaction : handleAddTransaction}
        initialData={editingTransaction}
        isSubmitting={isSubmitting}
      />
    </div>
  );
}

export default TransactionsPage;
