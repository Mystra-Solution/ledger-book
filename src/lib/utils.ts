import { format, parseISO } from 'date-fns';
import { DEFAULT_DATE_FORMAT, DEFAULT_DATETIME_FORMAT } from './constants';

// Utility functions for the ledger application

export function formatCurrency(amount: string | number): string {
  const numAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  if (isNaN(numAmount)) return 'LKR 0.00';
  
  return new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(numAmount);
}

export function formatDate(dateString: string | undefined | null, formatStr: string = DEFAULT_DATE_FORMAT): string {
  if (!dateString) {
    return 'N/A';
  }
  
  try {
    const date = parseISO(dateString);
    return format(date, formatStr);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
}

export function formatDateTime(dateString: string | undefined | null): string {
  return formatDate(dateString, DEFAULT_DATETIME_FORMAT);
}

export function getTransactionTypeColor(type: string): string {
  const colors: Record<string, string> = {
    SALE: 'text-green-600 bg-green-100',
    PURCHASE: 'text-red-600 bg-red-100',
    RECEIPT: 'text-blue-600 bg-blue-100',
    PAYMENT: 'text-orange-600 bg-orange-100',
  };
  return colors[type] || 'text-gray-600 bg-gray-100';
}

export function getPaymentTermsColor(terms: string): string {
  const colors: Record<string, string> = {
    CASH: 'text-green-600 bg-green-100',
    NET15: 'text-yellow-600 bg-yellow-100',
    NET30: 'text-orange-600 bg-orange-100',
    CREDIT: 'text-red-600 bg-red-100',
  };
  return colors[terms] || 'text-gray-600 bg-gray-100';
}

export function calculateDaysUntilDue(dueDateString: string | undefined | null): number {
  if (!dueDateString) {
    return 0;
  }
  
  try {
    const dueDate = parseISO(dueDateString);
    const today = new Date();
    const timeDiff = dueDate.getTime() - today.getTime();
    return Math.ceil(timeDiff / (1000 * 3600 * 24));
  } catch (error) {
    console.error('Error calculating days until due:', error);
    return 0;
  }
}

export function getDueDateStatus(dueDateString: string | undefined | null): {
  status: 'overdue' | 'due-soon' | 'current';
  color: string;
  days: number;
} {
  const days = calculateDaysUntilDue(dueDateString);
  
  if (days < 0) {
    return {
      status: 'overdue',
      color: 'text-red-600 bg-red-100',
      days: Math.abs(days),
    };
  } else if (days <= 7) {
    return {
      status: 'due-soon',
      color: 'text-yellow-600 bg-yellow-100',
      days,
    };
  } else {
    return {
      status: 'current',
      color: 'text-green-600 bg-green-100',
      days,
    };
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

export function generatePaginationArray(currentPage: number, totalPages: number): (number | string)[] {
  const delta = 2;
  const range = [];
  const rangeWithDots = [];

  for (let i = Math.max(2, currentPage - delta); 
       i <= Math.min(totalPages - 1, currentPage + delta); 
       i++) {
    range.push(i);
  }

  if (currentPage - delta > 2) {
    rangeWithDots.push(1, '...');
  } else {
    rangeWithDots.push(1);
  }

  rangeWithDots.push(...range);

  if (currentPage + delta < totalPages - 1) {
    rangeWithDots.push('...', totalPages);
  } else {
    rangeWithDots.push(totalPages);
  }

  return rangeWithDots;
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
