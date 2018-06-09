import React from "react";
import ReactDOM from "react-dom";
import Upload from "./Upload";

it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Upload />, div);
    ReactDOM.unmountComponentAtNode(div);
});

test("to get file extension", () => {
    let upload = new Upload();
    let ext = upload._getFileExtension("filename.jpg");
    expect(ext).toEqual("jpg");
    ext = upload._getFileExtension("some.filename.JPG");
    expect(ext).toEqual("jpg");
    ext = upload._getFileExtension("Filename.JPEG");
    expect(ext).toEqual("jpg");
    ext = upload._getFileExtension("some.other.filename.jpeg");
    expect(ext).toEqual("jpg");
    ext = upload._getFileExtension("some.other.filename.PNG");
    expect(ext).toEqual("png");
});
