import { omit, mapKeys } from "lodash";

import { 
    CREATE_STREAM,
    DELETE_STREAM,
    EDIT_STREAM,
    GET_STREAM,
    GET_STREAMS,
} from "../actions/types";

export default (state = {}, { type, payload }) => {
    switch(type) {
        case CREATE_STREAM:
        case EDIT_STREAM:
        case GET_STREAM:
            return { ...state, [payload.id]: payload };
        case GET_STREAMS:
            return { ...state, ...mapKeys(payload, "id") };
        case DELETE_STREAM:
            return omit(state, payload);
        default:
            return state;
            
    }
}