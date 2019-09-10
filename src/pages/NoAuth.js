import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import {Row} from "antd"

import DocumentTitle from '../components/DocumentTitle'

class NoAuthPage extends Component {
    render() {  
       
        return (
            <DocumentTitle title='权限不足'>
                <div style={{textAlign:"center", height:"300"}}>
                    <Row ><div style={{height:"100px"}}></div></Row>
                    <Row>
                        <h2 style={{color:"#1DA57A"}}>权限不足，你越界了！！</h2>
                        <Link to="/">返回首页</Link>
                    </Row>
                </div>
            </DocumentTitle>
        )
      }
}

export default NoAuthPage;