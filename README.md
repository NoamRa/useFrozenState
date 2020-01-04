# use-frozen-state

Tiny and dependancy free React hook that makes sure your state is immutable. Call useFrozenState ot useDeepFrozenState instead of useState.

>

[![NPM](https://img.shields.io/npm/v/use-frozen-state.svg)](https://www.npmjs.com/package/use-frozen-state)

## Install

```bash
npm install --save use-frozen-state
```

## Usage

Pick from `useFrozenState` and `useDeepFrozenState`.

- `useFrozenState` will shallow freeze the state. ([example](#useFrozenState-example))
- `useDeepFrozenState` will traverse through the state object and freeze it all. ([example](#useDeepFrozenState-example))
- Need selective deep freezing? Supply `useDeepFrozenState` a second parameter: `deepFreezeFn`. ([example](#deepFreezeFn-example))

#### `useFrozenState` example

```tsx
import React from "react";
import { useFrozenState } from "use-frozen-state";

const Example = () => {
  const [person, setPerson] = useFrozenState({ name: "Rick", last: "Sanchez" });

  const mortify = () => {
    person.name = "Morty"; // That's not how you do it Morty! Geez!
    setPerson(person);
  };

  return (
    <>
      <div>
        name: {person.name} {person.last}
      </div>
      <button onClick={mortify}>Morty is better!</button>
    </>
  );
};
```

#### `useDeepFrozenState` example

```tsx
import React from "react";
import { useDeepFrozenState } from "use-frozen-state";

const theSmiths = [
  { name: "Summer", last: "Smith" },
  { name: "Beth", last: "Smith" },
  { name: "Jerry", last: "Smith" },
  { name: "Morty", last: "Smith" },
];

const Example = () => {
  const [family, setFamily] = useDeepFrozenState(theSmiths);

  const rickTakesControl = () => {
    // You'll kill us all Rick!
    family.forEach(member => {
      member.last = "Sanchez";
    });
  };

  return (
    <>
      ...
      <button onClick={rickTakesControl}>wubalubadubdub</button>
    </>
  );
};
```

#### `deepFreezeFn` example

```tsx
import React from "react";
import { useDeepFrozenState } from "use-frozen-state";

const theSmiths = [
  { name: "Summer", last: "Smith" },
  { name: "Beth", last: "Smith" },
  { name: "Jerry", last: "Smith" },
  { name: "Morty", last: "Smith" },
];

function deepFreezeFromSecondLevel(object) {
  if (object === undefined || object === null) return object;

  Object.getOwnPropertyNames(object).forEach(prop => {
    const value = object[prop];
    typeof value === "object" && deepFreeze(value);
  });

  return object;
}

const Example = () => {
  const [family, setFamily] = useDeepFrozenState(
    theSmiths,
    deepFreezeFromSecondLevel,
  );

  const rickTakesControl = () => {
    // this will work
    const jerryIndex = family.findIndex(member => member.name === "Jerry");
    theSmiths.splice(jerryIndex, 1, { name: "Rick", last: "Sanchez" });

    // this won't
    const beth = family.findIndex(member => member.name === "Beth");
    beth.last = "Sanchez";
  };

  return (
    <>
      ...
      <button onClick={rickTakesControl}>wubalubadubdub</button>
    </>
  );
};
```

## License

MIT © [NoamRa](https://github.com/NoamRa)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
