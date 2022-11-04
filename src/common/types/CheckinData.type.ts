export interface VisitInformationDataType {
  host: string;
  employee: string;
  department: string;
  visitPurpose: string;
}
export interface PhoneNumberDataType {
  phoneNumber: string;
  countryCode: string;
  phoneNumberWithCountryCode: string;
}

export interface PersonalInformationDataType {
  firstName: string;
  lastName: string;
  companyName: string;
}

export interface VisitInformationType {
  visitInformation: VisitInformationDataType;
}

export interface PhoneNumberType {
  phoneNumber: PhoneNumberDataType;
}

export interface VisitorsClaimsDataType {
  claimText: string;
  claimTextEn: string;
  claimTextSw: string;
  claimTextDa: string;
  isBlocker: boolean;
}

export interface RequirementDataType extends VisitorsClaimsDataType {
  checked: boolean;
}

export interface PersonalInformationType {
  personalInformation: PersonalInformationDataType;
}

export interface VisitorsClaimsApiDataType {
  claim_text: string;
  claim_text_en: string;
  claim_text_sw: string;
  claim_text_da: string;
  is_blocker: boolean;
}

export interface RequirementsApiDataType {
  claim_text: string;
  claim_text_en: string;
  claim_text_sw: string;
  claim_text_da: string;
  is_blocker: boolean;
  is_accepted: boolean;
}

export interface SettingsType {
  language: string;
  vistitorClaims: VisitorsClaimsDataType[];
}

export interface SettingsApiType {
  language: string;
  visitor_claims: VisitorsClaimsApiDataType[];
}

export interface CheckinDataType {
  phoneNumber: PhoneNumberDataType;
  personalInformation: PersonalInformationDataType;
  visitInformation: VisitInformationDataType;
  requirements: RequirementDataType[];
}

export interface CheckinApiDataType {
  phone: string;
  first_name: string;
  last_name: string;
  company: string;
  employee_id?: number;
  department_id?: number;
  visit_purpose: string;
  visitor_claims: RequirementsApiDataType[];
}
