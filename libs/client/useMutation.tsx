import { useState } from "react";

interface UseMutationState {
  loading: boolean;
  data?: undefined | any;
  error?: undefined | any;
}
type UserMutationResult = [(data: any) => void, UseMutationState];

export default function useMutation(url: string): UserMutationResult {
  const [state, setState] = useState<UseMutationState>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  const { loading, data, error } = state;
  function mutation(data: any) {
    setState({ ...state, loading: true });
    fetch(url, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json().catch(() => {}))
      .then((data) => setState({ ...state, data }))
      .catch((error) => setState({ ...state, error }))
      .finally(() => setState({ ...state, loading: false }));
  }
  return [mutation, state];
}
