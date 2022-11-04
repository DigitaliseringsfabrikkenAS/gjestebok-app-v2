import { ReactElement, ReactNode } from 'react';
import { Helmet as BaseHelmet } from 'react-helmet';

interface HelmetProps {
  component: ReactNode | ReactElement;
  title: string;
  customHeaders?: ReactElement | ReactElement[];
}

const Helmet = ({ component, title, customHeaders }: HelmetProps) => {
  return (
    <>
      <BaseHelmet>
        <title>{title} | gjestebok</title>
        {customHeaders ? customHeaders : null}
      </BaseHelmet>
      {component}
    </>
  );
};

export default Helmet;
