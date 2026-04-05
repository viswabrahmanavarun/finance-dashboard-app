import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { getBalanceTrend } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';

function BalanceTrendChart({ transactions }) {
  const data = getBalanceTrend(transactions);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {payload[0].payload.formattedDate}
          </p>
          <p className="text-sm text-primary-600 dark:text-primary-400 font-semibold">
            {formatCurrency(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Balance Trend</h3>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-gray-200 dark:stroke-gray-700" />
            <XAxis 
              dataKey="formattedDate" 
              className="text-xs text-gray-600 dark:text-gray-400"
              stroke="currentColor"
            />
            <YAxis 
              className="text-xs text-gray-600 dark:text-gray-400"
              stroke="currentColor"
              tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line 
              type="monotone" 
              dataKey="balance" 
              stroke="#0ea5e9" 
              strokeWidth={3}
              dot={false}
              isAnimationActive={true}
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-300 text-gray-500 dark:text-gray-400">
          No data to display
        </div>
      )}
    </div>
  );
}

export default BalanceTrendChart;
