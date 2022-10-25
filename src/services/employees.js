import axios from 'axios';

const getEmployees = async (body) => {
    return await axios.get(`/api/employees`, {
        params: body
    });
};

const getAllEmployees = async () => {
    return await axios.get(`/api/employees`);
};

const deleteEmployee = async (id) => {
    return await axios.delete(`/api/employees/${id}`);
};

const getEmployee = async (id) => {
    return await axios.get(`/api/employees/${id}`);
};

const postEmployee = async (data) => {
    return await axios.post(`/api/employees`, data);
};

const putEmployee = async (id, data) => {
    return await axios.put(`/api/employees/${id}`, data);
};

const getLocationsList = async () => {
    return await axios.get(`/api/employees/list/locations`);
};

const getCompaniesList = async () => {
    return await axios.get(`/api/employees/list/companies`);
};

const uploadEmployeeImage = async (data) => {
    let formData = new FormData();
    formData.append("img", data.img);
    formData.append("id", data.id);
    return axios.post("/api/employees/picture/upload", formData, {
        headers: {
            "Content-Type": "multipart/form-data"
        },
    });
};

const deleteEmployeeImage = async (id) => {
    return await axios.delete(`/api/employees/${id}/picture/delete`);
};

export { getEmployees, deleteEmployee, postEmployee, getAllEmployees, putEmployee, getEmployee, getLocationsList, getCompaniesList, uploadEmployeeImage, deleteEmployeeImage };
