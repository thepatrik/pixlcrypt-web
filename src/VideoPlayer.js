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
        if (url) {
            let decodedUrl = window.atob(url);
            if (decodedUrl.startsWith("https://pixlcrypt-content.s3.eu-west-1.amazonaws.com/")) {
                console.log("URL:", decodedUrl);
                this.setState({url: decodedUrl});
            }
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
