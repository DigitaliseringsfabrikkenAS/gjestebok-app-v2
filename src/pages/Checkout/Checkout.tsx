import { useCheckinData } from 'context/useCheckinData';
import { t } from 'i18next';
import { useEffect, useState } from 'react';
//  Containers
import CheckoutPhoneNumber from './_CheckoutForm';

const Checkout = () => {
  const checkinDataProps = useCheckinData();

  const { step } = checkinDataProps;

  // State
  const [fadeIn, setFadeIn] = useState(false);

  // Effects
  useEffect(() => {
    setFadeIn(true);
    const timerId = setTimeout(() => {
      setFadeIn(false);
    }, 300);
    return () => clearTimeout(timerId);
  }, [step]);
  return (
    <div
      className={`transition-all duration-300 ${
        fadeIn ? 'h-0 w-0 opacity-0' : ' opacity-100 w-full h-auto'
      }`}
    >
      <div className="max-w-[85%] sm:max-w-[90%] w-full mx-auto">
        <CheckoutPhoneNumber submitButtonText={t('button.checkOut')} />
      </div>
    </div>
  );
};

export default Checkout;
