"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function deepFreeze(value) {
    Object.getOwnPropertyNames(value).forEach(prop => {
        typeof prop === "object" && deepFreeze(prop);
    });
    return Object.freeze(value);
}
function useDeepFrozenState(initialValue) {
    const [state, setState] = react_1.useState(initialValue);
    return [deepFreeze(state), setState];
}
exports.useDeepFrozenState = useDeepFrozenState;
function useFrozenState(initialValue = undefined) {
    const [state, setState] = react_1.useState(initialValue);
    return [Object.freeze(state), setState];
}
exports.useFrozenState = useFrozenState;
