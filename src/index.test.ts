import { renderHook, act } from "@testing-library/react-hooks";
import { useFrozenState, useDeepFrozenState } from "./index";

describe("Test use-frozen-state", () => {
  const genarateObject = () => ({
    name: "foo",
    lastName: "bar",
    colors: ["red", "green", "blue"],
    here: {
      is: {
        a: {
          complex: {
            path: "that ends",
          },
        },
        but: [
          {
            diverges: {
              into: undefined,
            },
          },
          null,
          NaN,
        ],
      },
    },
    functionExample: function getSomehing() {
      return "Sure, here's something";
    },
  });

  describe("Test useFrozenState", () => {
    it("Should be initilized by undefiend as default", () => {
      const {
        result: {
          current: [myState],
        },
      } = renderHook(() => useFrozenState());

      expect(myState).toBeUndefined();
    });

    it("should make sure object is frozen only at top level", () => {
      const myObject = genarateObject();
      const {
        result: {
          current: [myState],
        },
      } = renderHook(() => useFrozenState(myObject));

      expect(myState).toBe(myObject);
      expect(myState).toEqual(myObject);
      expect(Object.isFrozen(myState)).toBeTruthy();
      expect(Object.isFrozen(myState.here)).toBeFalsy();
      expect(Object.isFrozen(myState.functionExample)).toBeFalsy();
    });
  });

  it("Should freeze the object after using setter", () => {
    const myObject = genarateObject();
    const { result } = renderHook(() => useFrozenState());
    let [myState, setMyState] = result.current;
    act(() => {
      setMyState(myObject);
    });

    [myState] = result.current;

    expect(myState).toBe(myObject);
    expect(myState).toEqual(myObject);
    expect(Object.isFrozen(myState)).toBeTruthy();
    expect(Object.isFrozen(myState.here)).toBeFalsy();
    expect(Object.isFrozen(myState.functionExample)).toBeFalsy();
  });

  describe("Yest useDeepFrozenState", () => {
    it("Should be initilized by undefiend as default", () => {
      const { result } = renderHook(() => useDeepFrozenState());
      const [myState] = result.current;

      expect(myState).toBeUndefined();
    });

    it("Should freeze the object after using setter", () => {
      const myObject = genarateObject();
      const { result } = renderHook(() => useDeepFrozenState());
      let [myState, setMyState] = result.current;
      act(() => {
        setMyState(myObject);
      });

      [myState] = result.current;

      expect(myState).toBe(myObject);
      expect(myState).toEqual(myObject);
      expect(Object.isFrozen(myState)).toBeTruthy();
      expect(Object.isFrozen(myState.here)).toBeTruthy();
      expect(Object.isFrozen(myState.here.is)).toBeTruthy();
      expect(Object.isFrozen(myState.here.is.a)).toBeTruthy();
      expect(Object.isFrozen(myState.here.is.a.complex)).toBeTruthy();

      // current deepFreeze implementation doesn't freeze functions
      expect(Object.isFrozen(myState.functionExample)).toBeFalsy();
    });

    it("Should accept custom deepFreezeFn", () => {
      const myObject = genarateObject();

      function deepFreezeSecondLevel(object: any) {
        if (object === undefined || object === null) return object;

        Object.getOwnPropertyNames(object).forEach(prop => {
          const value = object[prop];
          typeof value === "object" && value !== null && Object.freeze(value);
        });

        return object;
      }

      const {
        result: {
          current: [myState],
        },
      } = renderHook(() => useDeepFrozenState(myObject, deepFreezeSecondLevel));

      expect(myState).toBe(myObject);
      expect(myState).toEqual(myObject);
      expect(Object.isFrozen(myState)).toBeFalsy();
      expect(Object.isFrozen(myState.here)).toBeTruthy();
      expect(Object.isFrozen(myState.here.is)).toBeFalsy();
      expect(Object.isFrozen(myState.here.is.a)).toBeFalsy();
    });
  });
});
