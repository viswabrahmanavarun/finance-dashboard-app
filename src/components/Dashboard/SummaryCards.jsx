import { TrendingUp, TrendingDown, DollarSign, PiggyBank } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import {
  calculateTotalBalance,
  calculateTotalIncome,
  calculateTotalExpenses,
  calculateSavings,
} from '../../utils/calculations';

function SummaryCard({ icon: Icon, title, value, subtitle, bgColor, textColor }) {
  return (
    <div className="card-hover">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg ${bgColor}`}>
          <Icon className={`w-8 h-8 ${textColor}`} />
        </div>
      </div>
    </div>
  );
}

function SummaryCards({ transactions }) {
  const totalBalance = calculateTotalBalance(transactions);
  const totalIncome = calculateTotalIncome(transactions);
  const totalExpenses = calculateTotalExpenses(transactions);
  const savings = calculateSavings(transactions);

  const savingsRate = totalIncome > 0 ? ((savings / totalIncome) * 100).toFixed(1) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <SummaryCard
        icon={DollarSign}
        title="Total Balance"
        value={formatCurrency(totalBalance)}
        subtitle={totalBalance >= 0 ? '✓ Positive' : '✗ Negative'}
        bgColor="bg-primary-100 dark:bg-primary-900"
        textColor="text-primary-600 dark:text-primary-400"
      />
      <SummaryCard
        icon={TrendingUp}
        title="Total Income"
        value={formatCurrency(totalIncome)}
        subtitle={`${transactions.filter((t) => t.type === 'income').length} transactions`}
        bgColor="bg-success-100 dark:bg-success-900"
        textColor="text-success-600 dark:text-success-400"
      />
      <SummaryCard
        icon={TrendingDown}
        title="Total Expenses"
        value={formatCurrency(totalExpenses)}
        subtitle={`${transactions.filter((t) => t.type === 'expense').length} transactions`}
        bgColor="bg-danger-100 dark:bg-danger-900"
        textColor="text-danger-600 dark:text-danger-400"
      />
      <SummaryCard
        icon={PiggyBank}
        title="Savings Rate"
        value={`${savingsRate}%`}
        subtitle={formatCurrency(savings)} 
        bgColor="bg-warning-100 dark:bg-warning-900"
        textColor="text-warning-600 dark:text-warning-400"
      />
    </div>
  );
}

export default SummaryCards;
