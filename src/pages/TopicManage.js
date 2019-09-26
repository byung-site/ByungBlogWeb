import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { List, Input, Button, message, Icon, Popconfirm } from 'antd';
import {Link} from 'react-router-dom';

import DocumentTitle from '../components/DocumentTitle'
import {AjxRequest} from "../utils/AJXRequest"
import {localParam} from "../utils/LocalParam"

const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

export default class Manage extends React.Component {
    constructor(props){
        super(props);

        let param = localParam(this.props.location.search);
        if(typeof param.id === "undefined"){
            param = {id:0};
        }

        this.state={
            total: 0,
            pageSize: 10,
            topicArray:[],
            topic: {id:0, name:""},
            userId: param.id,
        };
    }

    componentWillMount(){
        this.getTopics();
    }

    callback = (key) => {
        console.log(key);
    }

    topicInputChange = (e) =>{
        var {topic} = this.state;

        topic.name = e.target.value;
        this.setState({topic});
    }


    saveTopicCallback = (data) =>{
        if(data.code === 0){
            var {topic} = this.state;

            topic.name = "";
            this.setState({topic});

            message.success(data.message)

            this.getTopics();
        }else{
            message.error(data.message)
        }
    }

    okBtnClick = (e) =>{
        var {topic, userId} = this.state;

        if(userId === 0){
            alert("用户id为0");
            return;
        }
        AjxRequest.addTopic(topic.id, userId, topic.name, this.saveTopicCallback);
    }

    getTopicsCallback = (data) =>{
        
        if(data.code === 0){
            this.setState({
                total: data.message.length,
                topicArray: data.message,
            });
        }else{
            message.error(data.message);
        }
    }

    getTopics = () =>{
        var {userId} = this.state;
        AjxRequest.getTopicsByUserID(userId, this.getTopicsCallback);
    }

    deleteTopicCallback = (data) =>{
        if(data.code === 0){
            this.getTopics();
        }else{
            message.error(data.message);
        }
    }

    render() {
        var {total, pageSize, topic, topicArray} = this.state;

        return(
            <DocumentTitle title='话题管理'>
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem>管理</BreadcrumbItem>
                        <BreadcrumbItem>话题管理</BreadcrumbItem>
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
                                        <IconText type="book" text={item.ArticleNum} key="list-vertical-star-o" />,
                                        <Button type="link" onClick={e => {
                                            var {topic} = this.state;

                                            topic.id = item.ID;
                                            topic.name = item.Name;
                                            this.setState({topic});
                                        }}>编辑</Button>,
                                        <Popconfirm
                                            title={'确定要删除"'+ item.Name +'"吗？'}
                                            onConfirm={e => {
                                                if(item.ArticleNum > 0){
                                                    alert("该话题有博客不能删除");
                                                    return;
                                                }
                                                AjxRequest.deleteTopic(item.ID, this.deleteTopicCallback);
                                            }}
                                            okText="确定"
                                            cancelText="取消"
                                        >
                                           <Button  type="link">删除</Button>
                                        </Popconfirm>,
                                    ]}
                                >
                                    <Link to={"/blogsearch?id="+item.ID+"&topic="+item.Name}>{item.Name}</Link>
                                </List.Item>
                            )}
                        />
                    </div>
                    <div style={{ marginBottom: 16, maxWidth:"600px",margin: "0 auto", marginTop:"20px"}}>
                        <Input placeholder="添加或更新话题" value={topic.name} onChange={this.topicInputChange} suffix={<Button type="primary" onClick={this.okBtnClick} style={{ width: 80 }}>确定</Button>}/>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}