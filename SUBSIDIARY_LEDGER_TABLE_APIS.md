# Subsidiary Ledger Table View APIs Documentation

This document provides comprehensive documentation for the new table-view APIs that return all subsidiary ledger entries in a format suitable for displaying in tables.

## Table of Contents

1. [Overview](#overview)
2. [API Endpoints](#api-endpoints)
3. [Query Parameters](#query-parameters)
4. [Response Format](#response-format)
5. [Request Examples](#request-examples)
6. [Response Examples](#response-examples)
7. [Error Handling](#error-handling)

---

## Overview

The table-view APIs provide comprehensive access to all transactions in the subsidiary ledgers with advanced filtering, pagination, and search capabilities. These APIs are designed to return data in a format that can be directly consumed by frontend table components.

### Key Features:
- **Pagination**: Control page size and navigation
- **Filtering**: Filter by entity, transaction type, date range
- **Search**: Full-text search across multiple fields
- **Sorting**: Default sorting by transaction date (newest first)
- **Comprehensive Data**: All transaction details for table display

---

## API Endpoints

**Base URL:** `/api/accounting/subsidiary-ledgers`

### 1. Sales Ledger Table
```http
GET /api/accounting/subsidiary-ledgers/sales-ledger/table
```

### 2. Purchase Ledger Table
```http
GET /api/accounting/subsidiary-ledgers/purchase-ledger/table
```

### 3. Cash Book Table
```http
GET /api/accounting/subsidiary-ledgers/cash-book/table
```

### 4. Combined Transactions Table
```http
GET /api/accounting/subsidiary-ledgers/transactions/table
```

---

## Query Parameters

All table endpoints support the following query parameters:

| Parameter | Type | Required | Description | Example |
|-----------|------|----------|-------------|---------|
| `customerId` | string | No | Filter by specific customer (Sales Ledger only) | `customer-uuid-123` |
| `supplierId` | string | No | Filter by specific supplier (Purchase Ledger only) | `supplier-uuid-456` |
| `accountCode` | string | No | Filter by specific account (Cash Book only) | `1100` |
| `transactionType` | string | No | Filter by transaction type | `SALE`, `PURCHASE`, `PAYMENT`, `RECEIPT` |
| `startDate` | string | No | Filter from date (ISO format) | `2025-01-01T00:00:00.000Z` |
| `endDate` | string | No | Filter to date (ISO format) | `2025-01-31T23:59:59.999Z` |
| `page` | number | No | Page number (default: 1) | `1` |
| `limit` | number | No | Items per page (default: 50) | `25` |
| `search` | string | No | Search across multiple fields | `ABC Company` |
| `ledgerType` | string | No | Filter by ledger type (Combined Table only) | `sales`, `purchase`, `cashbook` |

### Transaction Types by Ledger:

**Sales Ledger:**
- `SALE` - Sales transaction
- `RETURN` - Sales return
- `ADJUSTMENT` - Adjustment transaction
- `REFUND` - Refund transaction
- `PAYMENT` - Payment received

**Purchase Ledger:**
- `PURCHASE` - Purchase transaction
- `RETURN` - Purchase return
- `ADJUSTMENT` - Adjustment transaction
- `PAYMENT` - Payment made

**Cash Book:**
- `RECEIPT` - Money received
- `PAYMENT` - Money paid out
- `TRANSFER` - Internal transfer
- `BANK_CHARGE` - Bank charges

---

## Response Format

All table endpoints return data in the following format:

```json
{
  "message": "Operation completed successfully",
  "statusCode": 200,
  "data": {
    "transactions": [
      // Array of transaction objects
    ],
    "total": 150,
    "page": 1,
    "limit": 50,
    "totalPages": 3
  }
}
```

### Transaction Object Structure:

**Sales Ledger Transaction:**
```json
{
  "id": "transaction-uuid-1",
  "tenantId": "tenant-uuid",
  "customerId": "customer-uuid-123",
  "customerName": "ABC Company Ltd",
  "transactionType": "SALE",
  "transactionDate": "2025-01-15T10:30:00.000Z",
  "referenceNumber": "INV-001",
  "sourceDocumentId": "invoice-uuid-1",
  "sourceModule": "SALES",
  "invoiceNumber": "INV-001",
  "salesAmount": "1000.00",
  "taxAmount": "150.00",
  "discountAmount": "50.00",
  "netAmount": "1100.00",
  "runningBalance": "2500.00",
  "paymentTerms": "NET30",
  "dueDate": "2025-02-14T10:30:00.000Z",
  "description": "Product sale - Office supplies",
  "glTransactionId": "gl-transaction-uuid-1",
  "createdAt": "2025-01-15T10:30:00.000Z",
  "updatedAt": "2025-01-15T10:30:00.000Z"
}
```

**Purchase Ledger Transaction:**
```json
{
  "id": "transaction-uuid-2",
  "tenantId": "tenant-uuid",
  "supplierId": "supplier-uuid-456",
  "supplierName": "XYZ Supplies Ltd",
  "transactionType": "PURCHASE",
  "transactionDate": "2025-01-15T14:20:00.000Z",
  "referenceNumber": "PI-001",
  "sourceDocumentId": "invoice-uuid-2",
  "sourceModule": "PURCHASE_INVOICES",
  "invoiceNumber": "PI-001",
  "purchaseAmount": "800.00",
  "taxAmount": "120.00",
  "discountAmount": "20.00",
  "netAmount": "900.00",
  "runningBalance": "1500.00",
  "paymentTerms": "CREDIT",
  "dueDate": "2025-02-14T14:20:00.000Z",
  "description": "Purchase invoice - Office equipment",
  "glTransactionId": "gl-transaction-uuid-2",
  "createdAt": "2025-01-15T14:20:00.000Z",
  "updatedAt": "2025-01-15T14:20:00.000Z"
}
```

**Cash Book Transaction:**
```json
{
  "id": "transaction-uuid-3",
  "tenantId": "tenant-uuid",
  "accountCode": "1100",
  "accountName": "Cash and Bank",
  "transactionType": "RECEIPT",
  "transactionDate": "2025-01-15T16:30:00.000Z",
  "referenceNumber": "RCP-001",
  "sourceDocumentId": "receipt-uuid-1",
  "sourceModule": "SALES",
  "partyType": "CUSTOMER",
  "partyId": "customer-uuid-123",
  "partyName": "ABC Company Ltd",
  "receiptAmount": "1000.00",
  "paymentAmount": "0.00",
  "runningBalance": "5000.00",
  "description": "Cash receipt from customer",
  "glTransactionId": "gl-transaction-uuid-3",
  "createdAt": "2025-01-15T16:30:00.000Z",
  "updatedAt": "2025-01-15T16:30:00.000Z"
}
```

---

## Request Examples

### 1. Get All Sales Ledger Transactions (First Page)
```bash
GET /api/accounting/subsidiary-ledgers/sales-ledger/table?page=1&limit=25
Headers: 
  x-tenant-id: tenant-123e4567-e89b-12d3-a456-426614174000
```

### 2. Get Sales Transactions for Specific Customer
```bash
GET /api/accounting/subsidiary-ledgers/sales-ledger/table?customerId=customer-uuid-123&limit=50
Headers: 
  x-tenant-id: tenant-123e4567-e89b-12d3-a456-426614174000
```

### 3. Get Sales Transactions with Date Range and Search
```bash
GET /api/accounting/subsidiary-ledgers/sales-ledger/table?startDate=2025-01-01&endDate=2025-01-31&search=ABC&transactionType=SALE
Headers: 
  x-tenant-id: tenant-123e4567-e89b-12d3-a456-426614174000
```

### 4. Get Purchase Ledger Transactions
```bash
GET /api/accounting/subsidiary-ledgers/purchase-ledger/table?supplierId=supplier-uuid-456&page=2&limit=20
Headers: 
  x-tenant-id: tenant-123e4567-e89b-12d3-a456-426614174000
```

### 5. Get Cash Book Transactions
```bash
GET /api/accounting/subsidiary-ledgers/cash-book/table?accountCode=1100&transactionType=PAYMENT&startDate=2025-01-01
Headers: 
  x-tenant-id: tenant-123e4567-e89b-12d3-a456-426614174000
```

### 6. Get Combined Transactions (All Ledgers)
```bash
GET /api/accounting/subsidiary-ledgers/transactions/table?ledgerType=sales&page=1&limit=100
Headers: 
  x-tenant-id: tenant-123e4567-e89b-12d3-a456-426614174000
```

---

## Response Examples

### 1. Sales Ledger Table Response
```json
{
  "message": "Operation completed successfully",
  "statusCode": 200,
  "data": {
    "transactions": [
      {
        "id": "sales-txn-001",
        "tenantId": "tenant-123e4567-e89b-12d3-a456-426614174000",
        "customerId": "customer-uuid-123",
        "customerName": "ABC Company Ltd",
        "transactionType": "SALE",
        "transactionDate": "2025-01-15T10:30:00.000Z",
        "referenceNumber": "INV-001",
        "sourceDocumentId": "invoice-uuid-1",
        "sourceModule": "SALES",
        "invoiceNumber": "INV-001",
        "salesAmount": "1000.00",
        "taxAmount": "150.00",
        "discountAmount": "50.00",
        "netAmount": "1100.00",
        "runningBalance": "2500.00",
        "paymentTerms": "NET30",
        "dueDate": "2025-02-14T10:30:00.000Z",
        "description": "Product sale - Office supplies",
        "glTransactionId": "gl-transaction-uuid-1",
        "createdAt": "2025-01-15T10:30:00.000Z",
        "updatedAt": "2025-01-15T10:30:00.000Z"
      }
    ],
    "total": 25,
    "page": 1,
    "limit": 25,
    "totalPages": 1
  }
}
```

### 2. Combined Transactions Response
```json
{
  "message": "Operation completed successfully",
  "statusCode": 200,
  "data": {
    "salesLedger": {
      "transactions": [...],
      "total": 25,
      "page": 1,
      "limit": 50,
      "totalPages": 1
    },
    "purchaseLedger": {
      "transactions": [...],
      "total": 15,
      "page": 1,
      "limit": 50,
      "totalPages": 1
    },
    "cashBook": {
      "transactions": [...],
      "total": 30,
      "page": 1,
      "limit": 50,
      "totalPages": 1
    },
    "summary": {
      "totalSalesTransactions": 25,
      "totalPurchaseTransactions": 15,
      "totalCashBookTransactions": 30,
      "totalTransactions": 70
    }
  }
}
```

---

## Error Handling

### Common Error Responses

#### Missing Tenant ID
```json
{
  "message": "Tenant ID is required",
  "statusCode": 400
}
```

#### Invalid Query Parameters
```json
{
  "message": "Invalid query parameters",
  "statusCode": 400,
  "error": "Invalid date format for startDate"
}
```

#### Internal Server Error
```json
{
  "message": "Internal server error",
  "statusCode": 500,
  "error": "Database connection failed"
}
```

---

## Usage Guidelines

### 1. Pagination Best Practices
- Use `limit` to control page size (recommended: 25-100 items per page)
- Implement proper pagination controls in your frontend
- Consider performance implications of large page sizes

### 2. Search Implementation
- Search is case-insensitive and supports partial matches
- Search works across multiple fields simultaneously
- Use specific filters (like `customerId`) for better performance

### 3. Date Filtering
- Always use ISO 8601 format for dates
- Include timezone information when possible
- Use `startDate` and `endDate` together for range queries

### 4. Performance Considerations
- Use specific filters to reduce result sets
- Implement proper indexing on frequently queried fields
- Consider caching for frequently accessed data

### 5. Frontend Integration
- The response format is designed for direct table consumption
- Use the `total` and `totalPages` for pagination controls
- Implement proper loading states and error handling

---

## Frontend Table Implementation Example

```javascript
// Example React component for displaying transactions
const TransactionTable = ({ ledgerType }) => {
  const [transactions, setTransactions] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 25 });
  const [filters, setFilters] = useState({ search: '', startDate: '', endDate: '' });

  const fetchTransactions = async () => {
    const params = new URLSearchParams({
      page: pagination.page,
      limit: pagination.limit,
      ...filters
    });

    const response = await fetch(`/api/accounting/subsidiary-ledgers/${ledgerType}/table?${params}`, {
      headers: { 'x-tenant-id': tenantId }
    });
    
    const data = await response.json();
    setTransactions(data.data.transactions);
    setPagination({
      ...pagination,
      totalPages: data.data.totalPages,
      total: data.data.total
    });
  };

  useEffect(() => {
    fetchTransactions();
  }, [pagination.page, filters]);

  return (
    <div>
      {/* Filter controls */}
      <div className="filters">
        <input 
          placeholder="Search..." 
          value={filters.search}
          onChange={(e) => setFilters({...filters, search: e.target.value})}
        />
        <input 
          type="date" 
          value={filters.startDate}
          onChange={(e) => setFilters({...filters, startDate: e.target.value})}
        />
        <input 
          type="date" 
          value={filters.endDate}
          onChange={(e) => setFilters({...filters, endDate: e.target.value})}
        />
      </div>

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Reference</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(transaction => (
            <tr key={transaction.id}>
              <td>{new Date(transaction.transactionDate).toLocaleDateString()}</td>
              <td>{transaction.referenceNumber}</td>
              <td>{transaction.description}</td>
              <td>{transaction.netAmount || transaction.receiptAmount || transaction.paymentAmount}</td>
              <td>{transaction.runningBalance}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button 
          disabled={pagination.page === 1}
          onClick={() => setPagination({...pagination, page: pagination.page - 1})}
        >
          Previous
        </button>
        <span>Page {pagination.page} of {pagination.totalPages}</span>
        <button 
          disabled={pagination.page === pagination.totalPages}
          onClick={() => setPagination({...pagination, page: pagination.page + 1})}
        >
          Next
        </button>
      </div>
    </div>
  );
};
```

---

## Support

For technical support or questions about these table-view APIs, please refer to the main API documentation or contact the development team.
