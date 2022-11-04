import { Link } from 'react-router-dom';
import { useLocation } from 'react-router';
import { t } from 'i18next';

// Components
import { ReactComponent as CloseIcon } from 'assets/svg/close-icon.svg';
import { Header } from 'common/components/Header';
import FrontpageNav from './_FrontpageNav';

const Navigation = () => {
  const location = useLocation();
  const isNotHome = location.pathname !== '/';

  const isNotLogin = location.pathname !== '/login';

  return (
    <header
      className={`bg-transparent  flex flex-col items-center justify-center w-full transition-all duration-300 ease-in-out ${
        !isNotHome ? 'absolute top-0 h-screen' : 'h-[168px] relative'
      }`}
    >
      <FrontpageNav />

      <div
        className={`flex w-full h-fit transition-all duration-300 flex-col items-center absolute left-0 right-1/2 top-1/2 bottom-1/2 transform ${
          isNotHome ? '-translate-y-1/2' : '-translate-y-[calc(100%+40px)]'
        }`}
      >
        {isNotHome && isNotLogin && (
          <Link
            className="cursor-pointer text-2xl sm:absolute top-1/2 bottom-1/2 transform -translate-y-1/2 left-16 px-4 h-fit self-start"
            to="/"
          >
            <CloseIcon />
          </Link>
        )}

        {!isNotHome && (
          <Header
            className={`transition-all text-[21px] sm:text-[36px] lg:text-[56px] ${
              isNotHome
                ? 'h-0 opacity-0'
                : 'delay-150 opacity-100 h-fit duration-300'
            }`}
            title={t('common.welcome')}
          />
        )}

        {isNotLogin && (
          <Header
            className={`transition-all duration-300 ${
              isNotHome
                ? 'text-[23px] sm:text-[46px] font-normal'
                : 'text-[28px] sm:text-[56px] lg:text-[83px] font-semibold'
            } `}
            title={t('pages.home.digitizationFactory')}
          />
        )}
      </div>
    </header>
  );
};

export default Navigation;
