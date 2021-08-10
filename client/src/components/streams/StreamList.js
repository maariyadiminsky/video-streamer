import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { getStreams} from "../../actions/streams";
import { 
    SHOW_STREAM_PATH, 
    CREATE_NEW_STREAM_PATH, 
    EDIT_STREAM_PATH, 
    DELETE_STREAM_PATH 
} from "../../const";

class StreamList extends Component {
    componentDidMount() {
        const { getStreams } = this.props;

        getStreams();
    }

    // if the incoming stream has the same userId as the
    // current logged in user--render the buttons
    renderActionButtonsTry(streamId, streamUserId){
        const { currentLoggedInUserId } = this.props;

        if (currentLoggedInUserId === streamUserId) {
            return (
                <div className="right floated content">
                    <Link 
                        className="ui button" 
                        to={EDIT_STREAM_PATH(streamId)}
                    >
                        Edit
                    </Link>
                    <Link 
                        className="ui button" 
                        to={DELETE_STREAM_PATH(streamId)}
                    >
                        Remove
                    </Link>
                </div>
            );
        }

        return "";
    }

    renderCreateStreamButtonTry() {
        const { isUserSignedIn } = this.props;

        if (isUserSignedIn) {
            return (
                <div style={{ textAlign: "right" }}>
                    <Link className="ui button inverted red" to={CREATE_NEW_STREAM_PATH}>Create Stream</Link>
                </div>
            );
        }

        return "";
    }

    renderStreams() {
        const { streams } = this.props;

        if (streams.length === 0) {
            return <div>No streams yet! Try creating one.</div>
        }

        return streams.map(({ id, title, description, userId }) => (
            <div className="item" key={id}>
                {this.renderActionButtonsTry(id, userId)}
                <i className="large middle aligned icon tv" />
                <div className="content">
                    <Link
                        className="header" 
                        to={SHOW_STREAM_PATH(id)}
                    >
                        {title}
                    </Link>
                    <div className="description">
                        {description}
                    </div>
                </div>
            </div>
        ));
    }

    render() {
        const { streams } = this.props;

        if (!streams) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    {this.renderStreams()}
                </div>
                {this.renderCreateStreamButtonTry()}
            </div>
        );
    }
}

// turn objects into array for easier mapping
const mapStateToProps = ({ streams, auth: { userId, isUserSignedIn } }) => ({
    streams: Object.values(streams),
    currentLoggedInUserId: userId,
    isUserSignedIn
});

export default connect(mapStateToProps, { getStreams })(StreamList);