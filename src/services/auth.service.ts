/* eslint-disable no-undef */
import BaseService from './base.service';
import { UserAuthResponseType } from 'common/types/user.type';

class AuthServices extends BaseService {
  async login(code: string): Promise<UserAuthResponseType> {
    const res = await this.axios.post(`/receptionist/login/${code}`, { code });
    return res.data;
  }
}
const authServices = new AuthServices();

export default authServices;
