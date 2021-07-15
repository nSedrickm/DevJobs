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
        description: data.description,
        closing_date: data.closing_date
    }).then(response => response)
}

export const updateJob = (data) => {
    return axios.patch(`${API_URL}/job/update/${data.pk}/`, {
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
        description: data.description,
        closing_date: data.closing_date
    }).then(response => response)
}

export const deleteJob = (pk) => {
    return axios.delete(`${API_URL}/job/delete/${pk}/`).then(response => response)
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

export const acceptApplication = (pk, user_id) => {
    return axios.post(`${API_URL}/job/accept/?pk=${pk}&user_id=${user_id}`).then(response => response)
}

export const rejectApplication = (pk, user_id) => {
    return axios.post(`${API_URL}/job/reject/?pk=${pk}&user_id=${user_id}`).then(response => response)
}