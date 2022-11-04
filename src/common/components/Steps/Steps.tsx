import React from 'react';

// Types
import { Step } from 'common/types/Step.type';

// Partials
import CurrentStep from './_CurrentStep';

// Components
import { ReactComponent as DoneIcon } from 'assets/svg/done-icon.svg';

interface Props {
  currentStep: number;
  updateStep: (n: number) => void;
  steps: Step[];
  clickableStep?: boolean;
  fadeIn: boolean;
}

const Steps = ({
  currentStep,
  updateStep,
  steps,
  clickableStep = false,
  fadeIn,
}: Props) => {
  const handleStepUpdate = (step: number) => {
    if (clickableStep) {
      updateStep(step);
    }
  };

  return (
    <div className="max-w-[85%] sm:max-w-[90%] w-full mx-auto">
      <div className="flex flex-nowrap justify-between w-[90%] mx-auto items-center relative">
        {steps.map(({ title, step }, key) => {
          const notFirstItem = step !== 1;
          const isGreaterOrEqualCurrentStep = currentStep >= step;
          const isGreaterThenCurrentStep = currentStep > step;

          return (
            <React.Fragment key={`${key}_${currentStep}`}>
              <div
                className={`${
                  notFirstItem ? 'flex-1' : ''
                } relative  h-[120px]`}
              >
                <div
                  key={`${key}_+_${step}`}
                  className={'relative flex justify-center items-center'}
                >
                  {notFirstItem && (
                    <div className="h-0.5 bg-[#97ACCB] w-full">
                      <div
                        className={`h-0.5  transition-all duration-300 ${
                          isGreaterOrEqualCurrentStep ? 'bg-[#1560BD]' : ''
                        }`}
                      />
                    </div>
                  )}

                  <span
                    className={` z-10 cursor-pointer transition-all duration-300 flex border-2 items-center justify-center  text-xl h-[36px] aspect-square w-[36px] rounded-full ${
                      isGreaterOrEqualCurrentStep
                        ? 'bg-[#1560BD] text-white border-[#1560BD]'
                        : 'text-[#97ACCB]'
                    }
                      ${isGreaterThenCurrentStep ? '-indent-[9999px]' : ''}
                    `}
                    onClick={() => handleStepUpdate(step)}
                  >
                    {step}
                    {isGreaterThenCurrentStep ? <DoneIcon /> : ''}
                  </span>

                  <span
                    className={`absolute transform text-base sm:text-2xl text-center sm:whitespace-nowrap flex flex-nowrap  ${
                      isGreaterOrEqualCurrentStep
                        ? 'text-[#003060]'
                        : 'text-[#97ACCB]'
                    } 
                    ${
                      notFirstItem
                        ? '-bottom-1 right-5 translate-y-full translate-x-1/2'
                        : '-bottom-1 left-5  translate-y-full -translate-x-1/2 '
                    }
                  `}
                  >
                    {title}
                  </span>
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      <CurrentStep fadeIn={fadeIn} currentStep={currentStep} steps={steps} />
    </div>
  );
};

export default Steps;
