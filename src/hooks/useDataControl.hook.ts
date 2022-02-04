import { useCallback, useReducer, useRef } from 'react';

export function useDataControl<T extends { [key: string]: any }>(
  _allData: T[]
) {
  const allData = useRef(_allData);
  const [data, dispatch] = useReducer(getToRenderReducer<T>(), allData.current);
  const filter = useCallback((handler: (element: T) => boolean) => {
    dispatch({
      type: 'filter',
      allData: allData.current,
      handler,
    });
  }, []);
  const sort = useCallback(
    (getValue: (element: T) => any, order: 'ASC' | 'DESC' = 'ASC') => {
      dispatch({
        type: 'sort',
        order,
        getValue,
      });
    },
    []
  );
  const setAllData = useCallback((newData: T[]) => {
    allData.current = newData;
    dispatch({
      type: 'set',
      allData: allData.current,
    });
  }, []);
  return {
    data,
    filter,
    sort,
    setAllData,
  };
}
export default useDataControl;

interface FilterAction<T> {
  type: 'filter';
  handler: (element: T) => boolean;
  allData: T[];
}

interface SortAction<T> {
  type: 'sort';
  getValue: (element: T) => any;
  order: 'ASC' | 'DESC';
}

interface SetAction<T> {
  type: 'set';
  allData: T[];
}
function getToRenderReducer<T = { [key: string]: any }>() {
  return (
    state: T[],
    actions: FilterAction<T> | SortAction<T> | SetAction<T>
  ) => {
    switch (actions.type) {
      case 'filter':
        state = actions.allData.filter(actions.handler);
        break;
      case 'sort':
        state = [
          ...state.sort((a, b) =>
            (
              actions.order === 'ASC'
                ? actions.getValue(a) > actions.getValue(b)
                : actions.getValue(a) < actions.getValue(b)
            )
              ? 1
              : -1
          ),
        ];
        break;
      case 'set':
        state = [...actions.allData];
        break;
    }
    return state;
  };
}
