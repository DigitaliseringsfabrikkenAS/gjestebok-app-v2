import axios from 'axios';

const getInvites = async (body) => {
    return await axios.get(`/api/invites`, {
        params: body
    });
};

const getAllInvites = async () => {
    return await axios.get(`/api/invites`);
};

const deleteInvite = async (id) => {
    return await axios.delete(`/api/invites/${id}`);
};

const getInvite = async (id) => {
    return await axios.get(`/api/invites/${id}`);
};

const postInvite = async (data) => {
    return await axios.post(`/api/invites`, data);
};

const putInvite = async (id, data) => {
    return await axios.put(`/api/invites/${id}`, data);
};

const getLocationsList = async () => {
    return await axios.get(`/api/invites/list/locations`);
};

const getCompaniesList = async () => {
    return await axios.get(`/api/invites/list/companies`);
};

const getEmployeesList = async () => {
    return await axios.get(`/api/invites/list/hosts`);
};

export { getInvites, deleteInvite, postInvite, getAllInvites, putInvite, getInvite, getLocationsList, getCompaniesList, getEmployeesList };
