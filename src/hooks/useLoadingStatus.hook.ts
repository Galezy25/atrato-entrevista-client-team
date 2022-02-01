import { useCallback, useState } from 'react';

export function useLoadingStatus() {
  const [status, setStatus] =
    useState<'none' | 'loading' | 'error' | 'success'>('none');
  const [lastError, setLastError] = useState<any>(undefined);
  const createLoadingControl = useCallback(() => {
    let loadingControl = {
      error: undefined,
      setLoading: (isLoading: boolean) => {
        if (isLoading) {
          setLastError(undefined);
          setStatus('loading');
        } else if (loadingControl.error) {
          setStatus('error');
          setLastError(loadingControl.error);
          setTimeout(() => setStatus('none'), 2000);
        } else {
          setStatus('success');
          setLastError(undefined);
          setTimeout(() => setStatus('none'), 2000);
        }
      },
      setError: (error: any) => {
        loadingControl.error = error;
      },
    };
    return loadingControl;
  }, []);
  return {
    status,
    lastError,
    createLoadingControl,
  };
}
export default useLoadingStatus;
