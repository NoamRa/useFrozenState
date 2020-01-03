import { renderHook, act } from "@testing-library/react-hooks";
import { useFrozenState, useDeepFrozenState } from "./index";

describe("Test use-frozen-state", () => {
  const myString = "foo";
  const myObject = {
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
    also: function getSomehing() {
      return "Sure, here's something";
    },
  };

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
      const {
        result: {
          current: [myState],
        },
      } = renderHook(() => useFrozenState(myObject));

      expect(myState).toEqual(myObject);
      expect(Object.isFrozen(myState)).toBeTruthy();
      expect(Object.isFrozen(myState.here)).toBeFalsy();
      expect(Object.isFrozen(myState.also)).toBeFalsy();
    });
  });

  it("Should freeze the object after using setter", () => {
    const { result } = renderHook(() => useFrozenState());
    let [myState, setMyState] = result.current;
    act(() => {
      setMyState(myObject);
    });

    [myState] = result.current;

    expect(myState).toEqual(myObject);
    expect(Object.isFrozen(myState)).toBeTruthy();
    expect(Object.isFrozen(myState.here)).toBeFalsy();
    expect(Object.isFrozen(myState.also)).toBeFalsy();
  });

  describe("Yest useDeepFrozenState", () => {
    it("Should be initilized by undefiend as default", () => {
      const { result } = renderHook(() => useDeepFrozenState());

      const [state] = result.current;

      expect(state).toEqual(undefined);
    });
  });
});
