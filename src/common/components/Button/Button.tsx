import { ReactElement, ReactNode } from 'react';
interface Props {
  className?: string;
  title: string;
  type?: 'submit' | 'button';
  round?: 'none' | 'lg' | 'md';
  size?: 'sm' | 'md' | 'lg';
  background?: 'none' | 'default';
  color?: 'default' | 'none';
  children?: ReactNode | ReactElement | string;
  full?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}
const ROUND_CLASSES = {
  none: '',
  lg: 'rounded-lg',
  md: 'rounded',
};
const COLOR_CLASSES = {
  default: 'text-white',
  none: '',
};

const BACKGROUND_CLASSES = {
  default: 'bg-[#1560BD]',
  none: '',
};
const SIZE_CLASSES = {
  sm: 'py-2 px-4 text-sm',
  md: 'py-4 px-6 text-lg font-medium',
  lg: 'py-3 md:py-6 px-6 md:px-12  tex-[22px] md:text-[32px] font-medium',
};
const Button = ({
  className,
  title,
  type = 'button',
  round = 'lg',
  children = null,
  full = false,
  background = 'default',
  color = 'default',
  size = 'sm',
  ...props
}: Props): ReactElement => {
  return (
    <button
      type={type}
      className={`
        ${full ? 'w-full' : 'w-fit'}
        disabled:opacity-50
        border-0 border-transparent items-center justify-center flex flex-row gap-1 transition-all duration-300
        shadow-lg 
        ${SIZE_CLASSES[size]}
        ${ROUND_CLASSES[round]}
        ${BACKGROUND_CLASSES[background]}
        ${COLOR_CLASSES[color]}
        ${className ? className : ''}
      `}
      {...props}
    >
      {title && <span>{title}</span>}
      {children}
    </button>
  );
};
export default Button;
