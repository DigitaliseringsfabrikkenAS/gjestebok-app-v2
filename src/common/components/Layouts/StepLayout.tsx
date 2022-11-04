import { ReactNode, ReactElement } from 'react';

interface Props {
  children: ReactNode | ReactElement;
}

export const StepLayout = ({ children }: Props) => {
  return (
    <div className="flex relative flex-col justify-center items-center h-[calc(100vh-300px)] w-full pt-8 pb-40">
      {children}
    </div>
  );
};
