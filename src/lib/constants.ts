// API Configuration
export const API_CONFIG = {
  BASE_URL: 'https://mystra-api-gateway-production.up.railway.app',
  DEFAULT_TENANT_ID: '0198c8b0-e911-7334-ab83-a0d682e0dc05',
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
  },
};

// API Endpoints
export const ENDPOINTS = {
  SUBSIDIARY_LEDGERS: {
    SALES_LEDGER: '/api/accounting/subsidiary-ledgers/sales-ledger',
    PURCHASE_LEDGER: '/api/accounting/subsidiary-ledgers/purchase-ledger',
    CASH_BOOK: '/api/accounting/subsidiary-ledgers/cash-book',
    SUMMARIES: '/api/accounting/subsidiary-ledgers/summaries',
    // New table-view endpoints
    SALES_LEDGER_TABLE: '/api/accounting/subsidiary-ledgers/sales-ledger/table',
    PURCHASE_LEDGER_TABLE: '/api/accounting/subsidiary-ledgers/purchase-ledger/table',
    CASH_BOOK_TABLE: '/api/accounting/subsidiary-ledgers/cash-book/table',
    TRANSACTIONS_TABLE: '/api/accounting/subsidiary-ledgers/transactions/table',
  },
  GENERAL_LEDGER: {
    TRANSACTIONS: '/api/accounting/general-ledger/transactions',
    TRIAL_BALANCE: '/api/accounting/general-ledger/trial-balance',
    SUMMARY: '/api/accounting/general-ledger/summary',
  },
};

// UI Constants
export const ITEMS_PER_PAGE = 10;
export const DEFAULT_DATE_FORMAT = 'MMM dd, yyyy';
export const DEFAULT_DATETIME_FORMAT = 'MMM dd, yyyy HH:mm';

// Navigation Items
export const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', path: '/' },
  { id: 'sales-ledger', label: 'Sales Ledger', path: '/sales-ledger' },
  { id: 'purchase-ledger', label: 'Purchase Ledger', path: '/purchase-ledger' },
  { id: 'cash-book', label: 'Cash Book', path: '/cash-book' },
  { id: 'general-ledger', label: 'General Ledger', path: '/general-ledger' },
  { id: 'trial-balance', label: 'Trial Balance', path: '/trial-balance' },
];

// Status Colors
export const STATUS_COLORS = {
  success: 'text-green-600 bg-green-100',
  warning: 'text-yellow-600 bg-yellow-100',
  error: 'text-red-600 bg-red-100',
  info: 'text-blue-600 bg-blue-100',
};

// Transaction Types
export const TRANSACTION_TYPES = {
  // Sales Ledger
  SALE: 'SALE',
  RETURN: 'RETURN',
  ADJUSTMENT: 'ADJUSTMENT',
  REFUND: 'REFUND',
  PAYMENT: 'PAYMENT',
  // Purchase Ledger
  PURCHASE: 'PURCHASE',
  // Cash Book
  RECEIPT: 'RECEIPT',
  TRANSFER: 'TRANSFER',
  BANK_CHARGE: 'BANK_CHARGE',
};

// Payment Terms
export const PAYMENT_TERMS = {
  NET30: 'NET30',
  NET15: 'NET15',
  CASH: 'CASH',
  CREDIT: 'CREDIT',
};
