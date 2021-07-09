import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { getLocalUserState, setLocalUserState, clearLocalUserState } from "services/storage.service";
import { Switch, Route, Redirect } from "react-router-dom";
import { Navbar, Footer, Loader } from "components";
import { getUserProfile, getUserId } from "services/auth.service";
import toast from "react-hot-toast";
import LogInPage from "pages/LogInPage";
import SignUpPage from "pages/SignUpPage";
import LandingPage from "pages/LandingPage";
import Dashboard from "pages/Dashboard";
import JobSeekerRegistrationPage from "pages/JobSeekerRegistrationPage";
import EmployerRegistrationPage from "pages/EmployerRegistrationPage";
import PasswordResetPage from "pages/PasswordResetPage";
import JobDetails from "pages/JobDetails";
import ProfilePage from "pages/ProfilePage";
import DashboardEmployer from "./EmployerDashboard/DashboardEmployer";
import ActiveJobs from "./EmployerDashboard/ActiveJobs";
import ExpiredJobs from "./EmployerDashboard/ExpiredJobs";

const UserContext = createContext();
const useUserContext = () => useContext(UserContext);

const notAuthorized = "notAuthorized";
const Authorized = "Authorized";

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": {
            return {
                ...state,
                isAuthorized: Authorized,
                key: action.payload.key
            }
        }
        case "SETUSERDATA": {
            return {
                ...state,
                userData: action.payload
            }
        }
        case "LOGOUT": {
            return {
                ...state,
                isAuthorized: notAuthorized,
                key: "",
                userData: {}
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
};

let localState = getLocalUserState();

let initialState = localState || {
    isAuthorized: notAuthorized,
    key: "",
    userData: {},
    notifications: {}
}

const UserProvider = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLocalUserState(state);
        initialState = getLocalUserState();
    }, [state])

    const handleGetUserProfile = (pk) => {

        getUserProfile(pk)
            .then(response => {
                dispatch({
                    type: "SETUSERDATA",
                    payload: response.data
                });
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    toast.error("Could not get agent details. Please log out and login again");
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    toast.error("An error occurred Please check your network and try again");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    toast.error("An error occurred Please check your network and try again");
                }
                setLoading(false);
            });
    }

    const getBasicUserProfile = () => {

        setLoading(true);

        getUserId()
            .then(response => {
                console.log(response.data);
                dispatch({
                    type: "SETUSERDATA",
                    payload: response.data
                });
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    toast.error("An error occured could not get user ID");

                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                    toast.error("An error occurred Please check your network and try again");
                } else {
                    // Something happened in setting up the request that triggered an Error
                    toast.error("An error occurred Please check your network and try again");
                }
                setLoading(false);
            });
    }

    const handleLogOut = () => {
        dispatch({ type: "LOGOUT" })
        clearLocalUserState();
    }

    if (loading) return <Loader />

    return (
        <UserContext.Provider
            value={{
                state,
                loading,
                dispatch,
                setLoading,
                handleLogOut,
                handleGetUserProfile,
                getBasicUserProfile
            }}
        >
            <Navbar />
            <Switch>
                <Route exact path="/">
                    <LandingPage />
                </Route>

                <Route exact path="/job/details/:pk">
                    <JobDetails />
                </Route>

                <Route exact path="/login">
                    {state.isAuthorized === Authorized ? <Redirect to="/" /> : <LogInPage />}
                </Route>

                <Route exact path="/signup">
                    <SignUpPage />
                </Route>

                <Route exact path="/dashboard">
                    {state.isAuthorized === Authorized ? <Dashboard /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/users/profile">
                    {state.isAuthorized === Authorized ? <ProfilePage /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/profile/job-seeker">
                    {state.isAuthorized === Authorized ? <JobSeekerRegistrationPage /> : <Redirect to="/" />}
                </Route>

                <Route exact path="/profile/employer">
                    {state.isAuthorized === Authorized ? <EmployerRegistrationPage /> : <Redirect to="/" />}
                </Route>

                <Route exact path="/reset-password">
                    <PasswordResetPage />
                </Route>
                <Route exact path="/employer/dashboard">
                    {state.isAuthorized === Authorized ? <DashboardEmployer /> : <Redirect to="/" />}
                </Route>

                <Route>
                    {/* Redirect users to login if they hit a missing route*/}
                    <Redirect to="/login" />
                </Route>
            </Switch>
            <Footer />
        </UserContext.Provider>
    )
}

export { UserProvider, useUserContext }