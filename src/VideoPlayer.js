import "../node_modules/video-react/dist/video-react.css";
import React, { Component } from "react";
import { Player, BigPlayButton, LoadingSpinner } from "video-react";
import Utils from "./utilities/utils.js";

class VideoPlayer extends Component {

    constructor(props) {
        super(props);
        this.state = {url: "https://media.w3.org/2010/05/sintel/trailer_hd.mp4"};
    }

    componentWillMount() {
        let url = Utils.getParameterByName("url");
        if (url && url.startsWith("https://pixlcrypt-content.s3.eu-west-1.amazonaws.com/")) {
            this.setState({url: url});
        }
    }

    render() {
        let url = this.state.url;
        return (
            <Player
                playsInline
                autoPlay
                src={url}>
                <BigPlayButton position="center" />
                <LoadingSpinner />
            </Player>
        );
    }
}

export default VideoPlayer;
