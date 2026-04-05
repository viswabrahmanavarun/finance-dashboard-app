import { useState } from 'react';
import { Search, X, ChevronDown } from 'lucide-react';
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

function TransactionFilters({ filters, onFilterChange, onReset }) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedCategory =
    filters.category === 'all'
      ? 'All Categories'
      : filters.category;

  return (
    <div className="card mb-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Filters
        </h3>
        <button onClick={onReset} className="btn-secondary text-sm">
          <X className="w-4 h-4" />
          Reset
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        
        {/* 🔍 Search */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={filters.searchTerm}
              onChange={(e) =>
                onFilterChange({ searchTerm: e.target.value })
              }
              className="input w-full pl-10"
            />
          </div>
        </div>

        {/* 🔁 Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Type
          </label>
          <select
            value={filters.type}
            onChange={(e) =>
              onFilterChange({ type: e.target.value })
            }
            className="input w-full"
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>

        {/* 🎯 Category Filter (Custom Dropdown with Icons) */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Category
          </label>

          {/* Selected */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="input w-full flex justify-between items-center"
          >
            <span className="flex items-center gap-2">
              {filters.category !== 'all' && (
                (() => {
                  const Icon = categoryIcons[filters.category];
                  return Icon ? <Icon /> : null;
                })()
              )}
              {selectedCategory}
            </span>
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Dropdown */}
          {isOpen && (
            <div className="absolute z-10 mt-2 w-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              
              {/* All Categories */}
              <div
                onClick={() => {
                  onFilterChange({ category: 'all' });
                  setIsOpen(false);
                }}
                className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-800 cursor-pointer flex items-center gap-2"
              >
                ✔ All Categories
              </div>

              {/* Category list */}
              {categories.map((cat) => {
                const Icon = categoryIcons[cat.name];

                return (
                  <div
                    key={cat.name}
                    onClick={() => {
                      onFilterChange({ category: cat.name });
                      setIsOpen(false);
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

        {/* 📅 From Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            From Date
          </label>
          <input
            type="date"
            value={filters.dateFrom || ''}
            onChange={(e) =>
              onFilterChange({
                dateFrom: e.target.value || null,
              })
            }
            className="input w-full"
          />
        </div>

        {/* 📅 To Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            To Date
          </label>
          <input
            type="date"
            value={filters.dateTo || ''}
            onChange={(e) =>
              onFilterChange({
                dateTo: e.target.value || null,
              })
            }
            className="input w-full"
          />
        </div>
      </div>
    </div>
  );
}

export default TransactionFilters;