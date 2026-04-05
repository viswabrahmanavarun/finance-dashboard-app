import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { getSpendingByCategory } from '../../utils/calculations';

const COLORS = [
  '#0ea5e9',
  '#10b981',
  '#f59e0b',
  '#ef4444',
  '#8b5cf6',
  '#ec4899',
  '#06b6d4',
  '#f97316',
  '#84cc16',
  '#6366f1',
];

function SpendingBreakdownChart({ transactions }) {
  const data = getSpendingByCategory(transactions);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const percent = ((payload[0].value / data.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1);
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white">{payload[0].name}</p>
          <p className="text-sm text-primary-600 dark:text-primary-400 font-semibold">
            ${payload[0].value.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{percent}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Spending by Category</h3>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={120}
              paddingAngle={2}
              dataKey="value"
              isAnimationActive={true}
              animationDuration={800}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              className="text-xs text-gray-600 dark:text-gray-400"
            />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-300 text-gray-500 dark:text-gray-400">
          No spending data to display
        </div>
      )}
    </div>
  );
}

export default SpendingBreakdownChart;
