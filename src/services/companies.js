import axios from 'axios';

const getCompanies = async (body) => {
    return await axios.get(`/api/companies`, {
        params: body
    });
};

const getAllCompanies = async () => {
    return await axios.get(`/api/companies`);
};

const deleteCompany = async (id) => {
    return await axios.delete(`/api/companies/${id}`);
};

const getCompany = async (id) => {
    return await axios.get(`/api/companies/${id}`);
};

const postCompany = async (data) => {
    return await axios.post(`/api/companies`, data);
};

const putCompany = async (id, data) => {
    return await axios.put(`/api/companies/${id}`, data);
};

const getLocationsList = async () => {
    return await axios.get(`/api/companies/list/locations`);
};

const uploadCompanyImage = async (data) => {
    let formData = new FormData();
    formData.append("img", data.img);
    formData.append("id", data.id);
    return axios.post("/api/companies/logo/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
    });
};

const deleteCompanyImage = async (id) => {
    return await axios.delete(`/api/companies/${id}/logo/delete`);
};

export { getCompanies, deleteCompany, postCompany, getAllCompanies, putCompany, getCompany, getLocationsList, uploadCompanyImage, deleteCompanyImage };
