import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = API_URL;

// item routes
export const getJobs = () => {
    return axios.get(API_URL + "/job").then(response => response)
}

export const getJobDetails = (pk) => {
    return axios.get(`${API_URL}/job/detail/${pk}`).then(response => response)
}
