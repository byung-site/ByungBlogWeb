import React from 'react';

import {localParam} from "../utils/LocalParam"

import DocumentTitle from '../components/DocumentTitle'

export default class Detail extends React.Component {
    constructor(props){
        super(props);

        let param = localParam(this.props.location.search);
        if(typeof param.key == "undefined" || typeof param.title == "undefined"){
            param = {key:"",title:""};
        }

        this.state={
            title: param.title,
        };
    }

    render() {
        let {title} = this.state;

        return(
            <DocumentTitle title={title}>
                <div>
                    default
                </div>
            </DocumentTitle>
        );
    }
}