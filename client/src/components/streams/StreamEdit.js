import React, { Component } from "react";
import { connect } from "react-redux";

import StreamForm from "./StreamForm";
import { getStream, editStream } from "../../actions/streams";
import { STREAMS_LIST_PATH, RESPONSE_STATUS_SUCCESS } from "../../const";

class StreamEdit extends Component {
    componentDidMount() {
        const { stream, id, getStream } = this.props;

        if (!stream) getStream(id);
    }

    handleOnSubmit = (formValues) => {
        const { stream: { id }, editStream, history } = this.props;
    /*  
        todo: handle error better here
        see if the issue is related to internet connection etc.
        and based on the issue show a clear warning message 
    */
    editStream(id, formValues)
        .then(({ status }) => status === RESPONSE_STATUS_SUCCESS && history.push(STREAMS_LIST_PATH))
        .catch(error => console.log(error));
    }

    render() {
        const { stream } = this.props;

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
                handleOnSubmit={this.handleOnSubmit}
            />
        );
    }
}

const mapStateToProps = ({ streams }, ownProps) => ({ 
    stream: streams[ownProps.match.params.id],
    id: ownProps.match.params.id
});

export default connect(mapStateToProps, { getStream, editStream })(StreamEdit);