import {useState} from 'react'; 

interface StepType {

}

export interface StepMachineOptions<T extends string> {
  initialStep?: number;
  totalSteps?: number;
  steps: Record<T, StepType>;
}

export const useStepMachine = (options: StepMachineOptions) => {
  const [step, setStep] = useState();
}