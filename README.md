# Ledger Book - Accounting Management System

A comprehensive accounting ledger management system built with Next.js, TypeScript, and Tailwind CSS. This application provides a complete suite of tools for managing subsidiary ledgers, general ledger, and trial balance functionality.

## Features

### 📊 Dashboard
- Real-time overview of all ledger balances
- Key performance indicators (KPIs)
- Recent transaction summaries
- Net position tracking

### 📚 Subsidiary Ledgers
- **Sales Ledger**: Track customer transactions and receivables
- **Purchase Ledger**: Manage supplier transactions and payables  
- **Cash Book**: Monitor cash and bank account transactions

### 📖 General Ledger
- View all general ledger transactions
- Drill-down into transaction entries
- Account balance tracking
- Source module filtering

### 🧮 Trial Balance
- Generate trial balance as of any date
- Real-time balance validation
- Export functionality
- Account-wise breakdown

### 🎨 Modern UI Features
- Responsive design for all devices
- Clean and intuitive interface
- Real-time data updates
- Advanced filtering and search
- Pagination for large datasets
- Professional styling with Tailwind CSS

## Technology Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Date Handling**: date-fns
- **Charts**: Recharts (ready for future chart implementations)
- **Development**: ESLint, TypeScript compiler

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── layout.tsx               # Root layout with navigation
│   ├── page.tsx                 # Dashboard homepage
│   ├── sales-ledger/           # Sales ledger page
│   ├── purchase-ledger/        # Purchase ledger page
│   ├── cash-book/              # Cash book page
│   ├── general-ledger/         # General ledger page
│   └── trial-balance/          # Trial balance page
├── components/
│   ├── ui/                     # Reusable UI components
│   │   ├── Card.tsx           # Card component
│   │   ├── Button.tsx         # Button variants
│   │   ├── Table.tsx          # Table components
│   │   ├── Badge.tsx          # Status badges
│   │   └── Input.tsx          # Input components
│   ├── layout/                # Layout components
│   │   ├── Navigation.tsx     # Main navigation
│   │   └── PageHeader.tsx     # Page headers
│   ├── common/                # Common components
│   │   ├── LoadingSpinner.tsx # Loading states
│   │   ├── ErrorMessage.tsx   # Error handling
│   │   └── Pagination.tsx     # Pagination component
│   ├── dashboard/             # Dashboard specific
│   │   └── Dashboard.tsx      # Main dashboard
│   └── ledger/               # Ledger components
│       ├── SalesLedger.tsx   # Sales ledger
│       ├── PurchaseLedger.tsx # Purchase ledger
│       ├── CashBook.tsx      # Cash book
│       ├── GeneralLedger.tsx # General ledger
│       └── TrialBalance.tsx  # Trial balance
├── lib/                      # Utility libraries
│   ├── api.ts               # API service layer
│   ├── constants.ts         # App constants
│   └── utils.ts            # Utility functions
└── types/                   # TypeScript definitions
    └── ledger.ts           # Ledger type definitions
```

## API Integration

The application integrates with the Accounting Management Backend API:

- **Base URL**: `https://accounting-management-backend-development.up.railway.app`
- **Tenant ID**: `0198c8b0-e911-7334-ab83-a0d682e0dc05`

### Supported Endpoints

#### Subsidiary Ledgers
- Sales Ledger: `/api/accounting/subsidiary-ledgers/sales-ledger`
- Purchase Ledger: `/api/accounting/subsidiary-ledgers/purchase-ledger`
- Cash Book: `/api/accounting/subsidiary-ledgers/cash-book`
- Summaries: `/api/accounting/subsidiary-ledgers/summaries`

#### General Ledger
- Transactions: `/api/accounting/general-ledger/transactions`
- Trial Balance: `/api/accounting/general-ledger/trial-balance`
- Summary: `/api/accounting/general-ledger/summary`

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ledger-book
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   ```
   http://localhost:3000
   ```

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint checks

## Usage Guide

### Dashboard Overview
The dashboard provides a quick overview of your accounting data:
- **Sales Receivables**: Outstanding customer balances
- **Purchase Payables**: Outstanding supplier balances  
- **Cash & Bank**: Current cash positions
- **Net Position**: Overall financial position

### Sales Ledger
- View all customer transactions
- Filter by customer ID or date range
- Track payment terms and due dates
- Monitor outstanding receivables

### Purchase Ledger
- Manage supplier transactions
- Track payment obligations
- Monitor supplier balances
- Filter by supplier or date

### Cash Book
- Record cash receipts and payments
- Track bank account balances
- Monitor cash flow
- Filter by account code

### General Ledger
- View all accounting transactions
- Drill down into transaction details
- See debit and credit entries
- Filter by source module

### Trial Balance
- Generate trial balance for any date
- Verify accounting equation balance
- Export trial balance reports
- View account-wise balances

## Key Features

### 🔍 Advanced Search & Filtering
- Real-time search across all transaction fields
- Date range filtering
- Entity-specific filtering (Customer ID, Supplier ID, Account Code)
- Source module filtering

### 📱 Responsive Design
- Mobile-first approach
- Tablet and desktop optimized
- Touch-friendly interface
- Collapsible navigation on mobile

### ⚡ Performance Optimized
- Efficient API calls with pagination
- Loading states for better UX
- Error handling and retry mechanisms
- Optimized re-renders

### 🎨 Professional UI
- Clean, modern design
- Consistent color coding
- Status indicators and badges
- Professional typography

## API Response Handling

The application handles various API response formats:

### Success Response
```json
{
  "message": "Operation completed successfully",
  "statusCode": 200,
  "data": { ... }
}
```

### Error Response
```json
{
  "message": "Error message",
  "statusCode": 400,
  "error": "Detailed error information"
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For technical support or questions:
- Check the API documentation in `LEDGER_ENDPOINTS_README.md`
- Review the codebase structure
- Contact the development team

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**