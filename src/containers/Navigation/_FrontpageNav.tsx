import { useLocation } from 'react-router';
import { ReactNode, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { i18n } from 'i18next';

// Flags
import '../../../node_modules/flag-icons/css/flag-icons.min.css';

// Components
import { ReactComponent as LogoIcon } from 'assets/svg/logo-icon.svg';

interface LanguagesType {
  title: string;
  label: string;
  value: string;
  flag: ReactNode;
}
const languages: LanguagesType[] = [
  {
    title: 'English',
    label: 'ENG',
    value: 'en',
    flag: <span className="fi fi-gb  text-2xl"></span>,
  },
  {
    title: 'Norwegian',
    label: 'NO',
    value: 'no',
    flag: <span className="fi fi-no  text-2xl"></span>,
  },
  {
    title: 'Sweden',
    label: 'SW',
    value: 'sw',
    flag: <span className="fi fi-se  text-2xl"></span>,
  },
  {
    title: 'Denmark',
    label: 'DA',
    value: 'da',
    flag: <span className="fi fi-dk  text-2xl"></span>,
  },
];

const LanguageComponent = ({ i18n }: { i18n: i18n }) => {
  let currentLanguage = languages.find(
    (language) => language.value === i18n.language
  );

  if (!currentLanguage) {
    currentLanguage = languages[0];
  }

  return (
    <div className={'flex flex-row items-center gap-1 '}>
      <span>{currentLanguage.flag}</span>
      <span>{currentLanguage.label}</span>
    </div>
  );
};

const FrontpageNav = () => {
  const { i18n } = useTranslation();
  const location = useLocation();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const isHomeOrLogin =
    location.pathname === '/' || location.pathname === '/login';

  if (!isHomeOrLogin) {
    return null;
  }

  const handleChangeLanguage = (language: LanguagesType) => {
    i18n.changeLanguage(language.value);
    setShowLanguageDropdown(false);
  };
  const filterCurrentLanguage = languages.filter(
    (item) => item.value !== i18n.language
  );

  return (
    <nav
      className={`w-full flex justify-center items-center p-3 sm:p-16 relative ${
        isHomeOrLogin && '!top-0 !absolute'
      }`}
    >
      <div className="flex justify-between w-full">
        <Link to="/" className="cursor-pointer">
          <LogoIcon />
        </Link>
        <div className="flex flex-col gap-1 items-end">
          <button
            onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
            onBlur={() => setShowLanguageDropdown(false)}
            className="flex flex-row "
          >
            <LanguageComponent i18n={i18n} />
          </button>

          {filterCurrentLanguage && (
            <ul
              className={`${
                showLanguageDropdown ? 'flex flex-col' : 'hidden'
              } mt-2 bg-white py-2 divide-y rounded z-[100]`}
              onBlur={() => setShowLanguageDropdown(false)}
            >
              {filterCurrentLanguage.map((language: LanguagesType) => {
                return (
                  <li key={language.value} className="px-4  hover:bg-[#EBF4FE]">
                    <button
                      className="flex flex-row items-center gap-1 p-1"
                      onMouseDown={() => handleChangeLanguage(language)}
                    >
                      <span>{language.flag}</span>
                      <span>{language.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default FrontpageNav;
