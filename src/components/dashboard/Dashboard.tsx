'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { ApiStatusBanner } from '@/components/common/ApiStatusBanner';
import { PageHeader } from '@/components/layout/PageHeader';
import { ledgerAPI } from '@/lib/api';
import { useAuth } from '@/contexts/AuthContext';
import { formatCurrency, formatDate } from '@/lib/utils';
import type { LedgerSummary, GLSummaryData } from '@/types/ledger';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Building, 
  Wallet,
  ArrowUpCircle,
  ArrowDownCircle,
  FileText
} from 'lucide-react';

export function Dashboard() {
  const { getHeaders, isConfigured } = useAuth();
  const [summaryData, setSummaryData] = useState<LedgerSummary | null>(null);
  const [glSummary, setGlSummary] = useState<GLSummaryData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    if (!isConfigured) {
      setError('Please configure your API settings first');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const headers = getHeaders();
      console.log('Dashboard headers:', headers); // Debug log
      const [summaryResponse, glSummaryResponse] = await Promise.all([
        ledgerAPI.getLedgerSummaries(headers),
        ledgerAPI.getGLSummary(undefined, headers)
      ]);
      
      setSummaryData(summaryResponse.data);
      setGlSummary(glSummaryResponse.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [isConfigured]);

  if (loading) {
    return (
      <div className="space-y-6">
        <PageHeader title="Dashboard" description="Overview of your ledger books" />
        <LoadingSpinner className="py-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <PageHeader title="Dashboard" description="Overview of your ledger books" />
        <ErrorMessage message={error} onRetry={fetchData} />
      </div>
    );
  }

  const netPosition = parseFloat(summaryData?.summary?.netPosition || '0');
  const salesBalance = parseFloat(summaryData?.salesLedger?.totalBalance || '0');
  const purchaseBalance = parseFloat(summaryData?.purchaseLedger?.totalBalance || '0');
  const cashBalance = parseFloat(summaryData?.cashBook?.totalBalance || '0');

  return (
    <div className="space-y-6">
      <PageHeader 
        title="Dashboard" 
        description="Overview of your ledger books"
      >
        <Button onClick={fetchData} variant="outline" size="sm">
          Refresh Data
        </Button>
      </PageHeader>

      <ApiStatusBanner />

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(salesBalance)}
                </div>
                <p className="text-gray-600">Sales Receivables</p>
              </div>
              <ArrowUpCircle className="w-8 h-8 text-green-600" />
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {summaryData?.salesLedger?.totalCustomers || 0} customers
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-red-600">
                  {formatCurrency(purchaseBalance)}
                </div>
                <p className="text-gray-600">Purchase Payables</p>
              </div>
              <ArrowDownCircle className="w-8 h-8 text-red-600" />
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {summaryData?.purchaseLedger?.totalSuppliers || 0} suppliers
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(cashBalance)}
                </div>
                <p className="text-gray-600">Cash & Bank</p>
              </div>
              <Wallet className="w-8 h-8 text-blue-600" />
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {summaryData?.cashBook?.totalAccounts || 0} accounts
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <div className={`text-2xl font-bold ${netPosition >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(netPosition)}
                </div>
                <p className="text-gray-600">Net Position</p>
              </div>
              {netPosition >= 0 ? (
                <TrendingUp className="w-8 h-8 text-green-600" />
              ) : (
                <TrendingDown className="w-8 h-8 text-red-600" />
              )}
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {netPosition >= 0 ? 'Positive' : 'Negative'} position
            </div>
          </CardContent>
        </Card>
      </div>

      {/* General Ledger Summary */}
      {glSummary && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              General Ledger Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {glSummary.totalTransactions}
                </div>
                <p className="text-gray-600">Total Transactions</p>
              </div>
              <div className="text-center">
                <div className="text-lg text-gray-700">
                  From: {formatDate(glSummary.period.startDate)}
                </div>
                <div className="text-lg text-gray-700">
                  To: {formatDate(glSummary.period.endDate)}
                </div>
                <p className="text-gray-600">Period Range</p>
              </div>
              <div className="text-center">
                <div className="text-sm text-gray-600 italic">
                  {glSummary.summary.note}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Customer Balances */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Recent Customer Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Balance</TableHead>
                  <TableHead>Last Transaction</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summaryData?.salesLedger?.customerBalances?.slice(0, 5).map((customer, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {formatCurrency(customer.balance)}
                    </TableCell>
                    <TableCell>
                      {formatDate(customer.lastTransaction)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={parseFloat(customer.balance) > 0 ? 'success' : 'warning'}>
                        {parseFloat(customer.balance) > 0 ? 'Outstanding' : 'Paid'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Supplier Balances */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Building className="w-5 h-5 mr-2" />
              Recent Supplier Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Balance</TableHead>
                  <TableHead>Last Transaction</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {summaryData?.purchaseLedger?.supplierBalances?.slice(0, 5).map((supplier, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">
                      {formatCurrency(supplier.balance)}
                    </TableCell>
                    <TableCell>
                      {formatDate(supplier.lastTransaction)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={parseFloat(supplier.balance) > 0 ? 'error' : 'success'}>
                        {parseFloat(supplier.balance) > 0 ? 'Outstanding' : 'Paid'}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Cash Account Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Cash Account Balances
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Balance</TableHead>
                <TableHead>Last Transaction</TableHead>
                <TableHead>Account Type</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summaryData?.cashBook?.accountBalances?.map((account, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                    {formatCurrency(account.balance)}
                  </TableCell>
                  <TableCell>
                    {formatDate(account.lastTransaction)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="info">Cash/Bank</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={parseFloat(account.balance) > 0 ? 'success' : 'warning'}>
                      {parseFloat(account.balance) > 0 ? 'Active' : 'Low Balance'}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
