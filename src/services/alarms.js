import axios from 'axios';

const getAlarms = async (body) => {
    return await axios.get(`/api/alerts`, {
        params: body
    });
};

const getAllAlarms = async () => {
    return await axios.get(`/api/alerts`);
};

const deleteAlarm = async (id) => {
    return await axios.delete(`/api/alerts/${id}`);
};

const getAlarm = async (id) => {
    return await axios.get(`/api/alerts/${id}`);
};

const postAlarm = async (data) => {
    return await axios.post(`/api/alerts`, data);
};

const putAlarm = async (id, data) => {
    return await axios.put(`/api/alerts/${id}`, data);
};

const getLocationsList = async () => {
    return await axios.get(`/api/alerts/list/locations`);
};

const getCompaniesList = async (id) => {
    return await axios.get(`/api/alerts/list/location/${id}/companies`);
};

export { getAlarms, deleteAlarm, postAlarm, getAllAlarms, putAlarm, getAlarm, getLocationsList, getCompaniesList };
