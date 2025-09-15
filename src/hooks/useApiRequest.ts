import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface UseApiRequestOptions<T> {
  apiCall: (headers: Record<string, string>) => Promise<T>;
  dependencies?: unknown[];
  skipInitialCall?: boolean;
}

export function useApiRequest<T>({ 
  apiCall, 
  skipInitialCall = false 
}: UseApiRequestOptions<T>) {
  const { getHeaders, isConfigured } = useAuth();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(!skipInitialCall);
  const [error, setError] = useState<string | null>(null);

  const executeRequest = useCallback(async () => {
    if (!isConfigured) {
      setError('Please configure your API settings first');
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const headers = getHeaders();
      const result = await apiCall(headers);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch data');
    } finally {
      setLoading(false);
    }
  }, [isConfigured, apiCall, getHeaders]);

  useEffect(() => {
    if (!skipInitialCall && isConfigured) {
      executeRequest();
    }
  }, [executeRequest, skipInitialCall, isConfigured]);

  return {
    data,
    loading,
    error,
    refetch: executeRequest,
    isConfigured
  };
}
