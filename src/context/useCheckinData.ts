import { useState } from 'react';

// Context
import { InitialCheckinData, CheckinContextProps } from './CheckinContext';

// Types
import {
  CheckinDataType,
  PersonalInformationDataType,
  PhoneNumberDataType,
  RequirementDataType,
  VisitInformationDataType,
} from 'common/types/CheckinData.type';
import checkinServices from 'services/checkin.service';
import { ApiError } from 'utils/api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

export const useCheckinData = (): CheckinContextProps => {
  const navigate = useNavigate();
  const [data, setData] = useState<CheckinDataType>(InitialCheckinData);
  const [step, setStep] = useState(1);
  const [isSaving, _setIsSaving] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handlers
  const setIsSaving = (state: boolean) => _setIsSaving(state);
  const incrementStep = () => setStep(step + 1);
  const decrementStep = () => {
    step > 1 && setStep(step - 1);
  };

  const setRequirements = (requirements: RequirementDataType[]) =>
    setData({ ...data, requirements });
  const setPhoneNumber = (phoneNumber: PhoneNumberDataType) =>
    setData({ ...data, phoneNumber });
  const setPersonalInformation = (
    personalInformation: PersonalInformationDataType
  ) => setData({ ...data, personalInformation });
  const setVisitInformation = (visitInformation: VisitInformationDataType) =>
    setData({ ...data, visitInformation });

  const submitCheckinData = async (data: CheckinDataType): Promise<void> => {
    setLoading(true);
    try {
      await checkinServices.checkin(data);
      navigate('/thank-you/checkin');
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.message);
    }
    setLoading(false);
  };

  return {
    data,
    isSaving,
    step,
    setStep,
    setIsSaving,
    incrementStep,
    decrementStep,
    setRequirements,
    setPhoneNumber,
    setPersonalInformation,
    setVisitInformation,
    submitCheckinData,
    loading,
  };
};
