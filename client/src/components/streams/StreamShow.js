import { useEffect, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import flv from "flv.js";

import { useFetchStream } from "../../hooks/useFetchStream";
import { FLV_STREAM_URL, VIDEO_TYPE_FLV } from "../../const";

const videoStyles = {
    width: "100%"
}
const StreamShow = () => {
    const handleFetchStreamSuccess = (stream) => {
        stream && setupFLVPlayer(stream.id)
    };

    const { id } = useParams();
    const options = { handleSuccess: handleFetchStreamSuccess };
    const { loading, errors, stream } = useFetchStream(id, options);

    const videoRef = useRef();
    const flvVideoPlayer = useRef();
    const setupFLVPlayer = useCallback(() => (streamId) => {
        // exit if videoRef is undefined or flvVideoPlayer already exists
        if (!videoRef.current || (flvVideoPlayer && flvVideoPlayer.current)) return;

        flvVideoPlayer.current = flv.createPlayer({
            type: VIDEO_TYPE_FLV,
            url: FLV_STREAM_URL(streamId)
        });

        // attach video ref
        flvVideoPlayer.attachMediaElement(videoRef.current);

        // load it
        flvVideoPlayer.load();
    }, [videoRef]);
    
    useEffect(() => {
        if (stream) {
            setupFLVPlayer(id);
        }

        // note: tells flv player to stop streaming
        // and removes attachment to the video
        return () => flvVideoPlayer && flvVideoPlayer.destroy();
    }, [stream, id, setupFLVPlayer])

    const renderErrors = () => errors && (
        <div className="ui error tiny message">{errors}</div>
    );
    
    if (loading) {
        return <div>Loading...</div>
    }
    
    return (
        <div>
            <video 
                style={videoStyles} 
                ref={videoRef} 
                controls
            />
            {renderErrors()}
            <h1>{stream.title}</h1>
            <h5>{stream.description}</h5>
        </div>
    );
}

export default StreamShow;