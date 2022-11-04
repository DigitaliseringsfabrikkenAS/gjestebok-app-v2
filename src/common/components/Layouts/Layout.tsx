import { ReactElement, ReactNode } from 'react';

import { Navigation } from 'containers/Navigation';

interface Props {
  children: ReactNode | ReactElement;
}

const Layout = ({ children }: Props): ReactElement => {
  return (
    <div className="bg-[#F5F7FA] h-screen  relative w-full">
      <div className="bg-gradient-to-b z-10 from-[#F5F7FA] to-[#7fc9f340] absolute bottom-0 h-[50vh] w-full" />
      <div className="flex flex-col w-full h-full z-50 bg-transparent relative">
        <Navigation />
        {children}
      </div>
    </div>
  );
};

export default Layout;
