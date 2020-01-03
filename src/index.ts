import { useState } from "react";

function deepFreeze(object: any) {
  if (object === undefined || object === null) return object;

  Object.getOwnPropertyNames(object).forEach(prop => {
    const value = object[prop];
    typeof value === "object" && deepFreeze(value);
  });

  return Object.freeze(object);
}

export function useDeepFrozenState(
  initialValue: any = undefined,
  deepFreezeFn = deepFreeze,
) {
  const [_state, _setState] = useState(initialValue);
  return [deepFreezeFn(_state), _setState];
}

export function useFrozenState(initialValue: any = undefined) {
  const [_state, _setState] = useState(initialValue);
  return [Object.freeze(_state), _setState];
}
