import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { t } from 'i18next';
import { useQuery } from 'react-query';

// Types
import { VisitInformationDataType } from 'common/types/CheckinData.type';

// Services
import hostServices from 'services/hosts.service';

// Components
import Select, { SelectOptions } from 'common/components/Select/Select';
import { Input } from 'common/components/Input';
import { useContext } from 'react';
import { CheckinContext } from 'context/CheckinContext';
import { StepLayout } from 'common/components/Layouts';
import Footer from 'common/components/Footer/Footer';

// Assuming that are coming from backend
const hostOptions = [
  { label: 'I am visiting an employee', value: 'employee' },
  { label: 'I am visiting a department', value: 'department' },
];

// Schema
const schema = yup.object().shape({
  host: yup.string().required(`${t('errorsFromYup.required.host')}`),
  employee: yup.string().when('host', (host, yup) => {
    if (host === 'employee') {
      return yup.required(`${t('errorsFromYup.required.employee')}`);
    }
  }),
  visitPurpose: yup.string(),
  department: yup.string().when('host', (host, yup) => {
    if (host === 'department') {
      return yup.required(`${t('errorsFromYup.required.department')}`);
    }
  }),
});

interface Props {
  submitButtonText: string;
  hasPreviousButton: boolean;
}

const VisitInformation = ({ submitButtonText, hasPreviousButton }: Props) => {
  // Context
  const {
    setVisitInformation,
    submitCheckinData,
    decrementStep,
    loading,
    data,
  } = useContext(CheckinContext);
  const { visitInformation } = data;

  // Form
  const {
    register,
    control,
    getValues,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<VisitInformationDataType>({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: {
      ...visitInformation,
      ...(!visitInformation.host && { host: hostOptions[0].value }),
    },
  });

  const visitingHost = watch('host');
  const isVisitingEmployee = visitingHost === 'employee';

  // Queries
  const { data: hostsData } = useQuery('host', () => hostServices.getHots());
  const { data: hostsDepartmentData } = useQuery('departments', () =>
    hostServices.getDepartmentHosts()
  );

  // Data variables
  const employeeOptions: SelectOptions[] = hostsData?.data.map(
    ({ text, value }) => ({
      label: text,
      value: value.toString(),
    })
  ) || [{ label: '', value: '' }];

  const departmentOptions: SelectOptions[] = hostsDepartmentData?.data.map(
    ({ text, value }) => ({
      label: text,
      value: value.toString(),
    })
  ) || [{ label: '', value: '' }];

  const next = async (visitData: VisitInformationDataType) => {
    setVisitInformation(visitData);
    await submitCheckinData({ ...data, visitInformation: visitData });
  };

  const previous = () => {
    setVisitInformation(getValues());
    decrementStep();
  };

  return (
    <form className="relative" onSubmit={handleSubmit(next)}>
      <StepLayout>
        <div className="   max-w-md w-full">
          <div>
            <h5 className="text-[#003060]">
              {t('visitInformation.enterVisitInfo')}
            </h5>
          </div>
          <div className="flex flex-col gap-4">
            <Select
              control={control}
              label={t('visitInformation.label.host')}
              required={true}
              defaultValue={hostOptions[0]}
              {...register('host')}
              options={hostOptions}
              name="host"
              placeholder={t('visitInformation.placeholder.enterYourHostName')}
            />
            {isVisitingEmployee ? (
              <>
                <Select
                  control={control}
                  label={t('visitInformation.label.employee')}
                  required={true}
                  {...register('employee')}
                  options={employeeOptions}
                  name="employee"
                  placeholder={t(
                    'visitInformation.placeholder.enterYourHostName'
                  )}
                />
              </>
            ) : (
              <Select
                control={control}
                label={t('visitInformation.label.department')}
                required={true}
                {...register('department')}
                options={departmentOptions}
                name="department"
                placeholder={t(
                  'visitInformation.placeholder.choseDepartmentForYourVisit'
                )}
              />
            )}
            <Input
              {...register('visitPurpose')}
              label="Visit Purpose"
              placeholder="Visiting x employee"
              errors={errors}
              type="text"
            />
          </div>
        </div>
        <Footer
          hasPreviousButton={hasPreviousButton}
          previous={previous}
          isValid={isValid}
          nextTitle={submitButtonText}
          loading={loading}
        />
      </StepLayout>
    </form>
  );
};

export default VisitInformation;
