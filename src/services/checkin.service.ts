import {
  CheckinApiDataType,
  CheckinDataType,
  RequirementDataType,
  RequirementsApiDataType,
  SettingsType,
  VisitorsClaimsDataType,
} from 'common/types/CheckinData.type';
import BaseService from './base.service';

class CheckinServices extends BaseService {
  getVisitorClaims(data: RequirementDataType[]): RequirementsApiDataType[] {
    const items = data.map((item): RequirementsApiDataType => {
      return {
        claim_text: item.claimText,
        claim_text_en: item.claimTextEn,
        claim_text_sw: item.claimTextSw,
        claim_text_da: item.claimTextDa,
        is_blocker: item.isBlocker,
        is_accepted: item.checked,
      };
    });

    return items;
  }

  flatenCheckinData(data: CheckinDataType): CheckinApiDataType {
    let host = 'employee_id';
    let id = data.visitInformation.employee;

    if (data.visitInformation.host !== 'employee') {
      host = 'department_id';
      id = data.visitInformation.department;
    }

    const result = {
      [host]: id,
      phone: data.phoneNumber.countryCode + data.phoneNumber.phoneNumber,
      first_name: data.personalInformation.firstName,
      last_name: data.personalInformation.lastName,
      company: data.personalInformation.companyName,
      visit_purpose: data.visitInformation.visitPurpose,
      visitor_claims: this.getVisitorClaims(data.requirements),
    };

    return result;
  }

  async fetchSettings(): Promise<SettingsType> {
    const res = await this.axios.get('/receptionist/settings');
    const data = res.data.data;
    const items = data.visitor_claims.map(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (item: any): VisitorsClaimsDataType => {
        return {
          claimText: item.claim_text,
          claimTextEn: item.claim_text_en,
          claimTextSw: item.claim_text_sw,
          claimTextDa: item.claim_text_da,
          isBlocker: item.is_blocker,
        };
      }
    );
    return { language: data.language, vistitorClaims: items };
  }

  async checkin(checkinData: CheckinDataType) {
    const data = this.flatenCheckinData(checkinData);
    const res = await this.axios.post('/receptionist/check-in', data);
    return res.data;
  }
}

const checkinServices = new CheckinServices();
export default checkinServices;
