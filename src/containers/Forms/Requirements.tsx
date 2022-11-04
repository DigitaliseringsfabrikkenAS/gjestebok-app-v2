import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm, useFieldArray } from 'react-hook-form';

// Context
import { CheckinContext } from 'context/CheckinContext';

// Types
import { RequirementDataType } from 'common/types/CheckinData.type';

// Components
import { StepLayout } from 'common/components/Layouts';
import { Checkbox } from 'common/components/Checkbox';
import { getLanguagePrefix } from 'utils/helpers';
import Footer from 'common/components/Footer/Footer';
import { LayoutContext } from 'context/LayoutContext';

interface Props {
  submitButtonText: string;
}

interface RequirementType {
  requirements: RequirementDataType[];
}

export const Requirements = ({ submitButtonText }: Props) => {
  const { t, i18n } = useTranslation();
  const { settings } = useContext(LayoutContext);
  const languageSelected = getLanguagePrefix(i18n.language, 'claimText');

  // Context
  const { setRequirements, incrementStep, data } = useContext(CheckinContext);

  const { requirements } = data;

  // Form
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RequirementType>({
    mode: 'onChange',
    defaultValues: {
      requirements: requirements.length
        ? requirements
        : settings.vistitorClaims.map(
            (all): RequirementDataType => ({
              ...all,
              checked: false,
            })
          ),
    },
  });

  const { fields } = useFieldArray({
    control, // control props comes from useForm (optional: if you are using FormContext)
    name: 'requirements', // unique name for your Field Array
  });

  // Hanlders
  const handleOnSubmit = (data: RequirementType) => {
    setRequirements(data.requirements);
    incrementStep();
  };

  const getError = () => {
    if (Object.keys(errors).length) {
      return t('errorsFromYup.required.requirements');
    }
    return null;
  };

  return (
    <form className="relative" onSubmit={handleSubmit(handleOnSubmit)}>
      <StepLayout>
        <div className="relative w-full">
          <div className="text-center w-fit absolute -top-3 left-1/2 right-1/2   transform -translate-x-1/2 -translate-y-full whitespace-nowrap">
            <h5 className="text-[#003060] text-center">
              {t('requirments.enterRequirments')}
            </h5>
          </div>
          <div
            className={`max-h-[45vh] w-full flex flex-col flex-wrap gap-3 overflow-x-auto overflow-y-auto ${
              fields.length <= 5 ? 'content-evenly' : 'content-start'
            }`}
          >
            {fields.map((_field, index) => {
              const field = _field as RequirementDataType;
              return (
                <Checkbox
                  label={field[languageSelected]}
                  required={field.isBlocker}
                  placeholder={field.claimText}
                  key={field.claimText} // important to include key with field's id
                  {...register(`requirements.${index}.checked`, {
                    required: field.isBlocker,
                  })}
                />
              );
            })}
          </div>
          <span className="text-red-500 text-center w-fit absolute -bottom-3 left-1/2 right-1/2   transform -translate-x-1/2 translate-y-full whitespace-nowrap">
            {getError()}
          </span>
        </div>
        <Footer isValid={isValid} nextTitle={submitButtonText} />
      </StepLayout>
    </form>
  );
};
