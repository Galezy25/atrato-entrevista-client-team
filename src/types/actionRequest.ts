import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

export type ActionRequest<A extends Action = any, S = any> = (
  requestStatusControl: {
    setLoading: (isLoading: boolean) => void;
    setError: (error: any) => void;
  },
  ...args: any[]
) => ThunkAction<Promise<void>,S, any, A>
//) => (dispatch: (action: A) => void) => Promise<void>;
