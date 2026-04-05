import { ChevronUp, ChevronDown } from 'lucide-react';
import TransactionItem from './TransactionItem';

function TransactionList({ 
  transactions, 
  showActions, 
  onDelete, 
  onEdit, 
  sortConfig, 
  onSort, 
  isDeleting 
}) {
  if (transactions.length === 0) {
    return (
      <div className="card text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg mb-2">No transactions found</p>
        <p className="text-gray-400 dark:text-gray-500 text-sm">
          Try adjusting your filters or add a new transaction
        </p>
      </div>
    );
  }

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return <ChevronUp className="w-4 h-4 opacity-30" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="w-4 h-4" /> 
      : <ChevronDown className="w-4 h-4" />;
  };

  return (
    <div className="space-y-3">
      {/* Sort Options */}
      <div className="flex gap-2 px-4 pb-3 border-b border-gray-200 dark:border-gray-800">
        <button
          onClick={() => onSort('date')}
          className="flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
        >
          Date {getSortIcon('date')}
        </button>
        <button
          onClick={() => onSort('amount')}
          className="flex items-center gap-1 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400"
        >
          Amount {getSortIcon('amount')}
        </button>
      </div>

      {/* Transactions */}
      <div className="space-y-2">
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            onDelete={onDelete}
            onEdit={onEdit}
            showActions={showActions}
            isDeleting={isDeleting}
          />
        ))}
      </div>
    </div>
  );
}

export default TransactionList;
