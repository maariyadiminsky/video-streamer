import { SIGN_USER_IN, SIGN_USER_OUT } from "./types";

export const signUserIn = (userId) => {
    return {
        type: SIGN_USER_IN,
        payload: userId
    }
};

export const signUserOut = () => {
    return {
        type: SIGN_USER_OUT
    }
};