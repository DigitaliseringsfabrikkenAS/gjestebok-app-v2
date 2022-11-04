import { useState, useEffect, useContext } from 'react';
import { t } from 'i18next';

// Context
import { CheckinContext } from 'context/CheckinContext';

// Hooks
import { useCheckinData } from 'context/useCheckinData';

// Containers
import {
  Requirements,
  PersonalInformation,
  PhoneNumber,
  VisitInformation,
} from 'containers/Forms';

// Components
import { Steps } from 'common/components/Steps';
import { AbsoluteSpinner } from 'common/components/Spinners';
import { LayoutContext } from 'context/LayoutContext';

const Checkin = () => {
  // Hooks
  const checkinDataProps = useCheckinData();
  const { settings, loadingSettings, fetchSettings } =
    useContext(LayoutContext);
  const { step, setStep } = checkinDataProps;

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

  useEffect(() => {
    fetchSettings();
  }, []);

  const requirementStep = [
    {
      title: t('requirments.title'),
      step: 1,
      content: <Requirements submitButtonText={t('button.next')} />,
    },
  ];

  const steps = [
    {
      title: t('phoneNumber.title'),
      step: settings.vistitorClaims.length ? 2 : 1,
      content: (
        <PhoneNumber
          submitButtonText={t('button.next')}
          hasPreviousButton={true}
        />
      ),
    },
    {
      title: t('personalInformation.title'),
      step: settings.vistitorClaims.length ? 3 : 2,
      content: (
        <PersonalInformation
          submitButtonText={t('button.next')}
          hasPreviousButton={true}
        />
      ),
    },
    {
      title: t('visitInformation.title'),
      step: settings.vistitorClaims.length ? 4 : 3,
      content: (
        <VisitInformation
          submitButtonText={t('button.checkIn')}
          hasPreviousButton={true}
        />
      ),
    },
  ];

  return (
    <CheckinContext.Provider value={checkinDataProps}>
      {loadingSettings ? (
        <AbsoluteSpinner show={loadingSettings} size="lg" />
      ) : (
        <Steps
          fadeIn={fadeIn}
          steps={
            settings.vistitorClaims.length
              ? [...requirementStep, ...steps]
              : steps
          }
          currentStep={step}
          updateStep={(step: number) => setStep(step)}
        />
      )}
    </CheckinContext.Provider>
  );
};

export default Checkin;
