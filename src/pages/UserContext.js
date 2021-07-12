import React, { createContext, useContext, useEffect, useReducer, useState, Fragment } from "react";
import { getLocalUserState, setLocalUserState, clearLocalUserState, clearLocalJobs } from "services/storage.service";
import { Switch, Route, Redirect } from "react-router-dom";
import { Navbar, UserNavbar, Footer, Loader } from "components";
import { getUserProfile, getUserId } from "services/auth.service";
import toast from "react-hot-toast";
import LogInPage from "pages/LogInPage";
import SignUpPage from "pages/SignUpPage";
import LandingPage from "pages/LandingPage";
import HomePage from "pages/users/HomePage";
import UserRegistrationPage from "pages/users/UserRegistrationPage";
import EmployerRegistrationPage from "pages/employers/EmployerRegistrationPage";
import PasswordResetPage from "pages/PasswordResetPage";
import JobDetails from "pages/JobDetails";
import ProfilePage from "pages/ProfilePage";
import EmployerDashboard from "pages/employers/EmployerDashboard";
import ActiveJobs from "pages/employers/ActiveJobs";
import ExpiredJobs from "pages/employers/ExpiredJobs";

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
        case "SETBASICUSERDATA": {
            return {
                ...state,
                basicUserData: action.payload
            }
        }
        case "SETFULLUSERDATA": {
            return {
                ...state,
                fullUserData: action.payload
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
                basicUserData: {},
                fullUserData: {},
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
    basicUserData: {},
    fullUserData: {},
    notifications: {}
}

const UserProvider = () => {

    const [state, dispatch] = useReducer(reducer, initialState);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLocalUserState(state);
        initialState = getLocalUserState();
    }, [state])

    const getFullUserProfile = (pk) => {

        getUserProfile(pk)
            .then(response => {
                dispatch({
                    type: "SETFULLUSERDATA",
                    payload: response.data
                });
                console.log(response.data)
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    toast.error("Could not get full user details. Please log out and login again");
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
                    type: "SETBASICUSERDATA",
                    payload: response.data
                });
                getFullUserProfile(response.data.pk);
                setLoading(false);
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
                getFullUserProfile,
                getBasicUserProfile
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
                    {state.isAuthorized === Authorized ? <Redirect to="/home" /> : <LandingPage />}
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
                    {state.isAuthorized === Authorized && !state.isEmployer ? <ProfilePage /> : <Redirect to="/login" />}
                </Route>

            </Switch>

        </Fragment>
    )
}

const EmployerRoutes = () => {

    const { state } = useUserContext();

    return (
        <Fragment>

            <Route exact path="/employer/dashboard">
                {state.isAuthorized === Authorized && state.isEmployer ? <EmployerDashboard /> : <Redirect to="/login" />}
            </Route>

            <Route exact path="/employer/profile">
                {state.isAuthorized === Authorized && state.isEmployer ? <ProfilePage /> : <Redirect to="/login" />}
            </Route>

            <Route exact path="/employer/activejobs">
                {state.isAuthorized === Authorized && state.isEmployer ? <ActiveJobs /> : <Redirect to="/login" />}
            </Route>

            <Route exact path="/employer/expiredjobs">
                {state.isAuthorized === Authorized && state.isEmployer ? <ExpiredJobs /> : <Redirect to="/login" />}
            </Route>

        </Fragment>
    )
}

export { UserProvider, useUserContext }