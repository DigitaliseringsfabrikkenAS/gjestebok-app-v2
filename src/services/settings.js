import axios from 'axios';

const getGeneralSettings = async (id) => {
    return await axios.get(`/api/clients/${id}/settings`);
};

const putGeneralSettings = async (id, data) => {
    return await axios.put(`/api/clients/${id}/settings`, data);
};

const getLocationSettings = async (id) => {
    return await axios.get(`/api/locations/${id}/settings`);
};

const putLocationSettings = async (id, data) => {
    return await axios.put(`/api/locations/${id}/settings`, data);
};

const getCompanySettings = async (id) => {
    return await axios.get(`/api/companies/${id}/settings`);
};

const putCompanySettings = async (id, data) => {
    return await axios.put(`/api/companies/${id}/settings`, data);
};

const uploadLocationBackgroundImage = async (data) => {
    let formData = new FormData();
    formData.append("img", data.img);
    formData.append("id", data.id);
    return axios.post(`/api/locations/${data.id}/settings/background/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
    });
};

const deleteLocationBackgroundImage = async (id) => {
    return await axios.delete(`/api/locations/${id}/settings/background`);
};

const uploadLocationLogoImage = async (data) => {
    let formData = new FormData();
    formData.append("img", data.img);
    formData.append("id", data.id);
    return axios.post(`/api/locations/${data.id}/settings/logo/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
    });
};

const deleteLocationLogoImage = async (id) => {
    return await axios.delete(`/api/locations/${id}/settings/logo`);
};

export { getGeneralSettings, putGeneralSettings, getLocationSettings, putLocationSettings, getCompanySettings, putCompanySettings, uploadLocationBackgroundImage, deleteLocationBackgroundImage, uploadLocationLogoImage, deleteLocationLogoImage };
