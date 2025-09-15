import { API_CONFIG, ENDPOINTS } from './constants';
import type {
  ApiResponse,
  SalesLedgerData,
  PurchaseLedgerData,
  CashBookData,
  GLTransactionsData,
  GLEntriesData,
  AccountBalanceData,
  TrialBalanceData,
  GLSummaryData,
  LedgerSummary,
  SalesLedgerParams,
  PurchaseLedgerParams,
  CashBookParams,
  GLTransactionParams,
  AccountBalanceParams,
  TrialBalanceParams,
  SalesLedgerTableParams,
  PurchaseLedgerTableParams,
  CashBookTableParams,
  CombinedTransactionsParams,
  CombinedTransactionsData,
  SalesTransaction,
  PurchaseTransaction,
  CashTransaction,
  TableResponse,
} from '@/types/ledger';

class LedgerAPI {
  private baseURL: string;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
  }

  private async request<T>(endpoint: string, params?: Record<string, unknown>, headers?: Record<string, string>): Promise<ApiResponse<T>> {
    const url = new URL(endpoint, this.baseURL);
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, value.toString());
        }
      });
    }

    try {
      const response = await fetch(url.toString(), {
        method: 'GET',
        headers: headers || API_CONFIG.DEFAULT_HEADERS,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Sales Ledger APIs
  async getSalesLedger(params?: SalesLedgerParams, headers?: Record<string, string>): Promise<ApiResponse<SalesLedgerData>> {
    return this.request<SalesLedgerData>(ENDPOINTS.SUBSIDIARY_LEDGERS.SALES_LEDGER, params as Record<string, unknown>, headers);
  }

  // New table-view API methods
  async getSalesLedgerTable(params?: SalesLedgerTableParams, headers?: Record<string, string>): Promise<ApiResponse<TableResponse<SalesTransaction>>> {
    return this.request<TableResponse<SalesTransaction>>(ENDPOINTS.SUBSIDIARY_LEDGERS.SALES_LEDGER_TABLE, params as Record<string, unknown>, headers);
  }

  async getCustomerBalance(customerId: string, headers?: Record<string, string>): Promise<ApiResponse<SalesLedgerData>> {
    return this.request<SalesLedgerData>(`${ENDPOINTS.SUBSIDIARY_LEDGERS.SALES_LEDGER}/customer/${customerId}`, undefined, headers);
  }

  // Purchase Ledger APIs
  async getPurchaseLedger(params?: PurchaseLedgerParams, headers?: Record<string, string>): Promise<ApiResponse<PurchaseLedgerData>> {
    return this.request<PurchaseLedgerData>(ENDPOINTS.SUBSIDIARY_LEDGERS.PURCHASE_LEDGER, params as Record<string, unknown>, headers);
  }

  async getPurchaseLedgerTable(params?: PurchaseLedgerTableParams, headers?: Record<string, string>): Promise<ApiResponse<TableResponse<PurchaseTransaction>>> {
    return this.request<TableResponse<PurchaseTransaction>>(ENDPOINTS.SUBSIDIARY_LEDGERS.PURCHASE_LEDGER_TABLE, params as Record<string, unknown>, headers);
  }

  async getSupplierBalance(supplierId: string, headers?: Record<string, string>): Promise<ApiResponse<PurchaseLedgerData>> {
    return this.request<PurchaseLedgerData>(`${ENDPOINTS.SUBSIDIARY_LEDGERS.PURCHASE_LEDGER}/supplier/${supplierId}`, undefined, headers);
  }

  // Cash Book APIs
  async getCashBook(params?: CashBookParams, headers?: Record<string, string>): Promise<ApiResponse<CashBookData>> {
    return this.request<CashBookData>(ENDPOINTS.SUBSIDIARY_LEDGERS.CASH_BOOK, params as Record<string, unknown>, headers);
  }

  async getCashBookTable(params?: CashBookTableParams, headers?: Record<string, string>): Promise<ApiResponse<TableResponse<CashTransaction>>> {
    return this.request<TableResponse<CashTransaction>>(ENDPOINTS.SUBSIDIARY_LEDGERS.CASH_BOOK_TABLE, params as Record<string, unknown>, headers);
  }

  async getAccountBalance(accountCode: string, headers?: Record<string, string>): Promise<ApiResponse<CashBookData>> {
    return this.request<CashBookData>(`${ENDPOINTS.SUBSIDIARY_LEDGERS.CASH_BOOK}/account/${accountCode}`, undefined, headers);
  }

  // Summary APIs
  async getLedgerSummaries(headers?: Record<string, string>): Promise<ApiResponse<LedgerSummary>> {
    return this.request<LedgerSummary>(ENDPOINTS.SUBSIDIARY_LEDGERS.SUMMARIES, undefined, headers);
  }

  // Combined Transactions Table API
  async getCombinedTransactionsTable(params?: CombinedTransactionsParams, headers?: Record<string, string>): Promise<ApiResponse<CombinedTransactionsData>> {
    return this.request<CombinedTransactionsData>(ENDPOINTS.SUBSIDIARY_LEDGERS.TRANSACTIONS_TABLE, params as Record<string, unknown>, headers);
  }

  // General Ledger APIs
  async getGLTransactions(params?: GLTransactionParams, headers?: Record<string, string>): Promise<ApiResponse<GLTransactionsData>> {
    return this.request<GLTransactionsData>(ENDPOINTS.GENERAL_LEDGER.TRANSACTIONS, params as Record<string, unknown>, headers);
  }

  async getGLEntries(transactionId: string, headers?: Record<string, string>): Promise<ApiResponse<GLEntriesData>> {
    return this.request<GLEntriesData>(`${ENDPOINTS.GENERAL_LEDGER.TRANSACTIONS}/${transactionId}/entries`, undefined, headers);
  }

  async getGLAccountBalance(accountCode: string, params?: AccountBalanceParams, headers?: Record<string, string>): Promise<ApiResponse<AccountBalanceData>> {
    return this.request<AccountBalanceData>(`/api/accounting/general-ledger/accounts/${accountCode}/balance`, params as Record<string, unknown>, headers);
  }

  async getTrialBalance(params?: TrialBalanceParams, headers?: Record<string, string>): Promise<ApiResponse<TrialBalanceData>> {
    return this.request<TrialBalanceData>(ENDPOINTS.GENERAL_LEDGER.TRIAL_BALANCE, params as Record<string, unknown>, headers);
  }

  async getGLSummary(params?: { startDate?: string; endDate?: string }, headers?: Record<string, string>): Promise<ApiResponse<GLSummaryData>> {
    return this.request<GLSummaryData>(ENDPOINTS.GENERAL_LEDGER.SUMMARY, params as Record<string, unknown>, headers);
  }
}

export const ledgerAPI = new LedgerAPI();
