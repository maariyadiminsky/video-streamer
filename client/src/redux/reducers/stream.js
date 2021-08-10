import omit from "lodash/omit";
import mapKeys from "lodash/mapKeys";

import { 
    CREATE_STREAM,
    DELETE_STREAM,
    EDIT_STREAM,
    GET_STREAM,
    GET_STREAMS,
} from "../actions/types";

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, { type, payload }) => {
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