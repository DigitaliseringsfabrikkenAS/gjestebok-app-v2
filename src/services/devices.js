import axios from 'axios';

const getDevices = async (body) => {
    return await axios.get(`/api/devices`, {
        params: body
    });
};

const getAllDevices = async () => {
    return await axios.get(`/api/devices`);
};

const deleteDevice = async (id) => {
    return await axios.delete(`/api/devices/${id}`);
};

const getDevice = async (id) => {
    return await axios.get(`/api/devices/${id}`);
};

const postDevice = async (data) => {
    return await axios.post(`/api/devices`, data);
};

const putDevice = async (id, data) => {
    return await axios.put(`/api/devices/${id}`, data);
};

const getLocationsList = async () => {
    return await axios.get(`/api/devices/list/locations`);
};

const getEntrancesList = async () => {
    return await axios.get(`/api/devices/list/entrances`);
};

export { getDevices, deleteDevice, postDevice, getAllDevices, putDevice, getDevice, getLocationsList, getEntrancesList };
