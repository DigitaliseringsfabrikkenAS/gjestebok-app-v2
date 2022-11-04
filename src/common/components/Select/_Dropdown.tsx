import { ReactNode } from 'react';

const Menu = (props: JSX.IntrinsicElements['div']) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: 4,
        marginTop: 3,
        position: 'absolute',
        zIndex: 2,
        width: '100%',
        padding: 0,
      }}
      {...props}
    />
  );
};

const Blanket = (props: JSX.IntrinsicElements['div']) => (
  <div
    style={{
      bottom: 0,
      left: 0,
      top: 0,
      right: 0,
      position: 'fixed',
      zIndex: 1,
    }}
    {...props}
  />
);

const Dropdown = ({
  children,
  dropdownState,
  seachable = false,
  target,
  onClose,
  className = '',
}: {
  children?: ReactNode;
  dropdownState: boolean;
  seachable?: boolean;
  target: ReactNode | null;
  onClose: () => void;
  className: string;
}) => (
  <div className={['relative', className].join(' ')}>
    {seachable ? (
      <div>
        {target}
        {dropdownState ? <Menu>{children}</Menu> : null}
        {dropdownState ? <Blanket onClick={onClose} /> : null}
      </div>
    ) : (
      <div>{children}</div>
    )}
  </div>
);
export default Dropdown;
