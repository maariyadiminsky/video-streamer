import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";

import { getStreamsSelector } from "../redux/selectors/streams";
import { getStreams } from "../redux/actions/streams";

export const useFetchStreams = ({ handleSuccess = null } = {}) => {
    const [state, setState] = useState({ loading: true, errors: "" });

    const dispatch = useDispatch();

    const streams = useSelector(getStreamsSelector);

    useEffect(() => {
        if (isEmpty(streams)) {
            dispatch(getStreams())
            .then(({ data }) => {
                setState({ loading: false, errors: "" });
                handleSuccess && handleSuccess(data);
            })
            .catch((error) => {
                console.log(`ERROR FETCHING STREAMS: ${error}`);
                setState({ loading: false, errors: `${error}` });
            })
        } else {
            setState({ loading: false, errors: "" });
        }
    }, [dispatch])

    return {
        ...state,
        streams
    }
}