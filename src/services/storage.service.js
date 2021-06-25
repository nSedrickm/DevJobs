
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

