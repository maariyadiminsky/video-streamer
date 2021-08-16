import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import isEmpty from "lodash/isEmpty";

import { getStreamsSelector } from "../redux/selectors/streams";
import { getStreams } from "../redux/actions/streams";

export const useFetchStreams = () => {
    const [state, setState] = useState({ loading: true, errors: "" });

    const dispatch = useDispatch();

    const streams = useSelector(getStreamsSelector);

    useEffect(() => {
        if (isEmpty(streams)) {
            dispatch(getStreams())
            .then(() => setState({ loading: false, errors: "" }))
            .catch((error) => {
                console.log(`ERROR FETCHING STREAMS: ${error}`);
                setState({ loading: false, errors: `${error}` });
            })
        }
    }, [dispatch])

    return {
        ...state,
        streams
    }
}