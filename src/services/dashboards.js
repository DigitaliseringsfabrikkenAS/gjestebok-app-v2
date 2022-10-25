import axios from 'axios';

const getClientAdminDashboard = async () => {
    return await axios.get(`/api/dashboards/clients/admin`);
};

export { getClientAdminDashboard };
