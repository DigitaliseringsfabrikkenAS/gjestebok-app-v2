import BaseService from './base.service';

class ValidationService extends BaseService {
  async validatePhone(phone: string): Promise<boolean> {
    try {
      await this.axios.post('/receptionist/validate/phone', {
        phone,
      });
      return true;
    } catch {
      return false;
    }
  }
}

const validationService = new ValidationService();
export default validationService;
