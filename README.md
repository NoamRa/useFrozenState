# use-frozen-state

Tiny and dependancy free React hook that makes sure your state is immutable. Call useFrozenState ot useDeepFrozenState instead of useState.

>

[![NPM](https://img.shields.io/npm/v/use-frozen-state.svg)](https://www.npmjs.com/package/use-frozen-state)

## Install

```bash
npm install --save use-frozen-state
```

## Usage

```tsx
import React from "react";

import { useFrozenState } from "use-frozen-state";

const Example = () => {
  const [person, setPerson] = useFrozenState({ name: "Rick", last: "Sanchez" });

  const mortify = () => {
    person.name = "Morty"; // this will not work morty!
    setPerson(person);
  };

  return (
    <div>
      name: {person.name} {person.last}
    </div>
    <button onClick={mortify}>Morty is better!</button>
  );
};
```

## License

MIT © [NoamRa](https://github.com/NoamRa)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
