import React, { createContext, useContext, useEffect, useReducer, useState, Fragment } from "react";
import { getLocalUserState, setLocalUserState, clearLocalUserState, clearLocalJobs } from "services/storage.service";
import { Switch, Route, Redirect } from "react-router-dom";
import { Navbar, UserNavbar, EmployerNavbar, Footer, DashFooter, Loader } from "components";
import { getUserProfile, getEmployerProfile, setAuthHeaders } from "services/auth.service";
import toast from "react-hot-toast";
import LogInPage from "pages/LogInPage";
import SignUpPage from "pages/SignUpPage";
// import LandingPage from "pages/LandingPage";
import LandingPage2 from "pages/LandingPage2";
import HomePage from "pages/users/HomePage";
import UserRegistrationPage from "pages/users/UserRegistrationPage";
import EmployerRegistrationPage from "pages/employers/EmployerRegistrationPage";
import PasswordResetPage from "pages/PasswordResetPage";
import JobDetails from "pages/JobDetails";
import UserProfilePage from "pages/users/UserProfilePage";
import EmployerProfilePage from "pages/employers/EmployerProfilePage";
import EmployerDashboard from "pages/employers/EmployerDashboard";
import ActiveJobs from "pages/employers/ActiveJobs";
import ExpiredJobs from "pages/employers/ExpiredJobs";
import PendingJobs from "pages/employers/PendingJobs";
import AcceptedJobs from "pages/employers/AcceptedJobs";
import EmployerJobDetails from "pages/employers/EmployerJobDetails";
import ApplicantProfilePage from "pages/employers/ApplicantProfilePage";
import UserNotificationPage from "pages/users/UserNotificationPage";


const UserContext = createContext();
const useUserContext = () => useContext(UserContext);

const notAuthorized = "notAuthorized";
const Authorized = "Authorized";

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": {
            return {
                ...state,
                id: action.payload.user,
                key: action.payload.key,
                isAuthorized: Authorized,
                isEmployer: action.payload.employer
            }
        }
        case "SETUSERDATA": {
            return {
                ...state,
                userData: action.payload
            }
        }
        case "SETNOTIFICATIONS": {
            return {
                ...state,
                notifications: action.payload
            }
        }
        case "LOGOUT": {
            return {
                id: null,
                key: null,
                isAuthorized: null,
                isEmployer: null,
                userData: {},
                notifications: {}
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
};

let localState = getLocalUserState();

let initialState = localState || {
    id: null,
    key: null,
    isAuthorized: notAuthorized,
    isEmployer: null,
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

    const handleGetUserProfile = () => {
        setAuthHeaders(state);
        getUserProfile(state.id)
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
                    toast.error("An error occured. We could not get your details. Please log out and login again");
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

    const handleGetEmployerProfile = () => {
        setAuthHeaders(state);
        getEmployerProfile(state.id)
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
                    toast.error("An error occured. We could not get your details. Please log out and login again");
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
        clearLocalJobs();
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
                handleGetEmployerProfile
            }}
        >
            <Switch>
                <Route path="/users">
                    <UserRoutes />
                </Route>

                <Route path="/employer">
                    <EmployerRoutes />
                </Route>

                {/* This route has to always be last to avoid wrong redirects */}
                <Route path="/">
                    <DefaultRoutes />
                </Route>
            </Switch>

        </UserContext.Provider>
    )
}

const DefaultRoutes = () => {

    const { state } = useUserContext();

    return (
        <Fragment>

            <Navbar />

            <Switch>
                <Route exact path="/">
                    {state.isAuthorized === Authorized ? <Redirect to="/home" /> : <LandingPage2 />}
                </Route>

                <Route exact path="/job/details/:pk">
                    <JobDetails />
                </Route>

                <Route exact path="/login">
                    {state.isAuthorized === Authorized ? <Redirect to="/home" /> : <LogInPage />}
                </Route>

                <Route exact path="/signup">
                    <SignUpPage />
                </Route>

                <Route exact path="/signup/user">
                    {state.isAuthorized === Authorized ? <UserRegistrationPage /> : <Redirect to="/login" />}

                </Route>

                <Route exact path="/signup/employer">
                    {state.isAuthorized === Authorized ? <EmployerRegistrationPage /> : <Redirect to="/login" />}I
                </Route>

                <Route exact path="/home">
                    {state.isAuthorized === Authorized ? (
                        state.isEmployer ? <Redirect to="/employer/dashboard" /> : <Redirect to="/users/home" />
                    ) : (
                        <Redirect to="/login" />
                    )}
                </Route>

                <Route exact path="/reset-password">
                    <PasswordResetPage />
                </Route>

                <Route>
                    {/* Redirect users to login if they hit a missing route*/}
                    <Redirect to="/login" />
                </Route>
            </Switch>

            <Footer />

        </Fragment>
    )
}

const UserRoutes = () => {

    const { state } = useUserContext();

    return (
        <Fragment>

            <UserNavbar />

            <Switch>

                <Route exact path="/users/home">
                    {state.isAuthorized === Authorized && !state.isEmployer ? <HomePage /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/users/profile">
                    {state.isAuthorized === Authorized && !state.isEmployer ? <UserProfilePage /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/users/notifications">
                    {state.isAuthorized === Authorized && !state.isEmployer ? <UserNotificationPage /> : <Redirect to="/login" />}
                </Route>

            </Switch>

            <DashFooter />

        </Fragment>
    )
}

const EmployerRoutes = () => {

    const { state } = useUserContext();

    return (
        <Fragment>

            <EmployerNavbar />

            <Switch>

                <Route exact path="/employer/dashboard">
                    {state.isAuthorized === Authorized && state.isEmployer ? <EmployerDashboard /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/employer/profile">
                    {state.isAuthorized === Authorized && state.isEmployer ? <EmployerProfilePage /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/employer/activejobs">
                    {state.isAuthorized === Authorized && state.isEmployer ? <ActiveJobs /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/employer/expiredjobs">
                    {state.isAuthorized === Authorized && state.isEmployer ? <ExpiredJobs /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/employer/pendingjobs">
                    {state.isAuthorized === Authorized && state.isEmployer ? <PendingJobs /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/employer/acceptedjobs">
                    {state.isAuthorized === Authorized && state.isEmployer ? <AcceptedJobs /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/employer/jobdetails/:pk">
                    {state.isAuthorized === Authorized && state.isEmployer ? <EmployerJobDetails /> : <Redirect to="/login" />}
                </Route>

                <Route exact path="/employer/applicant">
                    {state.isAuthorized === Authorized && state.isEmployer ? <ApplicantProfilePage /> : <Redirect to="/login" />}
                </Route>

            </Switch>

            <DashFooter />

        </Fragment>
    )
}

export { UserProvider, useUserContext }