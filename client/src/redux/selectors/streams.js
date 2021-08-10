export const getStreamSelector = (streams, id) => id && streams[id];
export const getStreamsSelector = ({ streams }) => Object.values(streams);