import { useCallback, useState } from 'react';

export function useDataControl<T extends { [key: string]: any }>(allData: T[]) {
  const [data, setData] = useState(allData);
  const filter = useCallback(
    (handler: (element: T) => boolean) => {
      setData(allData.filter(handler));
    },
    [allData]
  );
  const sort = useCallback((key: string, order: 'ASC' | 'DESC' = 'ASC') => {
    setData((filterData) =>
      filterData.sort((a, b) =>
        (order === 'ASC' ? a[key] > b[key] : a[key] < b[key]) ? 1 : -1
      )
    );
  }, []);
  return {
    data,
    filter,
    sort,
  };
}

export default useDataControl;