import { HostsResponseType } from 'common/types/hosts.type';
import BaseService from './base.service';

class HostServices extends BaseService {
  async getHots(): Promise<HostsResponseType> {
    const res = await this.axios.get('/receptionist/hosts');
    return res.data;
  }

  async getDepartmentHosts(): Promise<HostsResponseType> {
    const res = await this.axios.get('/receptionist/department/hosts');
    return res.data;
  }
}

const hostServices = new HostServices();
export default hostServices;
