import React, { createContext, useContext, useEffect, useReducer } from "react";
import { getLocalUserState, setLocalUserState, clearLocalUserState } from "services/storage.service";
import { Switch, Route, Redirect } from "react-router-dom";
import LogInPage from "pages/LogInPage";
import SignUpPage from "pages/SignUpPage";
import LandingPage from "pages/LandingPage";
import JobSeekerRegistrationPage from "pages/JobSeekerRegistrationPage";
import EmployerRegistrationPage from "pages/EmployerRegistrationPage";
import PasswordResetPage from "pages/PasswordResetPage";
import JobDetails from "pages/JobDetails";

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

    useEffect(() => {
        setLocalUserState(state);
        initialState = getLocalUserState();
    }, [state])

    const handleLogOut = () => {
        dispatch({ type: "LOGOUT" })
        clearLocalUserState();
    }

    return (
        <UserContext.Provider
            value={{
                state,
                dispatch,
                handleLogOut
            }}
        >
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

                <Route exact path="/job-seeker">
                    {state.isAuthorized === Authorized ? <JobSeekerRegistrationPage /> : <Redirect to="/" />}
                </Route>

                <Route exact path="/employer">
                    {state.isAuthorized === Authorized ? <EmployerRegistrationPage /> : <Redirect to="/" />}
                </Route>

                <Route exact path="/reset-password">
                    <PasswordResetPage />
                </Route>

                <Route>
                    {/* Redirect users to login if they hit a missing route*/}
                    <Redirect to="/login" />
                </Route>
            </Switch>
        </UserContext.Provider>
    )
}

export { UserProvider, useUserContext }