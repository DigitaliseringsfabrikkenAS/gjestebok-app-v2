/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-unused-vars */

import { createContext } from 'react';

// Types
import {
  CheckinDataType,
  PhoneNumberDataType,
  PersonalInformationDataType,
  VisitInformationDataType,
  RequirementDataType,
} from 'common/types/CheckinData.type';

export const InitialCheckinData: CheckinDataType = {
  phoneNumber: {
    countryCode: '+47',
    phoneNumber: '',
    phoneNumberWithCountryCode: '',
  },
  personalInformation: {
    companyName: '',
    firstName: '',
    lastName: '',
  },
  visitInformation: {
    department: '',
    employee: '',
    host: '',
    visitPurpose: '',
  },
  requirements: [],
};

export interface CheckinContextProps {
  setRequirements: (_data: RequirementDataType[]) => void | null;
  setPhoneNumber: (_data: PhoneNumberDataType) => void | null;
  setPersonalInformation: (_data: PersonalInformationDataType) => void | null;
  setVisitInformation: (_data: VisitInformationDataType) => void | null;
  setStep: (_step: number) => void | null;
  setIsSaving: (_isSaving: boolean) => void | null;
  incrementStep: () => void | null;
  decrementStep: () => void | null;
  submitCheckinData: (_data: CheckinDataType) => Promise<void | null>;
  isSaving: boolean;
  data: CheckinDataType;
  step: number;
  loading: boolean;
}

export const CheckinContext = createContext<CheckinContextProps>({
  setRequirements: (_data: RequirementDataType[]) => null,
  setPhoneNumber: (_data: PhoneNumberDataType) => null,
  setPersonalInformation: (_data: PersonalInformationDataType) => null,
  setVisitInformation: (_data: VisitInformationDataType) => null,
  setStep: (_step: number) => null,
  setIsSaving: (_isSaving: boolean) => null,
  incrementStep: () => null,
  decrementStep: () => null,
  submitCheckinData: async (_data: CheckinDataType) => new Promise(() => null),
  isSaving: false,
  data: InitialCheckinData,
  step: 1,
  loading: false,
});
