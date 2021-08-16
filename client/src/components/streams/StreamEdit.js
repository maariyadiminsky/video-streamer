import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { useFetchStream } from "../../hooks/useFetchStream";
import { GET_STREAM, EDIT_STREAM } from "../../redux/actions/types";
import { editStream } from "../../redux/actions/streams";
import { STREAMS_LIST_PATH, RESPONSE_STATUS_SUCCESS } from "../../const";

import StreamForm from "./StreamForm";

const StreamEdit = ({ history }) => {
    const { id } = useParams();
    const { loading, errors, stream } = useFetchStream(GET_STREAM, id);

    const dispatch = useDispatch();

    const handleOnSubmit = (formValues) => {
        if (!id) return;
        
        dispatch(editStream(id, formValues))
        .then(({ status }) => status === RESPONSE_STATUS_SUCCESS && history.push(STREAMS_LIST_PATH))
        .catch(error => console.log(error));
    }

    if (loading) {
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
            parentErrors={errors}
        />
    );
}

export default StreamEdit;