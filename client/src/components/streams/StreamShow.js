import { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import flv from "flv.js";

import { useFetchStream } from "../../hooks/useFetchStream";
import { FLV_STREAM_URL, VIDEO_TYPE_FLV } from "../../const";

const videoStyles = {
    width: "100%"
}
const StreamShow = () => {
    const videoRef = useRef();
    const { id } = useParams();

    const handleFetchStreamSuccess = (stream) => {
        stream && setupFLVPlayer(stream.id)
    };

    const options = { handleSuccess: handleFetchStreamSuccess };
    const { loading, errors, stream } = useFetchStream(id, options);

    let flvVideoPlayer;
    useEffect(() => {
        if (stream && videoRef.current && !flvVideoPlayer) {
            setupFLVPlayer(id);
        }

        // note: tells flv player to stop streaming
        // and removes attachment to the video
        return () => flvVideoPlayer && flvVideoPlayer.destroy();
    }, [stream])

    const setupFLVPlayer = (streamId) => {
        if (!videoRef.current) return;

        flvVideoPlayer = flv.createPlayer({
            type: VIDEO_TYPE_FLV,
            url: FLV_STREAM_URL(streamId)
        });

        // attach video ref
        flvVideoPlayer.attachMediaElement(videoRef.current);

        // load it
        flvVideoPlayer.load();
    }

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