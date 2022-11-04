import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { t } from 'i18next';

// Components
import { ReactComponent as PartyIcon } from 'assets/svg/party-icon.svg';

const ThankYou = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [fadeIn, setFadeIn] = useState(false);
  const [counter, setCounter] = useState(10);

  const isCheckin = params.action === 'checkin';

  useEffect(() => {
    const fadeIn = setTimeout(() => {
      setFadeIn(true);
    }, 300);
    return () => clearTimeout(fadeIn);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (counter === 1) {
        navigate('/');
        return;
      }
      setCounter(counter - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [counter]);

  return (
    <div
      className={`my-auto  w-full text-center bg-transparent ${
        fadeIn ? 'opacity-100 w-full h-full' : 'w-0 h-0 opacity-0'
      }`}
    >
      <div className="flex flex-col items-center justify-center h-full">
        <div className="w-fit mx-auto">
          <PartyIcon />
        </div>
        <p className="text-[#003060] text-[32px] font-semibold leading-10 pt-[38px]">
          {`${t('pages.thankyou.check')} ${
            isCheckin ? t('common.in') : t('common.out')
          }`}
        </p>
        <p className="text-[#1560BD] text-[20px] font-normal leading-6 pt-2">
          {isCheckin
            ? t('pages.thankyou.hostHasBeenNotified')
            : t('pages.thankyou.goodbye')}
        </p>
        <p className="text-[#97ACCB] text-[23px] font-normal leading-7 pt-[84px]">
          {`${t('pages.thankyou.redirect')} ${counter} ${t(
            'common.secondsWithThreeDots'
          )}`}
        </p>
      </div>
    </div>
  );
};

export default ThankYou;
