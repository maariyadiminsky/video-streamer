import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import { getStream } from "../redux/actions/streams";
import { getStreamSelector } from "../redux/selectors/streams";

export const useFetchStream = (id, { handleSuccess = null } = {}) => {
    const [state, setState] = useState({
        loading: true,
        errors: "",
    });

    const dispatch = useDispatch();

    const stream = useSelector(({ streams }) => getStreamSelector(streams, id));

    useEffect(() => {
        setState(({ loading: true, error: "" }));

        dispatch(getStream(id))
            .then(({ data }) => {
                setState({ loading: false, error: "" });
                handleSuccess && handleSuccess(data);
            })
            .catch((error) => {
                console.log(`ERROR FETCHING STREAM: ${error}`);
                setState(({ loading: false, errors: `${error}` }));
            });
    }, [dispatch]);

    return {
        ...state,
        stream
    };
}