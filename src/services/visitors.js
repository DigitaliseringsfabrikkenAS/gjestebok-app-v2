import axios from 'axios';

const getVisitors = async (body) => {
    return await axios.get(`/api/visitors`, {
        params: body
    });
};

const getAllVisitors = async () => {
    return await axios.get(`/api/visitors`);
};

const deleteVisitor = async (id) => {
    return await axios.delete(`/api/visitors/${id}`);
};

const getVisitor = async (id) => {
    return await axios.get(`/api/visitors/${id}`);
};

const postVisitor = async (data) => {
    return await axios.post(`/api/visitors`, data);
};

const putVisitor = async (id, data) => {
    return await axios.put(`/api/visitors/${id}`, data);
};

const getEmployeesList = async () => {
    return await axios.get(`/api/visitors/list/hosts`);
};

export { getVisitors, deleteVisitor, postVisitor, getAllVisitors, putVisitor, getVisitor, getEmployeesList };
