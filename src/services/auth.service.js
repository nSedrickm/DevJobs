import axios from 'axios';

let API_URL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = API_URL;
axios.defaults.timeout = 15000;

export const setAuthHeaders = ({ key }) => {
    axios.defaults.headers.common['Authorization'] = 'token ' + key;
}

export const registerUser = ({ username, email, password1, password2 }) => {
    return axios.post(API_URL + "/dj-rest-auth/registration/",
        {
            email: email,
            username: username,
            password1: password1,
            password2: password2
        }).then(response => response)
}

export const createEmployerProfile = ({ company_name, company_number }) => {
    return axios.post(API_URL + "/employer/new/",
        {
            company_name: company_name,
            company_number: company_number
        }).then(response => response)
}

export const userLogin = async ({ email, password }) => {
    return axios.post(API_URL + "/dj-rest-auth/login/",
        {
            email: email,
            password: password
        }).then(response => response)
};


export const logOut = () => {
    return axios.get("/dj-rest-auth/logout/").then(response => response)
}

export const getUserId = async () => {
    return axios.get(API_URL + "/dj-rest-auth/user/").then(response => response)
};

export const getUserProfile = async (pk) => {
    return axios.get(API_URL + "/profile/" + pk).then(response => response)
};

export const updateUserProfile = async (data) => {
    return axios.put(API_URL + "/profile/",
        {
            first_name: data.first_name
        }).then(response => response)
}

