import SummaryCards from './SummaryCards';
import BalanceTrendChart from './BalanceTrendChart';
import SpendingBreakdownChart from './SpendingBreakdownChart';

function DashboardOverview({ transactions }) {
  return (
    <div>
      <SummaryCards transactions={transactions} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BalanceTrendChart transactions={transactions} />
        <SpendingBreakdownChart transactions={transactions} />
      </div>
    </div>
  );
}

export default DashboardOverview;
