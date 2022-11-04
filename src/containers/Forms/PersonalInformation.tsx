import { useContext } from 'react';
import { t } from 'i18next';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

// Types
import { PersonalInformationDataType } from 'common/types/CheckinData.type';

// Components
import { Input } from 'common/components/Input';
import { CheckinContext } from 'context/CheckinContext';
import { StepLayout } from 'common/components/Layouts';
import Footer from 'common/components/Footer/Footer';

// Schema
const schema = yup.object().shape({
  firstName: yup
    .string()
    .required(`${t('errorsFromYup.required.firstName')}`)
    .max(20, `${t('errorsFromYup.maxCharacters.firstName')}`),
  lastName: yup
    .string()
    .required(`${t('errorsFromYup.required.lastName')}`)
    .max(20, `${t('errorsFromYup.maxCharacters.lastName')}`),
  companyName: yup
    .string()
    .max(20, `${t('errorsFromYup.maxCharacters.company')}`),
});

interface Props {
  submitButtonText: string;
  hasPreviousButton: boolean;
}

const PersonalInformation = ({
  submitButtonText,
  hasPreviousButton,
}: Props) => {
  // Context
  const { setPersonalInformation, incrementStep, decrementStep, data } =
    useContext(CheckinContext);
  const { personalInformation } = data;
  // Form
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<PersonalInformationDataType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: personalInformation,
  });

  const innerSubmit = (data: PersonalInformationDataType) => {
    setPersonalInformation(data);
    incrementStep();
  };

  const previous = () => {
    setPersonalInformation(getValues());
    decrementStep();
  };

  return (
    <form className="relative" onSubmit={handleSubmit(innerSubmit)}>
      <StepLayout>
        <div className="  max-w-md w-full">
          <div>
            <h5 className="text-[#003060]">
              {t('personalInformation.enterPersonalInfo')}
            </h5>
          </div>
          <div className="flex flex-col gap-4">
            <Input
              {...register('firstName')}
              label={t('personalInformation.label.firstname')}
              size="lg"
              errors={errors}
              placeholder={t(
                'personalInformation.placeholder.enterYourFirstname'
              )}
              required
            />
            <Input
              {...register('lastName')}
              label={t('personalInformation.label.lastname')}
              size="lg"
              errors={errors}
              placeholder={t(
                'personalInformation.placeholder.enterYourLastname'
              )}
              required
            />
            <Input
              {...register('companyName')}
              label={t('personalInformation.label.company')}
              size="lg"
              errors={errors}
              placeholder={t(
                'personalInformation.placeholder.enterYourCompany'
              )}
            />
          </div>
        </div>

        <Footer
          hasPreviousButton={hasPreviousButton}
          nextTitle={submitButtonText}
          isValid={isValid}
          previous={previous}
        />
      </StepLayout>
    </form>
  );
};

export default PersonalInformation;
