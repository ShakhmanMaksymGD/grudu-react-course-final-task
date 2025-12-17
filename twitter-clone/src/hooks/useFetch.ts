import { useState, useCallback } from 'react';

export type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

export type UseFetchReturn<T, TArgs extends readonly unknown[] = []> = {
  data: T | null;
  loading: boolean;
  error: string | null;
  execute: (...args: TArgs) => Promise<T>;
  reset: () => void;
};

export function useFetch<T, TArgs extends readonly unknown[] = []>(
  asyncFunction: (...args: TArgs) => Promise<T>
): UseFetchReturn<T, TArgs> {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (...args: TArgs): Promise<T> => {
      setState(prev => ({
        ...prev,
        loading: true,
        error: null,
      }));

      try {
        const result = await asyncFunction(...args);

        setState({
          data: result,
          loading: false,
          error: null,
        });

        return result;
      } catch (error) {
        const errorMessage = "Something went wrong";

        setState({
          data: null,
          loading: false,
          error: errorMessage,
        });

        throw error;
      }
    },
    [asyncFunction]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    execute,
    reset,
  };
}