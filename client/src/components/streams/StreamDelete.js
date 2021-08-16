import { useDispatch} from "react-redux";
import { useParams } from "react-router-dom";

import { useFetchStream } from "../../hooks/useFetchStream";
import { deleteStream } from "../../redux/actions/streams";
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
    const dispatch = useDispatch();

    const { id } = useParams();
    const { loading, errors, stream } = useFetchStream(id);

    const handleDeleteStream = () => {
        if (!id) return;

        dispatch(deleteStream(id))
        .then(({ status }) => status === RESPONSE_STATUS_SUCCESS && history.push(STREAMS_LIST_PATH))
        .catch(error => console.log(error));
    };

    const renderContent = ({ title }) => (
        <div style={contentStyles}>
            Are you sure you want to delete this stream?
            <p style={titleStyles}>{title}</p>
        </div>
    );

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Modal 
                header="Delete Stream"
                content={stream && renderContent(stream)}
                cancelButtonText="Nevermind"
                confirmButtonText="Yes, I'm sure"
                handleConfirm={handleDeleteStream}
                customCancelPath={STREAMS_LIST_PATH}
                history={history}
                parentErrors={errors}
            />
        </div>
    );
}

export default StreamDelete;