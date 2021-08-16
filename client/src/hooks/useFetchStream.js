import { useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

import { getStream } from "../redux/actions/streams";
import { getStreamSelector } from "../redux/selectors/streams";

export const useFetchStream = (type, id, { handleSuccess=null } = {}) => {
    const [state, setState] = useState({
        loading: true,
        errors: "",
    });

    const dispatch = useDispatch();

    const stream = useSelector(({ streams }) => getStreamSelector(streams, id));

    useEffect(() => {
        setState(({ loading: true, error: "" }));

        dispatch(getStream(id))
            .then(() => setState(({ loading: false, error: "" })))
            .then(() => handleSuccess && handleSuccess())
            .catch((error) => {
                console.log(`ERROR FETCHING for type ${type}. ${error}`);
                setState(({ loading: false, errors: `${error}` }));
            });
    }, [dispatch, type]);

    return {
        ...state,
        stream
    };
}