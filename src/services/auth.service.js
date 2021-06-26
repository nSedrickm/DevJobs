import axios from 'axios';

let API_URL = process.env.REACT_APP_API_URL;
axios.defaults.baseURL = API_URL;
axios.defaults.timeout = 15000;

export const setAuthHeaders = ({ key }) => {
    axios.defaults.headers.common['Authorization'] = 'token ' + key;
}

export const registerUser = ({ username, password1, password2 }) => {
    return axios.post(API_URL + "/dj-rest-auth/registration/",
        {
            username: username,
            password1: password1,
            password2: password2
        }).then(response => response)
}

export const userLogin = async ({ username, password }) => {
    return axios.post(API_URL + "/dj-rest-auth/login/",
        {
            username: username,
            password: password
        }).then(response => response)
};


export const logOut = () => {
    return axios.get("/dj-rest-auth/logout/")
        .then(response => response)
}

