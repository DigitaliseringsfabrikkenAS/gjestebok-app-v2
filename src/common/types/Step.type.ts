import { ReactElement } from 'react';

export type Step = {
  content: ReactElement;
  title: string;
  step: number;
};
export interface CurrentStepProps {
  steps: Step[];
  currentStep: number;
  fadeIn: boolean;
}
