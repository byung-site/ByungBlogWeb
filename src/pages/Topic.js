import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { List, message, Icon } from 'antd';
import {Link} from 'react-router-dom';

import "../static/css/topic.css"
import DocumentTitle from '../components/DocumentTitle'
import {AjxRequest} from "../utils/AJXRequest"

  const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

export default class Topic extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            topicArray:[],
            pageSize:10,
            total:0
        };
    }

    componentWillMount(){
        AjxRequest.getTopics(data=>{
            if(data.code === 0){
                this.setState({
                    topicArray:data.message,
                    total:data.message.length
                });
            }else{
                message.error(data.message);
            }
        });
    }

    render() {
        var {total, pageSize, topicArray} = this.state;

        return(
            <DocumentTitle title='话题'>
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem>话题</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="topic-list">
                    <List
                            bordered
                            itemLayout="vertical"
                            size="large"
                            dataSource={topicArray}
                            pagination={{
                                onChange: page => {
                                    console.log(page);
                                },
                                pageSize: pageSize,
                                simple:true,
                                total:total,
                                position:"bottom"
                            }}
                            renderItem={item => (
                                <List.Item
                                    actions={[
                                        <IconText type="book" text={item.ArticleNum} key="list-vertical-star-o" />
                                    ]}
                                >
                                    <Link to={"/?id="+item.ID}>{item.Name}</Link>
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}