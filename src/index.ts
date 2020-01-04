import { useState } from "react";

function deepFreeze(object: any) {
  if (object === undefined || object === null) return object;

  Object.getOwnPropertyNames(object).forEach(prop => {
    const value = object[prop];
    typeof value === "object" && value !== null && deepFreeze(value);
  });

  return Object.freeze(object);
}

export function useDeepFrozenState(
  initialState: any = undefined,
  deepFreezeFn = deepFreeze,
) {
  const [_state, _setState] = useState(initialState);
  return [deepFreezeFn(_state), _setState];
}

export function useFrozenState(initialState: any = undefined) {
  const [_state, _setState] = useState(initialState);
  return [Object.freeze(_state), _setState];
}
