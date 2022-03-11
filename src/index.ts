import { useState } from 'react';

const getLowerLimitHigherThanTotalError = () =>
  new Error(
    'useStepMachine: Lower limit cannot be higher than total step amount'
  );

type StateAction<S extends string> = <G extends S | string>() => G | undefined;

type StepType<S extends string, A extends string> = Record<A, StateAction<S>>;

export interface StepMachineOptions<S extends string, A extends string> {
  initial?: number;
  total?: number;
  lowerLimit?: number;
  states?: Record<S, StepType<S, A>>;
  initialState?: S;
}

export const useStepMachine = <S extends string, A extends string>({
  initial = 0,
  total = Number.POSITIVE_INFINITY,
  // states,
  // initialState,
  lowerLimit = 0,
}: StepMachineOptions<S, A>) => {
  if (lowerLimit > total) throw getLowerLimitHigherThanTotalError();
  const [step, setStep] = useState(initial);
  const [state, setState] = useState<S>();

  const next = () => step < total && setStep(step + 1);
  const prev = () => step > lowerLimit && setStep(step - 1);

  return {
    step,
    next,
    prev,
    state,
  };
};

const { step, next, prev, state } = useStepMachine({
  states: {
    hello: {
      sayBye: () => 'bye',
      sayHelloAgain: () => 'hello',
    },
    anotherState: {
      doNothing: () => 'hello',
    },
  },
});
