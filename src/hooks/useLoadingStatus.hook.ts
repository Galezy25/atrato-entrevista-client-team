import { useCallback, useState } from 'react';

export function useLoadingStatus() {
  const [status, setStatus] =
    useState<'none' | 'loading' | 'error' | 'success'>('none');
  const [lastError, setLastError] = useState<any>(undefined);
  const createLoadingControl = useCallback((after: (error?: any)=>void = ()=>{}) => {
    let loadingControl = {
      error: undefined,
      setLoading: (isLoading: boolean) => {
        if (isLoading) {
          setLastError(undefined);
          setStatus('loading');
        } else if (loadingControl.error) {
          setStatus('error');
          setLastError(loadingControl.error);
          after(loadingControl.error);
        } else {
          setStatus('success');
          setLastError(undefined);
          after();
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
    setStatus,
    createLoadingControl,
  };
}
export default useLoadingStatus;
