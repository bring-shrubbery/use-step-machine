import { useMemo, useState } from 'react';

const getLowerLimitHigherThanTotalError = () =>
  new Error(
    'useStepMachine: Lower limit cannot be higher than total step amount'
  );

// TODO: Type steps with a type instead of `number`
type Conditions<StepType extends number, States> = (
  step: StepType,
  state?: keyof States
) => keyof States;

export interface StepMachineOptions<
  States,
  // @ts-ignore
  Actions,
  ActionCallback = () => keyof States,
  AllActions = {
    // TODO: Figure out how to infer Type from action keys
    [A in string]: ActionCallback;
  },
  InferredActions = AllActions,
  InferredStates = {
    [S in keyof States]: InferredActions;
  }
> {
  initial?: number;
  total?: number;
  lowerLimit?: number;
  initialState?: keyof States;
  states?: InferredStates;
  conditions?: Conditions<number, States>;
}

export const useStepMachine = <States, Actions>({
  initial = 0,
  total = Number.POSITIVE_INFINITY,
  // states,
  // initialState,
  lowerLimit = 0,
  conditions,
}: StepMachineOptions<States, Actions>) => {
  if (lowerLimit > total) throw getLowerLimitHigherThanTotalError();

  // State
  const [step, setStep] = useState(initial);
  // @ts-ignore
  const [state, setState] = useState<keyof States>();

  // Next/prev/first/last actions
  const next = () => step < total && setStep(step + 1);
  const prev = () => step > lowerLimit && setStep(step - 1);

  // Process conditions
  useMemo(() => {
    if (!conditions) return;
    const newState = conditions(step, state);
    setState(newState);
  }, [step, state, conditions]);

  return {
    step,
    next,
    prev,
    state,
  };
};

// const { step, next, prev, state } = useStepMachine({
//   states: {
//     hello: {
//       sayBye: () => 'bye',
//       sayHelloAgain: () => 'hello',
//     },
//     anotherState: {
//       doNothing: () => 'hello',
//     },
//   },
// });
