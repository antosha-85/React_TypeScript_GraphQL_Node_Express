import {
  // useState,
  useEffect,
  useCallback,
  useReducer
} from "react";
import { server } from "./server";
interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

type Action<TData> = | {type: 'FETCH'} | {type: 'FETCH_SUCCESS', payload: TData} | {type: 'FETCH_ERROR'}
interface QueryResult<TData> extends State<TData> {
  refetch: () => void;
}

const reducer =<TData>() => (state: State<TData>, action:Action<TData>):State<TData> => {
  switch (action.type) {
    case 'FETCH':
      return {
        ...state,
        loading: true
      }
      case 'FETCH_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false

      }
      case 'FETCH_ERROR':
      return {
        ...state,
        error: true,
        loading: false
      }
      default:
      throw new Error()
  }
};
export const useQuery = <TData = any>(query: string): QueryResult<TData> => {
  const fetchReducer = reducer<TData>();
  const [state, dispatch] = useReducer(fetchReducer,{
    data: null,
    loading: false,
    error: false,
  })
  // const [state, setState] = useState<State<TData>>({
  //   data: null,
  //   loading: false,
  //   error: false,
  // });
  const fetch = useCallback(() => {
    const fetchApi = async () => {
      try {
        dispatch({type: 'FETCH'})
        // setState({ data: null, loading: true, error: false });
        const { data, errors } = await server.fetch<TData>({ query });
        if (errors && errors.length) {
          throw new Error(errors[0].message);
        }
        dispatch({type: 'FETCH_SUCCESS', payload: data })
        // setState({ data, loading: false, error: false });
      } catch (err) {
        dispatch({type: 'FETCH_ERROR'})
        // setState({ data: null, loading: false, error: true });
        throw console.error(err);
      }
    };
    fetchApi();
  }, [query]);

  useEffect(() => {
    fetch();
  }, [fetch]);
  return { ...state, refetch: fetch };
};
