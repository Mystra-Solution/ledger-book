import { useAuth } from '@/contexts/AuthContext';
import { AlertCircle, Settings } from 'lucide-react';

export function ApiStatusBanner() {
  const { isConfigured } = useAuth();

  if (isConfigured) return null;

  return (
    <div className="bg-orange-50 border-l-4 border-orange-400 p-4 mb-6">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertCircle className="h-5 w-5 text-orange-400" />
        </div>
        <div className="ml-3">
          <p className="text-sm text-orange-700">
            <span className="font-medium">API Configuration Required:</span> Please click the{' '}
            <Settings className="inline w-4 h-4 mx-1" />
            Settings button in the navigation to configure your tenant ID and bearer token.
          </p>
        </div>
      </div>
    </div>
  );
}
