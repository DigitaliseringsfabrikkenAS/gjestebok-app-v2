import { ReactElement } from 'react';

// Interfaces
export interface HeaderProps {
  title: string;
  isWhite?: boolean;
  className?: string;
  fontWeight?: 'thin' | 'light' | 'normal' | 'medium' | 'bold';
  textSize?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl';
}

const Header = ({
  fontWeight = 'normal',
  textSize = 'base',
  className = '',
  title,
  isWhite = false,
}: HeaderProps): ReactElement => {
  return (
    <h3
      className={`
        !text-${textSize}
        font-${fontWeight}
        ${isWhite ? 'text-white' : 'text-primary'}
        ${className}
      `}
    >
      {title}
    </h3>
  );
};

export default Header;
