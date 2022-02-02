import { useCallback, useRef, useState } from 'react';

export function useDataControl<T extends { [key: string]: any }>(_allData: T[]) {
  const allData = useRef(_allData);
  const [data, setData] = useState(allData.current);
  const filter = useCallback(
    (handler: (element: T) => boolean) => {
      setData(allData.current.filter(handler));
    },
    []
  );
  const sort = useCallback((getValue :  (element: T)=> any, order: 'ASC' | 'DESC' = 'ASC') => {
    setData((filterData) =>
      filterData.sort((a, b) =>
        (order === 'ASC' ? getValue(a) > getValue(b) : getValue(a) < getValue(b)) ? 1 : -1
      ).map(el => ({...el}))
    );
  }, []);
  const setAllData = useCallback((newData: T[]) => {
    allData.current = newData;
    setData(allData.current);
  },[])
  return {
    data,
    filter,
    sort,
    setAllData
  };
}

export default useDataControl;