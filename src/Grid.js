import React, { Component } from "react";
import Req from "./utilities/req";
import Gallery from "react-grid-gallery";
import Utils from "./utilities/utils.js";
import Progress from "./Progress";

class Grid extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isSignedIn: props.isSignedIn,
            showProgress: false
        };
    }

    componentWillMount() {
        const isSignedIn = this.state.isSignedIn;
        if (isSignedIn) {
            this.setState({showProgress: true});
            this.fetchData();
        } else {
            let data = Utils.getDefaultPhotos();
            this.setState({data: data});
        }
    }

    fetchData() {
        let req = new Req();
        let params = {
            "query": `{
                allItems (first: 30, orderBy: CREATED_AT_DESC) {
                  edges {
                    node {
                      id
                      src
                      caption
                      description
                      itemTagsByItemId {
                        edges {
                          node {
                            tagByTagId {
                              key
                              val
                            }
                          }
                        }
                      }
                      thumbsByItemId {
                        edges {
                          node {
                            src
                            height
                            width
                          }
                        }
                      }
                    }
                  }
                }
              }`
        };
        req.post("https://api.pixlcrypt.com/graphql", params).then(res => {
            if (res.data) {
                let data = Utils.graphQlToObj(res.data.data.allItems);

                this.setState({
                    data: data,
                    showProgress: false
                });
            }
        }).catch(err => {
            console.log("Could not make request", err);
        });
    }

    render() {
        return (
            <div>
                {this.state.showProgress ? <Progress/> : null}
                <Gallery images={this.state.data} enableImageSelection={false}/>
            </div>
        );
    }
}

export default Grid;
