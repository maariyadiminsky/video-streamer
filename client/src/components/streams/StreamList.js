import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import isEmpty from "lodash/isEmpty";

import { getStreamsSelector } from "../../redux/selectors/streams";
import { getCurrentlyLoggedInUserIdSelector, IsUserSignedInSelector } from "../../redux/selectors/auth";
import { getStreams } from "../../redux/actions/streams";
import { 
    SHOW_STREAM_PATH, 
    CREATE_NEW_STREAM_PATH, 
    EDIT_STREAM_PATH, 
    DELETE_STREAM_PATH 
} from "../../const";

const StreamList = () => {
    const streams = useSelector(getStreamsSelector);
    const currentLoggedInUserId = useSelector(getCurrentlyLoggedInUserIdSelector);
    const isUserSignedIn = useSelector(IsUserSignedInSelector);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getStreams());
    }, [dispatch]);

    // if the incoming stream has the same userId as the
    // current logged in user--render the buttons
    const renderActionButtonsTry = (streamId, streamUserId) => {
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

    const renderCreateStreamButtonTry = () =>{
        if (isUserSignedIn) {
            return (
                <div style={{ textAlign: "right" }}>
                    <Link className="ui button inverted red" to={CREATE_NEW_STREAM_PATH}>Create Stream</Link>
                </div>
            );
        }

        return "";
    }

    const renderStreams = () => {
        if (streams && streams.length === 0) {
            return <div>No streams yet! Try creating one.</div>
        }

        return streams.map(({ id, title, description, userId }) => (
            <div className="item" key={id}>
                {renderActionButtonsTry(id, userId)}
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

    if (isEmpty(streams)) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h2>Streams</h2>
            <div className="ui celled list">
                {renderStreams()}
            </div>
            {renderCreateStreamButtonTry()}
        </div>
    );
}

export default StreamList;