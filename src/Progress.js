import {Spinner} from "spin.js";
import React, {Component} from "react";
import "./Progress.css";

export default class Progress extends Component {

    componentDidMount() {
        const opts = {
            lines: 12,
            length: 20,
            width: 10,
            radius: 18,
            corners: 1
        };

        this.spinner = new Spinner(opts);
        this.spinner.spin(this.refs.container);
    }

    componentWillUnmount() {
        this.spinner.stop();
    }

    render() {
        return <span ref="container"/>;
    }
}
