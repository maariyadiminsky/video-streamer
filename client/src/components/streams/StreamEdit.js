import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { getStreamSelector } from "../../redux/selectors/streams";
import { getStream, editStream } from "../../redux/actions/streams";
import { STREAMS_LIST_PATH, RESPONSE_STATUS_SUCCESS } from "../../const";
import StreamForm from "./StreamForm";

const StreamEdit = ({ history }) => {
    const { id } = useParams();
    const stream = useSelector(getStreamSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        if (!stream) dispatch(getStream(id));
    }, []);

    const handleOnSubmit = (formValues) => {
    /*  
        todo: handle error better here
        see if the issue is related to internet connection etc.
        and based on the issue show a clear warning message 
    */
    dispatch(editStream(id, formValues))
        .then(({ status }) => status === RESPONSE_STATUS_SUCCESS && history.push(STREAMS_LIST_PATH))
        .catch(error => console.log(error));
    }

    if (!stream) {
        return <div>Loading...</div>
    }

    return (
        <StreamForm 
            initialValues={{
                title: stream.title,
                description: stream.description
            }}
            formTitle="Edit your Stream"
            fieldTitle="Edit title"
            fieldDescription="Edit Description"
            buttonText="Update Stream"
            handleOnSubmit={handleOnSubmit}
        />
    );
}

export default StreamEdit;