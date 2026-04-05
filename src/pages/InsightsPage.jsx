import { useTransactions } from '../hooks/useTransactions';
import InsightsPanel from '../components/Insights/InsightsPanel';

function InsightsPage() {
  const { transactions } = useTransactions();

  if (transactions.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card text-center py-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No Data Available</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Add some transactions to see insights and analysis
          </p>
          <a href="/transactions" className="btn-primary inline-flex">
            Go to Transactions
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Insights</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">Analyze your spending patterns and financial health</p>
      </div>
      <InsightsPanel transactions={transactions} />
    </div>
  );
}

export default InsightsPage;
