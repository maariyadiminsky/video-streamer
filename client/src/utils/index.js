import { DEVELOPMENT, PRODUCTION } from "../const";

export const findBaseURL = () => {
    if (process.env.NODE_ENV === PRODUCTION) {
        return process.env.REACT_APP_PROD_API_URL;
    } else if (process.env.NODE_ENV === DEVELOPMENT) {
        return process.env.REACT_APP_DEV_API_URL;
    } 
    
    return "";
}

// so elements with multiple event handlers aren't unnecessarily 
// called more than once(ie. SyntheticEvent Bubbling)
export const stopEventPropagationTry = (event) => {
    if (event.target === event.currentTarget) {
        event.stopPropagation();
    }
}