import React, { useReducer } from "react"
import axios from "axios"
import GithubContext from "./githubContext"
import GithubReducer from "./githubReducer"
import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
} from "../types"

// Preparing for deployment
let githubClientID;
let githubClientSecret;

if (process.env.NODE_ENV !== "production") {
    githubClientID = process.env.REACT_APP_GITHUB_CLIENT_ID;
    githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
}

else {
    githubClientID = process.env.GITHUB_CLIENT_ID;
    githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = props => {
    const initialState =
    {
        users: [],
        loading: false
    }

    const [state, dispatch] = useReducer(GithubReducer, initialState);

    // Search Users
    const searchUsers = async (text) => {

        setLoading();

        const response = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=
        ${githubClientID} 
        &client_scret =${githubClientSecret}`)

        dispatch({
            type: SEARCH_USERS,
            payload: response.data.items
        })

    }

    // Clear Users
    const clearUsers = () => dispatch({ type: CLEAR_USERS })


    // Set Loading
    const setLoading = () => dispatch({ type: SET_LOADING });

    return <GithubContext.Provider value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers
    }}>
        {props.children}

    </GithubContext.Provider>

}

export default GithubState