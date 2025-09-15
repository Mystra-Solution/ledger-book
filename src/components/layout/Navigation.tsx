'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { NAV_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { SettingsModal } from '@/components/settings/SettingsModal';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  ShoppingBag, 
  Wallet, 
  FileText, 
  Calculator,
  Settings,
  AlertCircle
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
  const { isConfigured } = useAuth();
  const [showSettings, setShowSettings] = useState(false);

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Ledger Book</h1>
              {!isConfigured && (
                <Badge variant="warning" className="ml-3">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  Setup Required
                </Badge>
              )}
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
          
          {/* Settings Button */}
          <div className="flex items-center">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowSettings(true)}
              className={cn(
                'flex items-center',
                !isConfigured && 'border-orange-300 text-orange-700 hover:bg-orange-50'
              )}
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
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
      
      {/* Settings Modal */}
      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </nav>
  );
}
