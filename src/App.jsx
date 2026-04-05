import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import DashboardPage from './pages/DashboardPage';
import TransactionsPage from './pages/TransactionsPage';
import InsightsPage from './pages/InsightsPage';
import { useTheme } from './hooks/useTheme';
import { useTransactions } from './hooks/useTransactions';

function App() {
  const { isDarkMode, initializeDarkMode } = useTheme();
  const { transactions } = useTransactions();

  useEffect(() => {
    initializeDarkMode();
  }, []);

  return (
    <Router>
      <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
        <div className="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-50 min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/insights" element={<InsightsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;