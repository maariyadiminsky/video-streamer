import { SIGN_USER_IN, SIGN_USER_OUT } from "../actions/types";

const INITIAL_STATE = {
    isUserSignedIn: null,
    userId: null
};

export default (state = INITIAL_STATE, { type, payload }) => {
    switch(type) {
        case SIGN_USER_IN:
            return { ...state, isUserSignedIn: true, userId: payload };
        case SIGN_USER_OUT:
            return { ...state, isUserSignedIn: false, userId: null };
        default:
            return state;
    }
}