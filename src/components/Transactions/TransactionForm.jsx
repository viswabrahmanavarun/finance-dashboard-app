import { useState } from 'react';
import { X, ChevronDown } from 'lucide-react';
import { categories } from '../../utils/mockData';
import { formatDateForInput } from '../../utils/formatters';

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

// ✅ Category → Icon mapping
const categoryIcons = {
  Salary: FaMoneyBillWave,
  Freelance: FaMoneyBillWave,
  Investment: FaChartLine,
  Groceries: FaUtensils,
  Utilities: FaCar,
  Rent: FaCar,
  Transportation: FaCar,
  Entertainment: FaFilm,
  Shopping: FaShoppingBag,
  Healthcare: FaHeartbeat,
};

function TransactionForm({ isOpen, onClose, onSubmit, initialData, isSubmitting }) {
  const [formData, setFormData] = useState(
    initialData || {
      type: 'expense',
      category: 'Groceries',
      amount: '',
      description: '',
      date: formatDateForInput(new Date()),
    }
  );

  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.description) return;

    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount),
    });

    setFormData({
      type: 'expense',
      category: 'Groceries',
      amount: '',
      description: '',
      date: formatDateForInput(new Date()),
    });
  };

  if (!isOpen) return null;

  const SelectedIcon = categoryIcons[formData.category];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full">
        
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {initialData ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Type
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="input w-full"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          {/* 🔥 Category (Custom Dropdown with Icons) */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category
            </label>

            {/* Selected */}
            <button
              type="button"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="input w-full flex justify-between items-center"
            >
              <span className="flex items-center gap-2">
                {SelectedIcon && <SelectedIcon />}
                {formData.category}
              </span>
              <ChevronDown className="w-4 h-4" />
            </button>

            {/* Dropdown */}
            {isCategoryOpen && (
              <div className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {categories.map((cat) => {
                  const Icon = categoryIcons[cat.name];

                  return (
                    <div
                      key={cat.name}
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          category: cat.name,
                        }));
                        setIsCategoryOpen(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex items-center gap-2"
                    >
                      {Icon && <Icon />}
                      {cat.name}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Amount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Amount ($)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              required
              className="input w-full"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Transaction description"
              required
              className="input w-full"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Date
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="input w-full"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex-1"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TransactionForm;