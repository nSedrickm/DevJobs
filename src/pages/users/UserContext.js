import React, { createContext, useContext, useEffect, useState, useReducer } from "react";
import { getLocalUserState, setLocalUserState } from "services/storage.service";
import { userLogin } from "services/auth.service";
import { Switch, Route, Redirect } from "react-router-dom";
import toast from "react-hot-toast";
import LogInPage from "pages/users/LogInPage";
import SignUpPage from "pages/users/SignUpPage";
import HomePage from "pages/users/HomePage";

const UserContext = createContext();
const useUserContext = () => useContext(UserContext);

const reducer = (state, action) => {
    switch (action.type) {
        case "LOGIN": {
            return {
                ...state,
                isAuthorized: action.payload
            }
        }
        case "LOGOUT": {
            return {
                ...state,
                isAuthorized: action.payload.isAuthorized,
                userData: action.payload.userData
            }
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
};

const notAuthorized = "notAuthorized";
const Authorized = "Authorized";

let localState = getLocalUserState();

let initialState = localState || {
    isAuthorized: notAuthorized,
    userData: {},
    notifications: {}
}
const UserProvider = () => {


    const [loading, setLoading] = useState(false);

    const [state, dispatch] = useReducer(reducer, initialState);

    const { isAuthorized } = state;

    useEffect(() => {
        setLocalUserState(state);
        initialState = getLocalUserState();
    }, [state])

    const handleLogin = () => {

        setLoading(true);

        userLogin()
            .then(response => {
                toast.success("Login Successfull");
                dispatch({
                    type: "LOGIN",
                    payload: Authorized
                });
                console.log(response.data)
            })
            .catch(error => {
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    toast.error("An error occurred Please check your network and try again");
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

    return (
        <UserContext.Provider
            value={{
                state,
                isAuthorized,
                handleLogin
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