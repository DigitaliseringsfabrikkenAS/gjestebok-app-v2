import { PhoneNumberDataType } from 'common/types/CheckinData.type';
import BaseService from './base.service';

class CheckoutService extends BaseService {
  async checkout(checkoutData: PhoneNumberDataType) {
    // Destructing data
    const { countryCode, phoneNumber } = checkoutData;
    const phone = countryCode + phoneNumber;

    const res = await this.axios.post('/receptionist/check-out', { phone });
    return res.data;
  }
}

const checkoutService = new CheckoutService();

export default checkoutService;
