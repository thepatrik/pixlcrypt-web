import React, { Component } from 'react';
import Req from './utilities/req';
import Gallery from 'react-grid-gallery';
import Utils from './utilities/utils.js';

class Grid extends Component {

    constructor(props) {
        super(props);
        this.state = {data: Utils.getDefaultPhotos(), isSignedIn: props.isSignedIn};
    }

    componentWillMount() {
        const isSignedIn = this.state.isSignedIn;
        if (isSignedIn) {
            this.fetchData();
        }
    }

    fetchData() {
        let req = new Req();
        let params = {
            "query": `{
                allItems (first: 30) {
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
                this.setState({data: data});
            }
        }).catch(err => {
            console.log("Could not make request", err);
        });
    }

    render() {
        let data = this.state.data;
        return (
            <Gallery images={data} enableImageSelection={false}/>
        );
    }
}

export default Grid;
