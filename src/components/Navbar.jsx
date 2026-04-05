import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Wallet, TrendingUp, Moon, Sun, LogOut } from 'lucide-react';
import useThemeStore from '../store/themeStore';
import useTransactionStore from '../store/transactionStore';

function Navbar() {
  const location = useLocation();
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const { userRole, setUserRole } = useTransactionStore();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const handleRoleChange = (e) => {
    setUserRole(e.target.value);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-800 rounded-lg">
              <Wallet className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">FinanceHub</h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">Dashboard</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            <Link
              to="/"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/') 
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <Link
              to="/transactions"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/transactions') 
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <Wallet className="w-4 h-4" />
              Transactions
            </Link>
            <Link
              to="/insights"
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                isActive('/insights') 
                  ? 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300' 
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              Insights
            </Link>
          </div>

          {/* Right Side Controls */}
          <div className="flex items-center gap-3">
            {/* Role Selector */}
            <div className="flex items-center gap-2">
              <select
                value={userRole}
                onChange={handleRoleChange}
                className="input py-1.5 text-sm bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700"
              >
                <option value="viewer" className="bg-white dark:bg-gray-900">Viewer</option>
                <option value="admin" className="bg-white dark:bg-gray-900">Admin</option>
              </select>
              <span className="text-xs font-medium px-3 py-1.5 bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-300 rounded-lg">
                {userRole === 'admin' ? 'Admin' : 'Viewer'}
              </span>
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
