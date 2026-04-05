// Formatting utilities

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export const formatCurrencyWithDecimals = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateShort = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

export const formatDateLong = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateForInput = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const formatMonth = (date) => {
  if (!date) return '';
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });
};

export const formatMonthShort = (monthString) => {
  // monthString format: "2026-01"
  if (!monthString) return '';
  const [year, month] = monthString.split('-');
  const date = new Date(`${year}-${month}-01`);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    year: '2-digit',
  });
};

export const getDateRange = (days = 30) => {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - days);
  return { start, end };
};

export const getMonthRange = (monthsBack = 0) => {
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const start = new Date();
  start.setMonth(start.getMonth() - monthsBack);
  start.setDate(1);
  start.setHours(0, 0, 0, 0);

  return { start, end };
};

export const getDaysDifference = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

export const formatPercent = (value) => {
  return `${(value * 100).toFixed(1)}%`;
};

export const formatPercentWhole = (value) => {
  return `${Math.round(value * 100)}%`;
};

export const formatNumber = (num) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
};

export const formatNumberWithDecimals = (num, decimals = 2) => {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
};
