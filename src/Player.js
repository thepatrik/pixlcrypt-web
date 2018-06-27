import "../node_modules/video-react/dist/video-react.css";
import React from "react";
import { Player, BigPlayButton, LoadingSpinner } from "video-react";

export default () => {
    return (
        <Player
            playsInline
            autoPlay
            src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4">
            <BigPlayButton position="center" />
            <LoadingSpinner />
        </Player>
    );
};
