import axios from 'axios';

const getClients = async (body) => {
    return await axios.get(`/api/clients`, {
        params: body
    });
};

const getAllClients = async () => {
    return await axios.get(`/api/clients`);
};

const deleteClient = async (id) => {
    return await axios.delete(`/api/clients/${id}`);
};

const getClient = async (id) => {
    return await axios.get(`/api/clients/${id}`);
};

const postClient = async (data) => {
    return await axios.post(`/api/clients`, data);
};

const putClient = async (id, data) => {
    return await axios.put(`/api/clients/${id}`, data);
};

const uploadClientImage = async (data) => {
    let formData = new FormData();
    formData.append("img", data.img);
    formData.append("id", data.id);
    return axios.post("/api/clients/logo/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
    });
};

const deleteClientImage = async (id) => {
    return await axios.delete(`/api/clients/${id}/logo/delete`);
};

export { getClients, deleteClient, postClient, getAllClients, putClient, getClient, deleteClientImage, uploadClientImage };
