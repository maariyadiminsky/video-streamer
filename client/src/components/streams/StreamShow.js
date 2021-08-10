import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import isEmpty from "lodash/isEmpty";
import flv from "flv.js";

import { getStreamSelector } from "../../redux/selectors/streams";
import { getStream } from "../../redux/actions/streams";
import { FLV_STREAM_URL, VIDEO_TYPE_FLV } from "../../const";

const videoStyles = {
    width: "100%"
}
const StreamShow = () => {
    const videoRef = useRef();
    const dispatch = useDispatch();

    const { id } = useParams();
    const stream = useSelector(({ streams }) => getStreamSelector(streams, id));

    let flvVideoPlayer;

    useEffect(() => {
        if (!stream) {
            dispatch(getStream(id))
            .then(() => !flvVideoPlayer && setupFLVPlayer(id))
            .catch((error) => console.log(error));
        } else if (id && !flvVideoPlayer) {
            setupFLVPlayer(id);
        }

        // note: tells flv player to stop streaming
        // and removes attachment to the video
        return () => flvVideoPlayer && flvVideoPlayer.destroy();
    }, [dispatch, stream])

    const setupFLVPlayer = (streamId) => {
        // create flv player
        flvVideoPlayer = flv.createPlayer({
            type: VIDEO_TYPE_FLV,
            url: FLV_STREAM_URL(streamId)
        });

        // attach video ref
        flvVideoPlayer.attachMediaElement(videoRef.current);

        // load it
        flvVideoPlayer.load();
    }

    const onHandleIt = () => {
        console.log("In onHandleIt", videoRef);
    }

    if (isEmpty(stream)) {
        return <div onClick={onHandleIt}>Loading...</div>
    }
    
    return (
        <div>
            <video 
                style={videoStyles} 
                ref={videoRef} 
                controls
            />
            <h1>{stream.title}</h1>
            <h5>{stream.description}</h5>
        </div>
    );
}

export default StreamShow;