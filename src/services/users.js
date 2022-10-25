import axios from 'axios';

const getUsers = async (body) => {
    return await axios.get(`/api/users`, {
        params: body
    });
};

const deleteUser = async (id) => {
    return await axios.delete(`/api/users/${id}`);
};

const getUser = async (id) => {
    return await axios.get(`/api/users/${id}`);
};

const allRoles = async () => {
    return await axios.get(`/api/users/dropdown/roles`);
};

const postUser = async (data) => {
    return await axios.post(`/api/users`, data);
};

const putUser = async (id, data) => {
    return await axios.put(`/api/users/${id}`, data);
};

const superAdminSelectClient = async (id) => {
    return await axios.put(`/api/users/switch-client/${id}`);
};

const uploadUserImage = async (data) => {
    let formData = new FormData();
    formData.append("img", data.img);
    formData.append("id", data.id);
    return axios.post("/api/users/profile_image/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
    });
};

const deleteUserImage = async (id) => {
    return await axios.delete(`/api/users/${id}/profile_image/delete`);
};

export { getUsers, getUser, deleteUser, allRoles, postUser, putUser, uploadUserImage, deleteUserImage, superAdminSelectClient };
