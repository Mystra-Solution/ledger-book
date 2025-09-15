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
} from '@/types/ledger';

class LedgerAPI {
  private baseURL: string;
  private headers: Record<string, string>;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.headers = API_CONFIG.HEADERS;
  }

  private async request<T>(endpoint: string, params?: Record<string, any>): Promise<ApiResponse<T>> {
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
        headers: this.headers,
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
  async getSalesLedger(params?: SalesLedgerParams): Promise<ApiResponse<SalesLedgerData>> {
    return this.request<SalesLedgerData>(ENDPOINTS.SUBSIDIARY_LEDGERS.SALES_LEDGER, params);
  }

  async getCustomerBalance(customerId: string): Promise<ApiResponse<SalesLedgerData>> {
    return this.request<SalesLedgerData>(`${ENDPOINTS.SUBSIDIARY_LEDGERS.SALES_LEDGER}/customer/${customerId}`);
  }

  // Purchase Ledger APIs
  async getPurchaseLedger(params?: PurchaseLedgerParams): Promise<ApiResponse<PurchaseLedgerData>> {
    return this.request<PurchaseLedgerData>(ENDPOINTS.SUBSIDIARY_LEDGERS.PURCHASE_LEDGER, params);
  }

  async getSupplierBalance(supplierId: string): Promise<ApiResponse<PurchaseLedgerData>> {
    return this.request<PurchaseLedgerData>(`${ENDPOINTS.SUBSIDIARY_LEDGERS.PURCHASE_LEDGER}/supplier/${supplierId}`);
  }

  // Cash Book APIs
  async getCashBook(params?: CashBookParams): Promise<ApiResponse<CashBookData>> {
    return this.request<CashBookData>(ENDPOINTS.SUBSIDIARY_LEDGERS.CASH_BOOK, params);
  }

  async getAccountBalance(accountCode: string): Promise<ApiResponse<CashBookData>> {
    return this.request<CashBookData>(`${ENDPOINTS.SUBSIDIARY_LEDGERS.CASH_BOOK}/account/${accountCode}`);
  }

  // Summary APIs
  async getLedgerSummaries(): Promise<ApiResponse<LedgerSummary>> {
    return this.request<LedgerSummary>(ENDPOINTS.SUBSIDIARY_LEDGERS.SUMMARIES);
  }

  // General Ledger APIs
  async getGLTransactions(params?: GLTransactionParams): Promise<ApiResponse<GLTransactionsData>> {
    return this.request<GLTransactionsData>(ENDPOINTS.GENERAL_LEDGER.TRANSACTIONS, params);
  }

  async getGLEntries(transactionId: string): Promise<ApiResponse<GLEntriesData>> {
    return this.request<GLEntriesData>(`${ENDPOINTS.GENERAL_LEDGER.TRANSACTIONS}/${transactionId}/entries`);
  }

  async getGLAccountBalance(accountCode: string, params?: AccountBalanceParams): Promise<ApiResponse<AccountBalanceData>> {
    return this.request<AccountBalanceData>(`/api/accounting/general-ledger/accounts/${accountCode}/balance`, params);
  }

  async getTrialBalance(params?: TrialBalanceParams): Promise<ApiResponse<TrialBalanceData>> {
    return this.request<TrialBalanceData>(ENDPOINTS.GENERAL_LEDGER.TRIAL_BALANCE, params);
  }

  async getGLSummary(params?: { startDate?: string; endDate?: string }): Promise<ApiResponse<GLSummaryData>> {
    return this.request<GLSummaryData>(ENDPOINTS.GENERAL_LEDGER.SUMMARY, params);
  }
}

export const ledgerAPI = new LedgerAPI();
