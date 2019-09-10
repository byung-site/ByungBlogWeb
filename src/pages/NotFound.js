import React from 'react';

import DocumentTitle from '../components/DocumentTitle'
import NotFoundImg from "../static/image/404.png"

export default class NotFound extends React.Component {
    render() {
        return(
            <DocumentTitle title="404">
                <div style={{textAlign:"center"}}>
                    <img alt="page not found" src={NotFoundImg}></img>
                </div>
            </DocumentTitle>
        );
    }
}