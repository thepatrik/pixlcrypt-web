import React, { Component } from "react";
import loadingImage from "./images/loading.svg";
import "./Progress.css";

class Progress extends Component {

    render() {
        return (
            <div id="loading">
                <img src={loadingImage} alt="loading"/>
            </div>
        );
    }
}

export default Progress;
