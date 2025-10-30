export const formatCurrency = (amount: number, currencyCode: string, symbol: string): string => {
  return `${symbol}${amount.toLocaleString('en-US', { 
    minimumFractionDigits: 0,
    maximumFractionDigits: 2 
  })}`;
};

export const getCurrencyByCode = (code: string) => {
  const currencies = {
    USD: { code: 'USD', symbol: '$', name: 'US Dollar' },
    EUR: { code: 'EUR', symbol: '€', name: 'Euro' },
    GBP: { code: 'GBP', symbol: '£', name: 'British Pound' },
    JPY: { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    INR: { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
    AUD: { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    AED: { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham' },
    CNY: { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
    CHF: { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' }
  };
  
  return currencies[code as keyof typeof currencies] || currencies.USD;
};