import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import isEmpty from "lodash/isEmpty";

import { getStreamSelector } from "../../redux/selectors/streams";
import { getStream, deleteStream } from "../../redux/actions/streams";
import { STREAMS_LIST_PATH, RESPONSE_STATUS_SUCCESS } from "../../const";

import Modal from "../Modal";

const contentStyles = {
    fontSize: 15,
    textAlign: "center"
}

const titleStyles = {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold"
}
const StreamDelete = ({ history}) => {
    const { id } = useParams();
    const stream = useSelector(({ streams }) => getStreamSelector(streams, id));

    const dispatch = useDispatch();

    useEffect(() => {
        if (isEmpty(stream)) dispatch(getStream(id));
    }, [dispatch]);

    const handleDeleteStream = () => {
        if (!id) return;

        dispatch(deleteStream(id))
        .then(({ status }) => status === RESPONSE_STATUS_SUCCESS && history.push(STREAMS_LIST_PATH))
        .catch(error => console.log(error));
    };

    const renderContent = (title) => (
        <div style={contentStyles}>
            Are you sure you want to delete this stream?
            <p style={titleStyles}>{title}</p>
        </div>
    );

    if (isEmpty(stream)) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Modal 
                header="Delete Stream"
                content={renderContent(stream.title)}
                cancelButtonText="Nevermind"
                confirmButtonText="Yes, I'm sure"
                handleConfirm={handleDeleteStream}
                customCancelPath={STREAMS_LIST_PATH}
                history={history}
            />
        </div>
    );
}

export default StreamDelete;