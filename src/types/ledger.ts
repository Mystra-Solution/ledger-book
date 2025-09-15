// Base types for API responses
export interface ApiResponse<T> {
  message: string;
  statusCode: number;
  data: T;
  error?: string;
}

// Sales Ledger Types
export interface SalesTransaction {
  id: string;
  customerId: string;
  customerName: string;
  transactionType: string;
  transactionDate: string;
  referenceNumber: string;
  sourceDocumentId: string;
  sourceModule: string;
  invoiceNumber: string;
  salesAmount: string;
  taxAmount: string;
  discountAmount: string;
  netAmount: string;
  runningBalance: string;
  paymentTerms: string;
  dueDate: string;
  description: string;
  glTransactionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CustomerBalance {
  balance: string;
  lastTransaction: string;
}

export interface SalesLedgerData {
  totalBalance?: string;
  customerBalances?: CustomerBalance[];
  totalCustomers?: number;
  customerId?: string;
  balance?: string;
  transactions?: SalesTransaction[];
  totalTransactions?: number;
  recentTransactions?: Partial<SalesTransaction>[];
}

// Purchase Ledger Types
export interface PurchaseTransaction {
  id: string;
  supplierId: string;
  supplierName: string;
  transactionType: string;
  transactionDate: string;
  referenceNumber: string;
  sourceDocumentId: string;
  sourceModule: string;
  invoiceNumber: string;
  purchaseAmount: string;
  taxAmount: string;
  discountAmount: string;
  netAmount: string;
  runningBalance: string;
  paymentTerms: string;
  dueDate: string;
  description: string;
  glTransactionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SupplierBalance {
  balance: string;
  lastTransaction: string;
}

export interface PurchaseLedgerData {
  totalBalance?: string;
  supplierBalances?: SupplierBalance[];
  totalSuppliers?: number;
  supplierId?: string;
  balance?: string;
  transactions?: PurchaseTransaction[];
  totalTransactions?: number;
  recentTransactions?: Partial<PurchaseTransaction>[];
}

// Cash Book Types
export interface CashTransaction {
  id: string;
  accountCode: string;
  accountName: string;
  transactionType: string;
  transactionDate: string;
  referenceNumber: string;
  sourceDocumentId: string;
  sourceModule: string;
  partyType: string;
  partyId: string;
  partyName: string;
  receiptAmount: string;
  paymentAmount: string;
  runningBalance: string;
  description: string;
  glTransactionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AccountBalance {
  balance: string;
  lastTransaction: string;
}

export interface CashBookData {
  totalBalance?: string;
  accountBalances?: AccountBalance[];
  totalAccounts?: number;
  accountCode?: string;
  balance?: string;
  transactions?: CashTransaction[];
  totalTransactions?: number;
  recentTransactions?: Partial<CashTransaction>[];
}

// General Ledger Types
export interface GLTransaction {
  id: string;
  tenantId: string;
  transactionDate: string;
  referenceNumber: string;
  description: string;
  sourceModule: string;
  sourceDocumentId: string;
  totalDebit: string;
  totalCredit: string;
  isPosted: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface GLEntry {
  id: string;
  tenantId: string;
  glTransactionId: string;
  accountCode: string;
  accountName: string;
  debitAmount: string;
  creditAmount: string;
  entryDescription: string;
  entryType: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface GLTransactionsData {
  transactions: GLTransaction[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GLEntriesData {
  transactionId: string;
  entries: GLEntry[];
  totalEntries: number;
}

export interface AccountBalanceData {
  accountCode: string;
  accountName: string;
  debitTotal: number;
  creditTotal: number;
  balance: number;
  asOfDate: string;
}

export interface TrialBalanceData {
  asOfDate: string;
  message: string;
  accounts: any[];
}

export interface GLSummaryData {
  totalTransactions: number;
  period: {
    startDate: string;
    endDate: string;
  };
  summary: {
    message: string;
    note: string;
  };
}

// Summary Types
export interface LedgerSummary {
  salesLedger: {
    totalBalance: string;
    totalCustomers: number;
    customerBalances: CustomerBalance[];
  };
  purchaseLedger: {
    totalBalance: string;
    totalSuppliers: number;
    supplierBalances: SupplierBalance[];
  };
  cashBook: {
    totalBalance: string;
    totalAccounts: number;
    accountBalances: AccountBalance[];
  };
  summary: {
    totalSalesBalance: string;
    totalPurchaseBalance: string;
    totalCashBalance: string;
    netPosition: string;
  };
}

// API Query Parameters
export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface DateRangeParams {
  startDate?: string;
  endDate?: string;
}

export interface SalesLedgerParams extends PaginationParams, DateRangeParams {
  customerId?: string;
}

export interface PurchaseLedgerParams extends PaginationParams, DateRangeParams {
  supplierId?: string;
}

export interface CashBookParams extends PaginationParams, DateRangeParams {
  accountCode?: string;
}

export interface GLTransactionParams extends PaginationParams, DateRangeParams {
  accountCode?: string;
  sourceModule?: string;
}

export interface AccountBalanceParams {
  asOfDate?: string;
}

export interface TrialBalanceParams {
  asOfDate?: string;
}
