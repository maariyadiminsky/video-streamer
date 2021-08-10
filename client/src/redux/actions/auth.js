import { SIGN_USER_IN, SIGN_USER_OUT } from "./types";

export const signUserIn = (userId) => ({
    type: SIGN_USER_IN,
    payload: userId
});

export const signUserOut = () => ({
    type: SIGN_USER_OUT
});