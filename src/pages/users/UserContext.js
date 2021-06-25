import React, { createContext, useContext, useEffect, useReducer } from "react";
import { getLocalUserState, setLocalUserState, clearLocalUserState } from "services/storage.service";
import { Switch, Route, Redirect } from "react-router-dom";
import LogInPage from "pages/users/LogInPage";
import SignUpPage from "pages/users/SignUpPage";
import HomePage from "pages/users/HomePage";

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
    userData: {},
    notifications: {}
}
const UserProvider = () => {

    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        setLocalUserState(state);
        initialState = getLocalUserState();
    }, [state])

    const hanldeLogOut = () => {
        dispatch({ type: "LOGOUT" })
        clearLocalUserState();
    }

    return (
        <UserContext.Provider
            value={{
                state,
                dispatch,
                hanldeLogOut
            }}
        >
            <Switch>
                <Route exact path="/users/login">
                    {state.isAuthorized === Authorized ? <Redirect to="/users/home" /> : <LogInPage />}
                </Route>

                <Route exact path="/users/signup">
                    <SignUpPage />
                </Route>

                <Route path="/users/home">
                    {state.isAuthorized === Authorized ? <HomePage /> : <Redirect to="/users/login" />}
                </Route>

                <Route>
                    {/* Redirect users to login if they hit a missing route*/}
                    <Redirect to="/users/login" />
                </Route>
            </Switch>
        </UserContext.Provider>
    )
}

export { UserProvider, useUserContext }