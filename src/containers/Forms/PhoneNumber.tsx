import { useContext } from 'react';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { t } from 'i18next';

// Services
import validationService from 'services/validation.service';

// Types
import { PhoneNumberDataType } from 'common/types/CheckinData.type';

// Context
import { CheckinContext } from 'context/CheckinContext';

// Components
import { Input } from 'common/components/Input';
import { CountryCodeSelect } from 'common/components/Select';
import { StepLayout } from 'common/components/Layouts';
import Footer from 'common/components/Footer/Footer';

// Schema
const schema = yup.object().shape({
  countryCode: yup
    .string()
    .required(`${t('errorsFromYup.required.countryCode')}`),
  phoneNumber: yup
    .string()
    .test(
      'phoneNumberTest',
      'Phone number is not correct',
      async function (value) {
        // eslint-disable-next-line no-invalid-this
        const countryCode = this.parent.countryCode;
        return await validationService.validatePhone(`${countryCode}${value}`);
      }
    ),
});

interface Props {
  submitButtonText: string;
  hasPreviousButton: boolean;
}

const PhoneNumber = ({ hasPreviousButton, submitButtonText }: Props) => {
  // Context
  const {
    data: { phoneNumber },
    setPhoneNumber,
    incrementStep,
    decrementStep,
  } = useContext(CheckinContext);

  // Form
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PhoneNumberDataType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: phoneNumber,
  });

  const innerSubmit = (data: PhoneNumberDataType) => {
    setPhoneNumber(data);
    incrementStep();
  };

  return (
    <form className="relative h-full" onSubmit={handleSubmit(innerSubmit)}>
      <StepLayout>
        <div className="">
          <div>
            <h5 className="text-[#003060]">
              {t('phoneNumber.enterPhoneNumber')}
            </h5>
          </div>
          <div className="flex gap-2">
            <CountryCodeSelect
              defaultValue={phoneNumber.countryCode}
              {...register('countryCode')}
              control={control}
              name="countryCode"
            />
            <Input
              {...register('phoneNumber')}
              label={t('phoneNumber.label.phoneNumber')}
              size="sm"
              errors={errors}
              placeholder={t('phoneNumber.placeholder.enterYourPhoneNumber')}
              required
            />
          </div>
        </div>
        <Footer
          hasPreviousButton={hasPreviousButton}
          nextTitle={submitButtonText}
          isValid={isValid}
          decrementStep={decrementStep}
        />
      </StepLayout>
    </form>
  );
};

export default PhoneNumber;
