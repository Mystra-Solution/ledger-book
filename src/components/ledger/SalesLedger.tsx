'use client';

import { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { Pagination } from '@/components/common/Pagination';
import { PageHeader } from '@/components/layout/PageHeader';
import { ledgerAPI } from '@/lib/api';
import { useApiRequest } from '@/hooks/useApiRequest';
import { formatCurrency, formatDate, getTransactionTypeColor, getDueDateStatus } from '@/lib/utils';
import { ITEMS_PER_PAGE } from '@/lib/constants';
import type { SalesLedgerData, SalesTransaction, ApiResponse } from '@/types/ledger';
import { Search, Filter, Download } from 'lucide-react';

export function SalesLedger() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<string>('');

  const { data, loading, error, refetch } = useApiRequest<ApiResponse<SalesLedgerData>>({
    apiCall: (headers) => ledgerAPI.getSalesLedger({
      page: currentPage,
      limit: ITEMS_PER_PAGE,
      ...(selectedCustomer && { customerId: selectedCustomer }),
    }, headers),
    dependencies: [currentPage, selectedCustomer]
  });

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    // In a real app, you'd implement search logic here
  };

  const salesData = data?.data;
  const filteredTransactions = salesData?.transactions?.filter(transaction =>
    transaction.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Sales Ledger" description="Track customer transactions and balances" />
        <LoadingSpinner className="py-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader title="Sales Ledger" description="Track customer transactions and balances" />
        <ErrorMessage message={error} onRetry={refetch} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Sales Ledger" 
        description="Track customer transactions and balances"
      >
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </PageHeader>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="py-6">
            <div className="text-2xl font-bold text-green-600">
              {formatCurrency(salesData?.totalBalance || '0')}
            </div>
            <p className="text-gray-600">Total Sales Balance</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-6">
            <div className="text-2xl font-bold text-blue-600">
              {salesData?.totalCustomers || 0}
            </div>
            <p className="text-gray-600">Total Customers</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-6">
            <div className="text-2xl font-bold text-purple-600">
              {salesData?.totalTransactions || 0}
            </div>
            <p className="text-gray-600">Total Transactions</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Input
              placeholder="Customer ID (optional)"
              value={selectedCustomer}
              onChange={(e) => setSelectedCustomer(e.target.value)}
            />
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Transactions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => {
                const dueStatus = getDueDateStatus(transaction.dueDate);
                
                return (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {formatDate(transaction.transactionDate)}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{transaction.customerName}</div>
                        <div className="text-sm text-gray-500">{transaction.customerId}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{transaction.referenceNumber}</div>
                        <div className="text-sm text-gray-500">{transaction.invoiceNumber}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getTransactionTypeColor(transaction.transactionType)}>
                        {transaction.transactionType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{formatCurrency(transaction.netAmount)}</div>
                        <div className="text-sm text-gray-500">
                          Sales: {formatCurrency(transaction.salesAmount)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(transaction.runningBalance)}
                    </TableCell>
                    <TableCell>
                      {formatDate(transaction.dueDate)}
                    </TableCell>
                    <TableCell>
                      <Badge className={dueStatus.color}>
                        {dueStatus.status === 'overdue' 
                          ? `Overdue ${dueStatus.days}d`
                          : dueStatus.status === 'due-soon'
                          ? `Due in ${dueStatus.days}d`
                          : `${dueStatus.days} days`
                        }
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          {filteredTransactions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No transactions found
            </div>
          )}
          
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil((salesData?.totalTransactions || 0) / ITEMS_PER_PAGE)}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>
    </div>
  );
}
