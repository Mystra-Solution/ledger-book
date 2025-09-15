'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  ShoppingBag, 
  Wallet, 
  FileText, 
  Calculator 
} from 'lucide-react';

const iconMap = {
  dashboard: LayoutDashboard,
  'sales-ledger': ShoppingCart,
  'purchase-ledger': ShoppingBag,
  'cash-book': Wallet,
  'general-ledger': FileText,
  'trial-balance': Calculator,
};

export function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Ledger Book</h1>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              {NAV_ITEMS.map((item) => {
                const Icon = iconMap[item.id as keyof typeof iconMap];
                const isActive = pathname === item.path;
                
                return (
                  <Link
                    key={item.id}
                    href={item.path}
                    className={cn(
                      'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
                      isActive
                        ? 'border-blue-500 text-gray-900'
                        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                    )}
                  >
                    <Icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="sm:hidden">
        <div className="pt-2 pb-3 space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = iconMap[item.id as keyof typeof iconMap];
            const isActive = pathname === item.path;
            
            return (
              <Link
                key={item.id}
                href={item.path}
                className={cn(
                  'flex items-center px-3 py-2 border-l-4 text-sm font-medium',
                  isActive
                    ? 'bg-blue-50 border-blue-500 text-blue-700'
                    : 'border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800'
                )}
              >
                <Icon className="w-4 h-4 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
