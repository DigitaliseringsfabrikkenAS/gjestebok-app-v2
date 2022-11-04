import { ReactElement } from 'react';

interface Props {
  show?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const AbsoluteSpinner = ({
  show = false,
  size = 'md',
}: Props): ReactElement => {
  const spinnerSize =
    size === 'sm' ? 'w-10 h-10' : size === 'md' ? 'w-14 h-14' : 'w-16 h-16';
  if (!show) return <></>;
  return (
    <div className="pointer-events-auto z-50 top-0 left-0 right-0 bottom-0 absolute flex align-middle items-center justify-center">
      <div className="top-0 left-0 right-0 bottom-0 absolute bg-gray-200 opacity-70" />
      <div className="flex justify-center items-center">
        <div className="flex items-center justify-center space-x-2 animate-pulse">
          <div
            style={{ borderTopColor: 'transparent' }}
            className={`${spinnerSize} border-4 border-blue-400 h- border-dashed rounded-full animate-spin`}
          ></div>
        </div>
      </div>
    </div>
  );
};
