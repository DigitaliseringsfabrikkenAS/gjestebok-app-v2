import { ReactElement } from 'react';

// Types
import { CurrentStepProps } from 'common/types/Step.type';

const CurrentStep: React.FC<CurrentStepProps> = ({
  steps,
  currentStep,
  fadeIn,
}: CurrentStepProps): ReactElement => {
  const step = steps.find((item) => item.step === currentStep)?.content;
  return step ? (
    <div
      className={`transition-all duration-300 ${
        fadeIn ? 'h-0 w-0 opacity-0' : ' opacity-100 w-full h-auto'
      }`}
    >
      {step}
    </div>
  ) : (
    <></>
  );
};

export default CurrentStep;
