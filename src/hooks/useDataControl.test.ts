import { act, renderHook } from '@testing-library/react-hooks';

import useDataControl from './useDataControl.hook';

describe('useDataControl hook', () => {
  let allData = [
    {
      id: 'a',
      category: 1,
    },
    {
      id: 'c',
      category: 1,
    },
    {
      id: 'e',
      category: 2,
    },
    {
      id: 'b',
      category: 3,
    },
    {
      id: 'd',
      category: 2,
    },
  ];
  test('Filter test', async () => {
    const { result } = renderHook(() => useDataControl(allData));
    act(() => {
      result.current.filter((el) => el.category === 2);
    });
    expect(result.current.data.length).toBe(2);
  });
  test('Sort test', async () => {
    const { result } = renderHook(() => useDataControl(allData));
    act(() => {
      result.current.sort((el) => el.id);
    });
    expect(result.current.data.map((el) => el.id).join(',')).toBe('a,b,c,d,e');
    act(() => {
      result.current.sort((el) => el.id, 'DESC');
    });
    expect(result.current.data.map((el) => el.id).join(',')).toBe('e,d,c,b,a');
  });

  test('Filter and sort', () => {
    const { result } = renderHook(() => useDataControl(allData));
    act(() => {
      result.current.filter((el) => el.category === 1);
      result.current.sort((el) => el.id);
    });
    expect(result.current.data.map((el) => el.id).join(',')).toBe('a,c');
  });
  test('Set new data', () => {
    const { result } = renderHook(() => useDataControl<any>([]));
    act(() => {
      result.current.setAllData(allData);
    });
    expect(result.current.data).toMatchObject(allData);
  });
});
