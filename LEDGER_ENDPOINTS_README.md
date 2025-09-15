# Accounting Management API - Ledger Endpoints Documentation

This document provides comprehensive documentation for the Subsidiary Ledger and General Ledger API endpoints, including request/response examples and usage guidelines.

## Table of Contents

1. [Authentication & Headers](#authentication--headers)
2. [Subsidiary Ledger Endpoints](#subsidiary-ledger-endpoints)
3. [General Ledger Endpoints](#general-ledger-endpoints)
4. [Error Handling](#error-handling)
5. [Response Format](#response-format)

---

## Authentication & Headers

All endpoints require the following headers:

```http
x-tenant-id: your-tenant-uuid
Content-Type: application/json
```

**Note:** Replace `your-tenant-uuid` with your actual tenant identifier ("0198c8b0-e911-7334-ab83-a0d682e0dc05" <- hardcode>).

---

## Subsidiary Ledger Endpoints

**Base URL:** `https://accounting-management-backend-development.up.railway.app/api/accounting/subsidiary-ledgers`

### 1. Sales Ledger

#### Get All Sales Ledger Data
```http
GET /api/accounting/subsidiary-ledgers/sales-ledger
```

**Query Parameters:**
- `customerId` (optional): Get specific customer data
- `startDate` (optional): Filter from date (ISO format)
- `endDate` (optional): Filter to date (ISO format)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Request Example:**
```bash
GET /api/accounting/subsidiary-ledgers/sales-ledger?page=1&limit=20
Headers: 
  x-tenant-id: tenant-123e4567-e89b-12d3-a456-426614174000
```

**Response Example:**
```json
{
  "message": "Operation completed successfully",
  "statusCode": 200,
  "data": {
    "totalBalance": "15000.00",
    "customerBalances": [
      {
        "balance": "5000.00",
        "lastTransaction": "2025-01-15T10:30:00.000Z"
      },
      {
        "balance": "3000.00",
        "lastTransaction": "2025-01-14T09:15:00.000Z"
      }
    ],
    "totalCustomers": 25
  }
}
```

#### Get Specific Customer Statement
```http
GET /api/accounting/subsidiary-ledgers/sales-ledger?customerId={customerId}&limit=10
```

**Request Example:**
```bash
GET /api/accounting/subsidiary-ledgers/sales-ledger?customerId=customer-uuid-123&limit=10
Headers: 
  x-tenant-id: tenant-123e4567-e89b-12d3-a456-426614174000
```

**Response Example:**
```json
{
  "message": "Operation completed successfully",
  "statusCode": 200,
  "data": {
    "customerId": "customer-uuid-123",
    "balance": "2500.00",
    "transactions": [
      {
        "id": "transaction-uuid-1",
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
    "totalTransactions": 15
  }
}
```

#### Get Customer Balance
```http
GET /api/accounting/subsidiary-ledgers/sales-ledger/customer/{customerId}
```

**Request Example:**
```bash
GET /api/accounting/subsidiary-ledgers/sales-ledger/customer/customer-uuid-123
Headers: 
  x-tenant-id: tenant-123e4567-e89b-12d3-a456-426614174000
```

**Response Example:**
```json
{
  "message": "Operation completed successfully",
  "statusCode": 200,
  "data": {
    "customerId": "customer-uuid-123",
    "balance": "2500.00",
    "recentTransactions": [
      {
        "id": "transaction-uuid-1",
        "transactionType": "SALE",
        "transactionDate": "2025-01-15T10:30:00.000Z",
        "referenceNumber": "INV-001",
        "netAmount": "1100.00",
        "runningBalance": "2500.00",
        "description": "Product sale - Office supplies"
      }
    ]
  }
}
```

### 2. Purchase Ledger

#### Get All Purchase Ledger Data
```http
GET /api/accounting/subsidiary-ledgers/purchase-ledger
```

**Query Parameters:**
- `supplierId` (optional): Get specific supplier data
- `startDate` (optional): Filter from date (ISO format)
- `endDate` (optional): Filter to date (ISO format)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Request Example:**
```bash
GET /api/accounting/subsidiary-ledgers/purchase-ledger?page=1&limit=20
Headers: 
  x-tenant-id: tenant-123e4567-e89b-12d3-a456-426614174000
```

**Response Example:**
```json
{
  "message": "Operation completed successfully",
  "statusCode": 200,
  "data": {
    "totalBalance": "8000.00",
    "supplierBalances": [
      {
        "balance": "3000.00",
        "lastTransaction": "2025-01-15T14:20:00.000Z"
      },
      {
        "balance": "2500.00",
        "lastTransaction": "2025-01-14T11:45:00.000Z"
      }
    ],
    "totalSuppliers": 15
  }
}
```

#### Get Specific Supplier Statement
```http
GET /api/accounting/subsidiary-ledgers/purchase-ledger?supplierId={supplierId}&limit=10
```

**Request Example:**
```bash
GET /api/accounting/subsidiary-ledgers/purchase-ledger?supplierId=supplier-uuid-456&limit=10
Headers: 
  x-tenant-id: tenant-123e4567-e89b-12d3-a456-426614174000
```

**Response Example:**
```json
{
  "message": "Operation completed successfully",
  "statusCode": 200,
  "data": {
    "supplierId": "supplier-uuid-456",
    "balance": "1500.00",
    "transactions": [
      {
        "id": "transaction-uuid-2",
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
    ],
    "totalTransactions": 8
  }
}
```

#### Get Supplier Balance
```http
GET /api/accounting/subsidiary-ledgers/purchase-ledger/supplier/{supplierId}
```

**Request Example:**
```bash
GET /api/accounting/subsidiary-ledgers/purchase-ledger/supplier/supplier-uuid-456
Headers: 
  x-tenant-id: tenant-123e4567-e89b-12d3-a456-426614174000
```

**Response Example:**
```json
{
  "message": "Operation completed successfully",
  "statusCode": 200,
  "data": {
    "supplierId": "supplier-uuid-456",
    "balance": "1500.00",
    "recentTransactions": [
      {
        "id": "transaction-uuid-2",
        "transactionType": "PURCHASE",
        "transactionDate": "2025-01-15T14:20:00.000Z",
        "referenceNumber": "PI-001",
        "netAmount": "900.00",
        "runningBalance": "1500.00",
        "description": "Purchase invoice - Office equipment"
      }
    ]
  }
}
```

### 3. Cash Book

#### Get All Cash Book Data
```http
GET /api/accounting/subsidiary-ledgers/cash-book
```

**Query Parameters:**
- `accountCode` (optional): Get specific account data
- `startDate` (optional): Filter from date (ISO format)
- `endDate` (optional): Filter to date (ISO format)
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 10)

**Request Example:**
```bash
GET /api/accounting/subsidiary-ledgers/cash-book?page=1&limit=20
Headers: 
  x-tenant-id: tenant-123e4567-e89b-12d3-a456-426614174000
```

**Response Example:**
```json
{
  "message": "Operation completed successfully",
  "statusCode": 200,
  "data": {
    "totalBalance": "12000.00",
    "accountBalances": [
      {
        "balance": "8000.00",
        "lastTransaction": "2025-01-15T16:30:00.000Z"
      },
      {
        "balance": "4000.00",
        "lastTransaction": "2025-01-14T13:15:00.000Z"
      }
    ],
    "totalAccounts": 8
  }
}
```

#### Get Specific Account Statement
```http
GET /api/accounting/subsidiary-ledgers/cash-book?accountCode={accountCode}&limit=10
```

**Request Example:**
```bash
GET /api/accounting/subsidiary-ledgers/cash-book?accountCode=1100&limit=10
Headers: 
  x-tenant-id: tenant-123e4567-e89b-12d3-a456-426614174000
```

**Response Example:**
```json
{
  "message": "Operation completed successfully",
  "statusCode": 200,
  "data": {
    "accountCode": "1100",
    "balance": "5000.00",
    "transactions": [
      {
        "id": "transaction-uuid-3",
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
    ],
    "totalTransactions": 12
  }
}
```

#### Get Account Balance
```http
GET /api/accounting/subsidiary-ledgers/cash-book/account/{accountCode}
```

**Request Example:**
```bash
GET /api/accounting/subsidiary-ledgers/cash-book/account/1100
Headers: 
  x-tenant-id: tenant-123e4567-e89b-12d3-a456-426614174000
```

**Response Example:**
```json
{
  "message": "Operation completed successfully",
  "statusCode": 200,
  "data": {
    "accountCode": "1100",
    "balance": "5000.00",
    "recentTransactions": [
      {
        "id": "transaction-uuid-3",
        "transactionType": "RECEIPT",
        "transactionDate": "2025-01-15T16:30:00.000Z",
        "referenceNumber": "RCP-001",
        "receiptAmount": "1000.00",
        "paymentAmount": "0.00",
        "runningBalance": "5000.00",
        "description": "Cash receipt from customer"
      }
    ]
  }
}
```

### 4. All Ledger Summaries

#### Get All Subsidiary Ledger Summaries
```http
GET /api/accounting/subsidiary-ledgers/summaries
```

**Request Example:**
```bash
GET /api/accounting/subsidiary-ledgers/summaries
Headers: 
  x-tenant-id: tenant-123e4567-e89b-12d3-a456-426614174000
```

**Response Example:**
```json
{
  "message": "Operation completed successfully",
  "statusCode": 200,
  "data": {
    "salesLedger": {
      "totalBalance": "15000.00",
      "totalCustomers": 25,
      "customerBalances": [
        {
          "balance": "5000.00",
          "lastTransaction": "2025-01-15T10:30:00.000Z"
        }
      ]
    },
    "purchaseLedger": {
      "totalBalance": "8000.00",
      "totalSuppliers": 15,
      "supplierBalances": [
        {
          "balance": "3000.00",
          "lastTransaction": "2025-01-15T14:20:00.000Z"
        }
      ]
    },
    "cashBook": {
      "totalBalance": "12000.00",
      "totalAccounts": 8,
      "accountBalances": [
        {
          "balance": "8000.00",
          "lastTransaction": "2025-01-15T16:30:00.000Z"
        }
      ]
    },
    "summary": {
      "totalSalesBalance": "15000.00",
      "totalPurchaseBalance": "8000.00",
      "totalCashBalance": "12000.00",
      "netPosition": "7000.00"
    }
  }
}
```

---

## General Ledger Endpoints

**Base URL:** `/api/accounting/general-ledger`

### 1. GL Transactions

#### Get GL Transactions
```http
GET /api/accounting/general-ledger/transactions
```

**Query Parameters:**
- `startDate` (optional): Filter from date (ISO format)
- `endDate` (optional): Filter to date (ISO format)
- `accountCode` (optional): Filter by account code
- `sourceModule` (optional): Filter by source module
- `page` (optional): Page number (default: 1)
- `limit` (optional): Items per page (default: 50)

**Request Example:**
```bash
GET /api/accounting/general-ledger/transactions?startDate=2025-01-01&endDate=2025-01-31&page=1&limit=20
Headers: 
  x-tenant-id: tenant-123e4567-e89b-12d3-a456-426614174000
```

**Response Example:**
```json
{
  "message": "Operation completed successfully",
  "statusCode": 200,
  "data": {
    "transactions": [
      {
        "id": "gl-transaction-uuid-1",
        "tenantId": "tenant-123e4567-e89b-12d3-a456-426614174000",
        "transactionDate": "2025-01-15T10:30:00.000Z",
        "referenceNumber": "INV-001",
        "description": "Sales transaction",
        "sourceModule": "SALES",
        "sourceDocumentId": "invoice-uuid-1",
        "totalDebit": "1000.00",
        "totalCredit": "1000.00",
        "isPosted": true,
        "createdBy": "user-uuid-1",
        "createdAt": "2025-01-15T10:30:00.000Z",
        "updatedAt": "2025-01-15T10:30:00.000Z"
      }
    ],
    "total": 150,
    "page": 1,
    "limit": 20,
    "totalPages": 8
  }
}
```

### 2. Transaction Entries

#### Get GL Entries for Specific Transaction
```http
GET /api/accounting/general-ledger/transactions/{transactionId}/entries
```

**Request Example:**
```bash
GET /api/accounting/general-ledger/transactions/gl-transaction-uuid-1/entries
Headers: 
  x-tenant-id: tenant-123e4567-e89b-12d3-a456-426614174000
```

**Response Example:**
```json
{
  "message": "Operation completed successfully",
  "statusCode": 200,
  "data": {
    "transactionId": "gl-transaction-uuid-1",
    "entries": [
      {
        "id": "gl-entry-uuid-1",
        "tenantId": "tenant-123e4567-e89b-12d3-a456-426614174000",
        "glTransactionId": "gl-transaction-uuid-1",
        "accountCode": "1200",
        "accountName": "Accounts Receivable",
        "debitAmount": "1000.00",
        "creditAmount": "0.00",
        "entryDescription": "Sales transaction - Invoice INV-001",
        "entryType": "SALE",
        "createdBy": "user-uuid-1",
        "createdAt": "2025-01-15T10:30:00.000Z",
        "updatedAt": "2025-01-15T10:30:00.000Z"
      },
      {
        "id": "gl-entry-uuid-2",
        "tenantId": "tenant-123e4567-e89b-12d3-a456-426614174000",
        "glTransactionId": "gl-transaction-uuid-1",
        "accountCode": "4000",
        "accountName": "Sales Revenue",
        "debitAmount": "0.00",
        "creditAmount": "1000.00",
        "entryDescription": "Sales transaction - Invoice INV-001",
        "entryType": "SALE",
        "createdBy": "user-uuid-1",
        "createdAt": "2025-01-15T10:30:00.000Z",
        "updatedAt": "2025-01-15T10:30:00.000Z"
      }
    ],
    "totalEntries": 2
  }
}
```

### 3. Account Balance

#### Get Account Balance
```http
GET /api/accounting/general-ledger/accounts/{accountCode}/balance
```

**Query Parameters:**
- `asOfDate` (optional): Balance as of specific date (ISO format)

**Request Example:**
```bash
GET /api/accounting/general-ledger/accounts/1200/balance?asOfDate=2025-01-31
Headers: 
  x-tenant-id: tenant-123e4567-e89b-12d3-a456-426614174000
```

**Response Example:**
```json
{
  "message": "Operation completed successfully",
  "statusCode": 200,
  "data": {
    "accountCode": "1200",
    "accountName": "Accounts Receivable",
    "debitTotal": 15000,
    "creditTotal": 5000,
    "balance": 10000,
    "asOfDate": "2025-01-31T00:00:00.000Z"
  }
}
```

### 4. Trial Balance

#### Get Trial Balance
```http
GET /api/accounting/general-ledger/trial-balance
```

**Query Parameters:**
- `asOfDate` (optional): Trial balance as of specific date (ISO format)

**Request Example:**
```bash
GET /api/accounting/general-ledger/trial-balance?asOfDate=2025-01-31
Headers: 
  x-tenant-id: tenant-123e4567-e89b-12d3-a456-426614174000
```

**Response Example:**
```json
{
  "message": "Operation completed successfully",
  "statusCode": 200,
  "data": {
    "asOfDate": "2025-01-31T00:00:00.000Z",
    "message": "Trial balance functionality needs to be implemented",
    "accounts": []
  }
}
```

### 5. GL Summary

#### Get GL Summary Statistics
```http
GET /api/accounting/general-ledger/summary
```

**Query Parameters:**
- `startDate` (optional): Summary from date (ISO format)
- `endDate` (optional): Summary to date (ISO format)

**Request Example:**
```bash
GET /api/accounting/general-ledger/summary?startDate=2025-01-01&endDate=2025-01-31
Headers: 
  x-tenant-id: tenant-123e4567-e89b-12d3-a456-426614174000
```

**Response Example:**
```json
{
  "message": "Operation completed successfully",
  "statusCode": 200,
  "data": {
    "totalTransactions": 150,
    "period": {
      "startDate": "2025-01-01T00:00:00.000Z",
      "endDate": "2025-01-31T00:00:00.000Z"
    },
    "summary": {
      "message": "GL summary statistics",
      "note": "Additional summary calculations can be added here"
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

#### Missing Required Parameter
```json
{
  "message": "Customer ID is required",
  "statusCode": 400
}
```

#### Internal Server Error
```json
{
  "message": "Internal server error",
  "statusCode": 500,
  "error": "Detailed error message"
}
```

#### Resource Not Found
```json
{
  "message": "Resource not found",
  "statusCode": 404
}
```

---

## Response Format

All API responses follow a consistent format:

```json
{
  "message": "Operation completed successfully",
  "statusCode": 200,
  "data": {
    // Response data here
  }
}
```

### Response Fields

- `message`: Human-readable message describing the result
- `statusCode`: HTTP status code
- `data`: The actual response data (varies by endpoint)
- `error`: Error details (only present in error responses)

### Status Codes

- `200`: Success
- `400`: Bad Request (validation errors, missing parameters)
- `404`: Not Found
- `500`: Internal Server Error

---

## Usage Notes

1. **Pagination**: Most list endpoints support pagination with `page` and `limit` parameters
2. **Date Filtering**: Use ISO 8601 format for dates (e.g., `2025-01-15T10:30:00.000Z`)
3. **Tenant Isolation**: All data is isolated by tenant ID
4. **Rate Limiting**: Consider implementing rate limiting for production use
5. **Caching**: Consider caching frequently accessed data for better performance

---

## Support

For technical support or questions about these endpoints, please contact the development team or refer to the main API documentation.
