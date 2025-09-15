'use client';

import { useState, useEffect } from 'react';
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
import { formatCurrency, formatDate } from '@/lib/utils';
import { ITEMS_PER_PAGE } from '@/lib/constants';
import type { GLTransactionsData, GLTransaction, GLEntriesData } from '@/types/ledger';
import { Search, Filter, Download, Eye, FileText } from 'lucide-react';

export function GeneralLedger() {
  const [data, setData] = useState<GLTransactionsData | null>(null);
  const [selectedTransaction, setSelectedTransaction] = useState<GLTransaction | null>(null);
  const [transactionEntries, setTransactionEntries] = useState<GLEntriesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [entriesLoading, setEntriesLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedModule, setSelectedModule] = useState<string>('');

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const params = {
        page: currentPage,
        limit: ITEMS_PER_PAGE,
        ...(selectedModule && { sourceModule: selectedModule }),
      };

      const response = await ledgerAPI.getGLTransactions(params);
      setData(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch general ledger data');
    } finally {
      setLoading(false);
    }
  };

  const fetchTransactionEntries = async (transactionId: string) => {
    try {
      setEntriesLoading(true);
      const response = await ledgerAPI.getGLEntries(transactionId);
      setTransactionEntries(response.data);
    } catch (err) {
      console.error('Failed to fetch transaction entries:', err);
    } finally {
      setEntriesLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [currentPage, selectedModule]);

  const handleViewEntries = async (transaction: GLTransaction) => {
    setSelectedTransaction(transaction);
    await fetchTransactionEntries(transaction.id);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const filteredTransactions = data?.transactions?.filter(transaction =>
    transaction.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transaction.sourceModule.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="General Ledger" description="View all general ledger transactions" />
        <LoadingSpinner className="py-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader title="General Ledger" description="View all general ledger transactions" />
        <ErrorMessage message={error} onRetry={fetchData} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader 
        title="General Ledger" 
        description="View all general ledger transactions"
      >
        <Button variant="outline" size="sm">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </PageHeader>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="py-6">
            <div className="text-2xl font-bold text-blue-600">
              {data?.total || 0}
            </div>
            <p className="text-gray-600">Total Transactions</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-6">
            <div className="text-2xl font-bold text-green-600">
              {data?.totalPages || 0}
            </div>
            <p className="text-gray-600">Total Pages</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-6">
            <div className="text-2xl font-bold text-purple-600">
              {data?.page || 1}
            </div>
            <p className="text-gray-600">Current Page</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="py-6">
            <div className="text-2xl font-bold text-orange-600">
              {data?.limit || ITEMS_PER_PAGE}
            </div>
            <p className="text-gray-600">Items Per Page</p>
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
              placeholder="Source Module (optional)"
              value={selectedModule}
              onChange={(e) => setSelectedModule(e.target.value)}
            />
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Transactions Table */}
        <Card>
          <CardHeader>
            <CardTitle>GL Transactions</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Reference</TableHead>
                  <TableHead>Module</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.map((transaction) => (
                  <TableRow 
                    key={transaction.id}
                    className={selectedTransaction?.id === transaction.id ? 'bg-blue-50' : ''}
                  >
                    <TableCell>
                      {formatDate(transaction.transactionDate)}
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{transaction.referenceNumber}</div>
                        <div className="text-sm text-gray-500 truncate max-w-32" title={transaction.description}>
                          {transaction.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="info">
                        {transaction.sourceModule}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-green-600">
                          Dr: {formatCurrency(transaction.totalDebit)}
                        </div>
                        <div className="text-red-600">
                          Cr: {formatCurrency(transaction.totalCredit)}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={transaction.isPosted ? 'success' : 'warning'}>
                        {transaction.isPosted ? 'Posted' : 'Draft'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleViewEntries(transaction)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredTransactions.length === 0 && (
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

        {/* Transaction Entries */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Transaction Entries
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!selectedTransaction ? (
              <div className="text-center py-8 text-gray-500">
                Select a transaction to view its entries
              </div>
            ) : entriesLoading ? (
              <LoadingSpinner className="py-8" />
            ) : transactionEntries ? (
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium">{selectedTransaction.referenceNumber}</h4>
                  <p className="text-sm text-gray-600">{selectedTransaction.description}</p>
                  <p className="text-sm text-gray-600">Date: {formatDate(selectedTransaction.transactionDate)}</p>
                </div>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account</TableHead>
                      <TableHead>Debit</TableHead>
                      <TableHead>Credit</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactionEntries.entries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{entry.accountName}</div>
                            <div className="text-sm text-gray-500">{entry.accountCode}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-green-600">
                          {parseFloat(entry.debitAmount) > 0 && formatCurrency(entry.debitAmount)}
                        </TableCell>
                        <TableCell className="text-red-600">
                          {parseFloat(entry.creditAmount) > 0 && formatCurrency(entry.creditAmount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                
                <div className="bg-gray-50 p-3 rounded text-sm">
                  <div className="flex justify-between">
                    <span>Total Debit:</span>
                    <span className="text-green-600 font-medium">
                      {formatCurrency(selectedTransaction.totalDebit)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Credit:</span>
                    <span className="text-red-600 font-medium">
                      {formatCurrency(selectedTransaction.totalCredit)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                Failed to load transaction entries
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
