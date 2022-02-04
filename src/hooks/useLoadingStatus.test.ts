import { renderHook, act } from '@testing-library/react-hooks';
import { useLoadingStatus } from './useLoadingStatus.hook';

describe('useLoadingStatus', () => {
  test('createLoadingControl success status should have empty error', () => {
    const { result: hookValues } = renderHook(() => useLoadingStatus());
    let loadingControl = hookValues.current.createLoadingControl();
    act(() => {
      loadingControl.setLoading(true);
    });
    expect(hookValues.current.status).toBe('loading');
    act(() => {
      loadingControl.setLoading(false);
    });
    expect(hookValues.current.status).toBe('success');
    expect(loadingControl.error).toBe(undefined);
    expect(hookValues.current.lastError).toBe(undefined);
  });

  test('createLoadingControl error status should have an error', () => {
    const { result: hookValues } = renderHook(() => useLoadingStatus());
    let loadingControl = hookValues.current.createLoadingControl();
    act(() => {
      loadingControl.setLoading(true);
    });
    expect(hookValues.current.status).toBe('loading');
    act(() => {
      loadingControl.setError('This is an error');
    });
    act(() => {
      loadingControl.setLoading(false);
    });
    expect(hookValues.current.status).toBe('error');
    expect(loadingControl.error).toBe('This is an error');
    expect(hookValues.current.lastError).toBe('This is an error');
  });
});
