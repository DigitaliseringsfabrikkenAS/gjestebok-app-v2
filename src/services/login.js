import axios from 'axios';

const postLogin = async (payload) => {
  return await axios.post(
    `/login`,
      payload,
  );
};

const whoAmI = async () => {
    return await axios.get(`/api/whoami`);
};

const getLogout = async () => {
    return await axios.post(`/logout`);
};

const postForResetLink = async (payload) => {
    return await axios.post(
        `/api/forgot-password`,
        payload,
    );
};

const postResetPassword = async (payload) => {
    return await axios.post(
        `/api/reset-password`,
        payload,
    );
};

export { postLogin, whoAmI, getLogout, postForResetLink, postResetPassword };
