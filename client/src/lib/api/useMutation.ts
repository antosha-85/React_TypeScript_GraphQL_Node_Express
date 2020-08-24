import {
  // useState,
  useReducer,
} from "react";
import { server } from "./server";

interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}
type Action<TData> =
  | { type: "FETCH" }
  | { type: "FETCH_SUCCESS"; payload: TData }
  | { type: "FETCH_ERROR" };
type MutationTuple<TData, TVariables> = [
  (variables?: TVariables | undefined) => Promise<void>,
  State<TData>
];
const reducer = <TData>() => (
  state: State<TData>,
  action: Action<TData>
): State<TData> => {
  switch (action.type) {
    case "FETCH":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      };
    case "FETCH_ERROR":
      return {
        ...state,
        error: true,
        loading: false,
      };
    default:
      throw new Error();
  }
};
export const useMutation = <TData = any, TVariables = any>(
  query: string
): MutationTuple<TData, TVariables> => {
  const fetchReducer = reducer<TData>();
  const [state, dispatch] = useReducer(fetchReducer, {
    data: null,
    loading: false,
    error: false,
  });
  //   const [state, setState] = useState<State<TData>>({
  //     data: null,
  //     loading: false,
  //     error: false,
  //   });
  const fetch = async (variables?: TVariables) => {
    try {
      //   setState({ data: null, error: false, loading: true });
      dispatch({ type: "FETCH" });
      const { data, errors } = await server.fetch<TData, TVariables>({
        query,
        variables,
      });
      if (errors && errors.length) {
        throw new Error(errors[0].message);
      }
      //   setState({ data: data, loading: false, error: false });
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err) {
      //   setState({ data: null, loading: false, error: true });
      dispatch({ type: "FETCH_ERROR" });
      throw console.error(err);
    }
  };
  return [fetch, state];
};
