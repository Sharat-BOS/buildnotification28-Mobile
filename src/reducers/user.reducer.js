
import {
    SAVE_USER_ID,
    SAVE_USER_DETAILS,
    LOGOUT_USER
} from '../actions/types';

const INITIAL_STATE = {
    userId: null,
    userDetails: null,
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SAVE_USER_ID:
            return { userId: action.payload };
        case SAVE_USER_DETAILS:
            return { userDetails: action.payload };
        case LOGOUT_USER:
            return { userDetails: null, userId: null };
        default:
            return state;
    }
};