import { useContext } from 'react';
import { useNavigate } from 'react-router';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { t } from 'i18next';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

// Types
import { PhoneNumberDataType } from 'common/types/CheckinData.type';

// Services
import checkoutService from 'services/checkout.service';
import validationService from 'services/validation.service';

// Context
import { CheckinContext } from 'context/CheckinContext';

// Utils
import { ApiError } from 'utils/api';

// Components
import { Input } from 'common/components/Input';
import { CountryCodeSelect } from 'common/components/Select';
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
}

const CheckoutForm = ({ submitButtonText }: Props) => {
  // Context
  const {
    data: { phoneNumber },
  } = useContext(CheckinContext);

  const navigate = useNavigate();

  // Form
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<PhoneNumberDataType>({
    delayError: 3000,
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: phoneNumber,
  });

  // Queries
  const { mutate: checkOut, isLoading: loading } = useMutation(
    'checkout',
    (PhoneNumberData: PhoneNumberDataType) =>
      checkoutService.checkout(PhoneNumberData),
    {
      onSuccess: () => {
        navigate('/thank-you/checkout');
      },
      onError: (error) => {
        const err = error as ApiError;
        toast.error(`${err?.message}`);
      },
    }
  );

  const handleOnSubmit = (data: PhoneNumberDataType) => {
    checkOut(data);
  };

  return (
    <form className="relative" onSubmit={handleSubmit(handleOnSubmit)}>
      <div className="flex flex-col justify-center items-center h-[calc(100vh-150px)] overflow-hidden w-full gap-2">
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
          isValid={isValid}
          nextTitle={submitButtonText}
          loading={loading}
        />
      </div>
    </form>
  );
};

export default CheckoutForm;
