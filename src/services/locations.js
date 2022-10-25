import axios from 'axios';

const getLocations = async (body) => {
    return await axios.get(`/api/locations`, {
        params: body
    });
};

const getAllLocations = async () => {
    return await axios.get(`/api/locations`);
};

const deleteLocation = async (id) => {
    return await axios.delete(`/api/locations/${id}`);
};

const getLocation = async (id) => {
    return await axios.get(`/api/locations/${id}`);
};

const postLocation = async (data) => {
    return await axios.post(`/api/locations`, data);
};

const putLocation = async (id, data) => {
    return await axios.put(`/api/locations/${id}`, data);
};

const getCompaniesList = async () => {
    return await axios.get(`/api/locations/list/companies`);
};

export { getLocations, deleteLocation, postLocation, getAllLocations, putLocation, getLocation, getCompaniesList };
