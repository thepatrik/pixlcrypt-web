import React, { Component } from "react";
import Dropzone from "react-dropzone";
import Req from "./utilities/req";
import Auth from "./utilities/auth";
import axios from "axios";
import async from "async";
import { Line } from "rc-progress";
import { Notification } from "react-notification";

const CONCURRENCY_LIMIT = 8;

class Upload extends Component {

    constructor(props) {
        super(props);
        this.progress = {
            done: 0,
            total: 0
        };
        this.state = {
            selectedFile: "",
            isNoticationActive: false,
            message: "",
            percent: 0
        };
        this.auth = new Auth();
    }

    _tick(reset) {
        this.progress.done = reset ? 0 : this.progress.done + 1;
        const percent = (this.progress.done / this.progress.total) * 100;
        this.setState({percent: percent});
    }

    render() {
        return (
            <div>
                <div style={{margin: "1rem 1rem 0.5rem 1rem"}}>
                    <Line percent={this.state.percent} strokeWidth="1" trailWidth="1" strokeColor="#f600ff" strokeLinecap="round"/>
                </div>
                <div style={{margin: "1rem"}}>
                    <Dropzone accept="image/jpeg, image/png, image/gif, image/bmp, image/tiff" onDrop={this.onDrop.bind(this)}>
                        <p style={{margin: "0.5rem"}}>Drop your files here or click to select.</p>
                        <br/>
                        <p style={{margin: "0.5rem", color: "grey"}}>Only image files (jpeg, png, gif, bmp, tiff) are accepted.</p>
                    </Dropzone>
                </div>
                <Notification
                    title={"File uploads"}
                    isActive={this.state.isNoticationActive}
                    message={this.state.message}
                    dismissAfter={3000}
                />
            </div>
        );
    }

    onDrop(files) {
        const req = new Req();
        this.setState({
            isNoticationActive: true,
            message: "Uploading " + files.length + " " + (files.length === 1 ? "file" : "files") + "..."
        });
        this.progress.total = files.length;
        this._tick(true);
        async.mapLimit(files, CONCURRENCY_LIMIT, (file, done) => {
            const url = this._getFilePath(file.name);
            const presignUrl = "https://api.pixlcrypt.com/presign?url=" + url + "&operation=putObject";

            req.get(presignUrl).then(res => {
                const presigned = res.data.presigned;
                axios.put(presigned, file).then(res => {
                    console.log("File successfully uploaded!", res);
                    this._tick();
                    done();
                }).catch(err => {
                    console.log(err);
                    this._tick();
                    done();
                });
            }).catch(err => {
                console.log(err);
                this._tick();
                done();
            });
        }, () => {
            this.setState({
                message: "Done"
            });
        });
    }

    _yyyymmdd() {
        const date = new Date();
        const mm = date.getMonth() + 1; // getMonth() is zero-based
        const dd = date.getDate();

        return [date.getFullYear(), (mm > 9 ? "" : "0") + mm, (dd > 9 ? "" : "0") + dd].join("");
    }

    _getFilePath(filename) {
        const prefix = "https://s3-eu-west-1.amazonaws.com/pixlcrypt-content/users/";
        const email = this.auth.getEmail();
        const time = this._yyyymmdd();
        const lastDotIx = filename.lastIndexOf(".");
        const ext = this._getFileExtension(filename.slice(lastDotIx));
        const newFilename = filename.slice(0, lastDotIx) + "_o." + ext;
        return prefix + email + "/src/" + time + "/" + newFilename;
    }

    _getFileExtension(filename) {
        let ext = filename.split(".").pop().toLowerCase();
        if (ext === "jpeg") {
            return "jpg";
        }
        return ext;
    }
}

export default Upload;
