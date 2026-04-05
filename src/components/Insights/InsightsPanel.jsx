import { TrendingUp, Target, BarChart3, Zap } from 'lucide-react';
import { getSpendingInsights, getMonthlyComparison } from '../../utils/calculations';
import { formatCurrency, formatPercent } from '../../utils/formatters';

function InsightCard({ icon: Icon, title, value, subtitle, color }) {
  return (
    <div className="card">
      <div className="flex items-center gap-3">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>
    </div>
  );
}

function InsightsPanel({ transactions }) {
  const insights = getSpendingInsights(transactions);
  const monthlyData = getMonthlyComparison(transactions);

  return (
    <div className="space-y-6">
      {/* Main Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InsightCard
          icon={Target}
          title="Savings Rate"
          value={`${insights.savingsRate}%`}
          subtitle="of monthly income"
          color="bg-gradient-to-br from-success-500 to-success-600"
        />
        <InsightCard
          icon={TrendingUp}
          title="Top Spending"
          value={insights.highestCategory?.name || 'N/A'}
          subtitle={`${insights.highestCategory?.percentage || 0}% of expenses`}
          color="bg-gradient-to-br from-danger-500 to-danger-600"
        />
        <InsightCard
          icon={BarChart3}
          title="Avg. Expense"
          value={formatCurrency(insights.averageExpense)}
          subtitle={`${insights.transactionCount} transactions`}
          color="bg-gradient-to-br from-warning-500 to-warning-600"
        />
        <InsightCard
          icon={Zap}
          title="Avg. Income"
          value={formatCurrency(insights.averageIncome)}
          subtitle={`${insights.monthCount} months of data`}
          color="bg-gradient-to-br from-primary-500 to-primary-600"
        />
      </div>

      {/* Monthly Comparison Table */}
      {monthlyData.length > 0 && (
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Monthly Summary</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Month</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Income</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Expenses</th>
                  <th className="text-right py-3 px-4 text-sm font-medium text-gray-600 dark:text-gray-400">Difference</th>
                </tr>
              </thead>
              <tbody>
                {monthlyData.map((month) => {
                  const diff = month.income - month.expenses;
                  return (
                    <tr 
                      key={month.month} 
                      className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-200">{month.formattedMonth}</td>
                      <td className="py-3 px-4 text-sm text-right text-success-600 dark:text-success-400 font-medium">
                        {formatCurrency(month.income)}
                      </td>
                      <td className="py-3 px-4 text-sm text-right text-danger-600 dark:text-danger-400 font-medium">
                        {formatCurrency(month.expenses)}
                      </td>
                      <td className={`py-3 px-4 text-sm text-right font-medium ${
                        diff >= 0 
                          ? 'text-success-600 dark:text-success-400' 
                          : 'text-danger-600 dark:text-danger-400'
                      }`}>
                        {formatCurrency(diff)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Additional Insights */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Key Observations</h3>
        <ul className="space-y-3">
          {insights.savingsRate >= 50 && (
            <li className="flex items-start gap-3 text-success-600 dark:text-success-400">
              <Zap className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Excellent savings rate! You're saving more than 50% of your income.</span>
            </li>
          )}
          {insights.savingsRate < 20 && insights.savingsRate >= 0 && (
            <li className="flex items-start gap-3 text-warning-600 dark:text-warning-400">
              <TrendingUp className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Consider increasing your savings rate. Budget planning might help.</span>
            </li>
          )}
          {insights.highestCategory && (
            <li className="flex items-start gap-3 text-primary-600 dark:text-primary-400">
              <Target className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span className="text-sm">Your highest spending is on {insights.highestCategory.name}. Track this category closely.</span>
            </li>
          )}
          {monthlyData.length >= 2 && (
            <li className="flex items-start gap-3 text-primary-600 dark:text-primary-400">
              <BarChart3 className="w-5 h-5 mt-0.5 flex-shrink-0" />
              <span className="text-sm">You have {insights.monthCount} months of transaction history. This helps identify spending patterns.</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default InsightsPanel;
