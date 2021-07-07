
// Helper functions for managing local storage

export const setLocalUserState = (state) => {
    sessionStorage.setItem("DevJobsUser", JSON.stringify(state))
}

export const getLocalUserState = () => {
    return JSON.parse(sessionStorage.getItem("DevJobsUser"));
}

export const clearLocalUserState = () => {
    sessionStorage.removeItem("DevJobsUser");
}

export const setLocalJobs = (state) => {
    sessionStorage.setItem("DevJobsJobList", JSON.stringify(state))
}

export const getLocalJobs = () => {
    return JSON.parse(sessionStorage.getItem("DevJobsJobList"));
}

export const clearLocalJobs = () => {
    sessionStorage.removeItem("DevJobsJobList");
}
