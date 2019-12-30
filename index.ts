import { useState } from "react";

function deepFreeze(value: any) {
  Object.getOwnPropertyNames(value).forEach(prop => {
    typeof prop === "object" && deepFreeze(prop);
  });
  return Object.freeze(value);
}

export function useDeepFrozenState(initialValue: any) {
  const [_state, _setState] = useState(initialValue);
  return [deepFreeze(_state), _setState];
}

export function useFrozenState(initialValue: any = undefined) {
  const [_state, _setState] = useState(initialValue);
  return [Object.freeze(_state), _setState];
}
