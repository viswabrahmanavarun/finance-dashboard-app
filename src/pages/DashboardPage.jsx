import { useTransactions } from '../hooks/useTransactions';
import DashboardOverview from '../components/Dashboard/DashboardOverview';

function DashboardPage() {
  const { transactions } = useTransactions();

  if (transactions.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-lg p-8 text-white text-center">
          <h2 className="text-3xl font-bold mb-2">Welcome to FinanceHub</h2>
          <p className="text-primary-100 mb-6">Get started by adding your first transaction</p>
          <a href="/transactions" className="btn bg-white text-primary-600 hover:bg-primary-50">
            Add Transaction
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Welcome back! Here's your financial overview</p>
      </div>
      <DashboardOverview transactions={transactions} />
    </div>
  );
}

export default DashboardPage;
