import { useState } from "react";
import { server } from "./server";

interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

export const useMutation = <TData = any, TVariables = any>(query: string) => {
  const [state, setState] = useState<State<TData>>({
    data: null,
    loading: false,
    error: false,
  });
  const fetch = async (variables?: TVariables) => {
    try {
      setState({ data: null, error: false, loading: true });
      const { data, errors } = await server.fetch<TData, TVariables>({
        query,
        variables,
      });
      if (errors && errors.length) {
        throw new Error(errors[0].message);
      }
      setState({ data: data, loading: false, error: false });
    } catch(err) {
      setState({ data: null, loading: false, error: true });
      throw console.error(err)
    }
  };
  return [fetch, state]
};
