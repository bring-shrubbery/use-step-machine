# useStepMachine

State machine hook for all things that can make steps.

## Project Overview

- Hook based - feel at home, fellow React developer!
- Familiar API to regular state machines with an addition of steps.
- Small: `~500B` minified.

## Usage

```tsx
import { useStepMachine } from 'use-step-machine';

const UrBeautififulPagination = () => {
  const { first, last, next, prev, state, step } = useStepMachine({ total: 100 });


  return <div>
    <First onClick={first} />
    <Prev onClick={prev} />
    <Current>{step}</Current>
    <Next onClick={next} />
    <Last onClick={last} />
  </div>
}
```

## Contributors

- [Antoni Silvestrovic (author)](https://github.com/bring-shrubbery)

## License

[MIT](https://github.com/bring-shrubbery/use-step-machine/blob/main/LICENSE)
