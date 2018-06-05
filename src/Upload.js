import React, { Component } from "react";
import Dropzone from "react-dropzone";
import Req from "./utilities/req";
import Auth from "./utilities/auth";
import axios from "axios";

class Upload extends Component {

    constructor(props) {
        super(props);
        this.state = {selectedFile: ""};
        this.auth = new Auth();
    }

    render() {
        return (
            <div style={{margin: "2rem"}}>
                <Dropzone accept="image/jpeg, image/png" onDrop={this.onDrop.bind(this)}>
                    <p style={{margin: "0.5rem"}}>Drop your files here or click to select one.</p>
                    <br/>
                    <p style={{margin: "0.5rem"}}>Only *.jpeg and *.png images will be accepted</p>
                </Dropzone>
            </div>
        );
    }

    onDrop(files) {
        const req = new Req();
        const file = files[0];
        const url = this._getFilePath(file.name);
        const presignUrl = "https://api.pixlcrypt.com/presign?url=" + url + "&operation=putObject";

        req.get(presignUrl).then(res => {
            const presigned = res.data.presigned;
            axios.put(presigned, file).then(res => {
                console.log("File successfully uploaded!", res);
            }).catch(err => {
                console.log(err);
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
        const prefix = "https://s3-eu-west-1.amazonaws.com/pixlcrypt-content/users/src/";
        const email = this.auth.getEmail();
        const time = this._yyyymmdd();
        const fSplit = filename.split(".");
        const newFilename = fSplit[fSplit.length-2] + "_o." + fSplit[fSplit.length-1];
        return prefix + email + "/" + time + "/" + newFilename;
    }
}

export default Upload;
