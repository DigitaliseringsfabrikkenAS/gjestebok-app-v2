import { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { t } from 'i18next';

// Context
import { LayoutContext } from 'context/LayoutContext';

// Components
import { Button } from 'common/components/Button';
import { Header } from 'common/components/Header';
const Home = () => {
  // Context
  const { fetchSettings } = useContext(LayoutContext);

  useEffect(() => {
    fetchSettings(true);
  }, []);

  return (
    <div className="h-[calc(100vh-168px)] mt-[168px] z-50 relative w-full ">
      <div className="flex items-center justify-center h-full gap-10 sm:gap-60 mx-auto w-[90%] sm:w-full">
        <div className="flex flex-col gap-3  items-center">
          <Header
            className="text-[26px]"
            title={t('pages.home.visitFinished')}
          />
          <Link to="/checkout">
            <Button
              className="min-w-[300px]"
              size="lg"
              full
              title={t('button.checkOut')}
            />
          </Link>
        </div>
        <div className="flex flex-col gap-3 items-center">
          <Header
            className="text-[26px]"
            title={t('pages.home.visitSomeone')}
          />
          <Link to="/checkin">
            <Button
              className="min-w-[300px]"
              size="lg"
              title={t('button.checkIn')}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
