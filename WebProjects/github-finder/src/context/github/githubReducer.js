import {
    SEARCH_USERS,
    SET_LOADING,
    CLEAR_USERS,
} from "../types"

export default (state, action) => {
    switch (action.type) {
        case CLEAR_USERS:
            return {
                ...state,
                users: [],
                loading: false
            }
        case SEARCH_USERS:
            return {
                users: action.payload,
                loading: false
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}

