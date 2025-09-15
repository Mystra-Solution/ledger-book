'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { ApiStatusBanner } from '@/components/common/ApiStatusBanner';
import { Pagination } from '@/components/common/Pagination';
import { PageHeader } from '@/components/layout/PageHeader';
import { ledgerAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { formatCurrency, formatDate, getTransactionTypeColor } from '@/lib/utils';
import { ITEMS_PER_PAGE } from '@/lib/constants';
import type { CashTransaction, TableResponse } from '@/types/ledger';
import { Search, Filter, Download, ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

export function CashBook() {
  const { getHeaders, isConfigured } = useAuth();
  const [data, setData] = useState<TableResponse<CashTransaction> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAccount, setSelectedAccount] = useState<string>('');

  const fetchData = useCallback(async () => {
    if (!isConfigured) {
      setError('Please configure your API settings first');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const headers = getHeaders();
      console.log('Cash Book headers:', headers); // Debug log
      const params = {
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        ...(selectedAccount && { accountCode: selectedAccount }),
        ...(searchTerm && { search: searchTerm }),
      };

      const response = await ledgerAPI.getCashBookTable(params, headers);
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch cash book data');
    } finally {
      setLoading(false);
    }
  }, [isConfigured, getHeaders, currentPage, selectedAccount, searchTerm]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1); // Reset to first page when searching
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Cash Book" description="Track cash and bank transactions" />
        <LoadingSpinner className="py-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader title="Cash Book" description="Track cash and bank transactions" />
        <ErrorMessage message={error} onRetry={fetchData} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Cash Book" 
        description="Track cash and bank transactions"
      >
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </PageHeader>

      <ApiStatusBanner />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="py-6">
            <div className="text-2xl font-bold text-blue-600">
              {data?.transactions?.length || 0}
            </div>
            <p className="text-gray-600">Total Transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-6">
            <div className="text-2xl font-bold text-green-600">
              {data?.total || 0}
            </div>
            <p className="text-gray-600">Total Records</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-6">
            <div className="text-2xl font-bold text-purple-600">
              {data?.totalPages || 0}
            </div>
            <p className="text-gray-600">Total Pages</p>
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
              placeholder="Account Code (optional)"
              value={selectedAccount}
              onChange={(e) => setSelectedAccount(e.target.value)}
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
          <CardTitle>Cash Transactions</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Account</TableHead>
                <TableHead>Party</TableHead>
                <TableHead>Reference</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Receipt</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Balance</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.transactions?.map((transaction) => {
                return (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {formatDate(transaction.transactionDate)}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{transaction.accountName}</div>
                        <div className="text-sm text-gray-500">{transaction.accountCode}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{transaction.partyName}</div>
                        <div className="text-sm text-gray-500">{transaction.partyType}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {transaction.referenceNumber}
                    </TableCell>
                    <TableCell>
                      <Badge className={getTransactionTypeColor(transaction.transactionType)}>
                        {transaction.transactionType}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {parseFloat(transaction.receiptAmount) > 0 && (
                        <div className="flex items-center text-green-600">
                          <ArrowUpCircle className="w-4 h-4 mr-1" />
                          {formatCurrency(transaction.receiptAmount)}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {parseFloat(transaction.paymentAmount) > 0 && (
                        <div className="flex items-center text-red-600">
                          <ArrowDownCircle className="w-4 h-4 mr-1" />
                          {formatCurrency(transaction.paymentAmount)}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium">
                      {formatCurrency(transaction.runningBalance)}
                    </TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate" title={transaction.description}>
                        {transaction.description}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          
          {data?.transactions?.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No transactions found
            </div>
          )}
          
          <Pagination
            currentPage={currentPage}
            totalPages={data?.totalPages || 1}
            onPageChange={setCurrentPage}
          />
        </CardContent>
      </Card>
    </div>
  );
}
