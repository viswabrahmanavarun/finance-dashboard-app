import { Trash2, Edit2 } from 'lucide-react';
import { formatDate, formatCurrency } from '../../utils/formatters';
import { categories } from '../../utils/mockData';

// ✅ React Icons
import {
  FaMoneyBillWave,
  FaFilm,
  FaShoppingBag,
  FaHeartbeat,
  FaChartLine,
  FaUtensils,
  FaCar,
} from 'react-icons/fa';

// ✅ Map category → icon
const categoryIcons = {
  Investment: FaChartLine,
  Entertainment: FaFilm,
  Shopping: FaShoppingBag,
  Healthcare: FaHeartbeat,
  Food: FaUtensils,
  Transport: FaCar,
  Income: FaMoneyBillWave,
};

function TransactionItem({ transaction, onDelete, onEdit, showActions, isDeleting }) {
  const category = categories.find((c) => c.name === transaction.category);

  const isoDateString =
    transaction.date instanceof Date
      ? transaction.date.toISOString().split('T')[0]
      : transaction.date;

  // ✅ Pick icon dynamically
  const Icon = categoryIcons[transaction.category] || FaMoneyBillWave;

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
      
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4 flex-1">
        
        {/* ✅ React Icon */}
        <div className="text-xl text-primary-600 dark:text-primary-400">
          <Icon />
        </div>

        <div className="flex-1">
          <p className="font-medium text-gray-900 dark:text-white">
            {transaction.description}
          </p>

          <div className="flex gap-2 mt-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(isoDateString)}
            </span>

            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                transaction.type === 'income'
                  ? 'badge-success'
                  : 'badge-danger'
              }`}
            >
              {transaction.category}
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        
        {/* Amount */}
        <p
          className={`text-lg font-bold w-28 text-right ${
            transaction.type === 'income'
              ? 'text-success-600 dark:text-success-400'
              : 'text-danger-600 dark:text-danger-400'
          }`}
        >
          {transaction.type === 'income' ? '+' : '-'}
          {formatCurrency(transaction.amount)}
        </p>

        {/* Actions */}
        {showActions && (
          <div className="flex gap-2">
            <button
              onClick={() => onEdit(transaction)}
              className="p-2 hover:bg-primary-100 dark:hover:bg-primary-900 text-primary-600 dark:text-primary-400 rounded-lg transition-colors"
              title="Edit transaction"
            >
              <Edit2 className="w-4 h-4" />
            </button>

            <button
              onClick={() => onDelete(transaction.id)}
              disabled={isDeleting}
              className="p-2 hover:bg-danger-100 dark:hover:bg-danger-900 text-danger-600 dark:text-danger-400 rounded-lg transition-colors disabled:opacity-50"
              title="Delete transaction"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default TransactionItem;