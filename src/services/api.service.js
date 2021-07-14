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

export const getNotifications = () => {
    return axios.get(API_URL + "/job/notification/").then(response => response)
}

export const createJob = (data) => {
    return axios.post(API_URL + "/job/create/", {
        company_id: data.company_number,
        company_email: data.company_email,
        country: data.country,
        state: data.state,
        city: data.city,
        title: data.title,
        company_name: data.company_name,
        company_website: data.company_website,
        experience_level: data.experience_level,
        expected_salary: data.expected_salary,
        description: data.description
    }).then(response => response)
}

export const jobApplication = (pk) => {
    return axios.post(API_URL + "/job/apply/?pk=" + pk).then(response => response)
}


export const getEmployerDashboard = () => {
    return axios.get(API_URL + "/job/employer/dashboard/").then(response => response)
}

export const getApplications = (pk) => {
    return axios.get(API_URL + "/job/applications/?pk=" + pk).then(response => response)
}