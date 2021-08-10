import React, { Component } from "react";
import { connect } from "react-redux";

import Modal from "../Modal";
import { STREAMS_LIST_PATH, RESPONSE_STATUS_SUCCESS } from "../../const";
import { getStream, deleteStream } from "../../actions/streams";

const contentStyles = {
    fontSize: 15,
    textAlign: "center"
}

const titleStyles = {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
}
class StreamDelete extends Component {
    componentDidMount() {
        const { stream, id, getStream } = this.props;

        if (!stream) getStream(id);
    }

    handleDeleteStream = () => {
        const { id, deleteStream, history } = this.props;

        /*  
            todo: handle error better here
            see if the issue is related to internet connection etc.
            and based on the issue show a clear warning message 
        */
        deleteStream(id)
        .then(({ status }) => status === RESPONSE_STATUS_SUCCESS && history.push(STREAMS_LIST_PATH))
        .catch(error => console.log(error));
    }

    renderContent(title) {
        return (
            <div style={contentStyles}>
                Are you sure you want to delete this stream?
                <p style={titleStyles}>{title}</p>
            </div>
        )
    }

    render() {
        const { stream, history } = this.props;

        if (!stream) {
            return <div>Loading...</div>;
        }

        return (
            <div>
             <Modal 
                header="Delete Stream"
                content={this.renderContent(stream.title)}
                cancelButtonText="Nevermind"
                confirmButtonText="Yes, I'm sure"
                handleConfirm={this.handleDeleteStream}
                customCancelPath={STREAMS_LIST_PATH}
                history={history}
            />
            </div>
        );
    }
}

const mapStateToProps = ({ streams }, ownProps) => ({
    stream: streams[ownProps.match.params.id],
    id: ownProps.match.params.id
});

export default connect(mapStateToProps, { getStream, deleteStream })(StreamDelete);