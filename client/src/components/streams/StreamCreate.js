import React from "react";
import { connect } from "react-redux";

import StreamForm from "./StreamForm";
import { createStream } from "../../actions/streams";
import { STREAMS_LIST_PATH, RESPONSE_STATUS_CREATED } from "../../const";

const StreamCreate = ({ createStream, history }) => {
    const handleOnSubmit = (formValues) => {
        /*  
            todo: handle error better here
            see if the issue is related to internet connection etc.
            and based on the issue show a clear warning message 
        */
        createStream(formValues)
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
}

export default connect(null, { createStream })(StreamCreate);