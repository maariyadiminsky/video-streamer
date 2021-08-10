import { useDispatch } from "react-redux";

import { createStream } from "../../redux/actions/streams";
import { STREAMS_LIST_PATH, RESPONSE_STATUS_CREATED } from "../../const";

import StreamForm from "./StreamForm";

const StreamCreate = ({ history }) => {
    const dispatch = useDispatch();

    const handleOnSubmit = (formValues) => {
        dispatch(createStream(formValues))
            .then(({status}) => status === RESPONSE_STATUS_CREATED && history.push(STREAMS_LIST_PATH))
            .catch(error => console.log(error));
    }

    return (
        <StreamForm 
            formTitle="Create a Stream"
            fieldTitle="Enter title"
            fieldDescription="Enter Description"
            buttonText="Create Stream"
            handleOnSubmit={handleOnSubmit}
        />
    );
};

export default StreamCreate;