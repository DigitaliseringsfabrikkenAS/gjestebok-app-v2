import { t } from 'i18next';

// Components
import { Button } from '../Button';
import { AbsoluteSpinner } from '../Spinners';

type Props = {
  hasPreviousButton?: boolean;
  nextTitle: string;
  isValid: boolean;
  decrementStep?: () => void;
  previous?: () => void;
  loading?: boolean;
};

const Footer = ({
  hasPreviousButton = false,
  nextTitle,
  isValid,
  decrementStep,
  previous,
  loading,
}: Props) => (
  <div className="flex justify-between w-full absolute bottom-0 left-0 right-0">
    <div className="transform -translate-y-full absolute bottom-0 right-0">
      <AbsoluteSpinner show={loading} size="sm" />
      <Button title={nextTitle} type="submit" disabled={!isValid} size="md" />
    </div>
    {hasPreviousButton && (
      <Button
        className="transform -translate-y-full"
        title={t('button.previous')}
        type="submit"
        size="md"
        disabled={loading}
        onClick={() => {
          decrementStep?.();
          previous?.();
        }}
      />
    )}
  </div>
);

export default Footer;
