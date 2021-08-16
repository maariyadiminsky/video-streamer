import { useState } from "react";
import { useDispatch } from "react-redux";

import { EDIT_STREAM, DELETE_STREAM } from "../redux/actions/types";
import { editStream, deleteStream } from "../redux/actions/streams";

export const UpdateStream = (type, id, { formValues = null, handleSuccess = null }) => {
    const [errors, setErrors] = useState({ errors: "" });
    const dispatch = useDispatch();

    let result;

    switch(type) {
        case EDIT_STREAM:
            result = dispatch(editStream(id, formValues));
            break;
        case DELETE_STREAM:
            result = dispatch(deleteStream(id));
            break;
        default:
            break;
    }
    
    if (result) {
        result
        .then(() => handleSuccess && handleSuccess())
        .catch((error) => {
            console.log(`ERROR CHANGING STREAM, ie: ${type}: ${error}`);
            setErrors(({  errors: `${error}` }));
        });
    }

    return errors;
}