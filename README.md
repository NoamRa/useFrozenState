# use-frozen-state

> 

[![NPM](https://img.shields.io/npm/v/use-frozen-state.svg)](https://www.npmjs.com/package/use-frozen-state) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-frozen-state
```

## Usage

```tsx
import * as React from 'react'

import { useMyHook } from 'use-frozen-state'

const Example = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
```

## License

MIT © [NoamRa](https://github.com/NoamRa)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
