import React from 'react';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { List, Avatar, Icon, BackTop,message } from 'antd';
import {Link} from 'react-router-dom';

import '../static/css/common.css';
import DocumentTitle from '../components/DocumentTitle'
import {AjxRequest} from "../utils/AJXRequest"
import {localParam} from "../utils/LocalParam"

const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

export default class BlogSearch extends React.Component {
    constructor(props){
        super(props);

        let param = localParam(this.props.location.search);
        if(typeof param === "undefined"){
            param = {id:"0",topic:"全部"};
        }

        this.state = {
            blogs: [],
            total: 0,
            pageSize: 10,
            topicId: param.id,
            topicName: decodeURI(param.topic)
        };
    }

    componentWillMount(){
        let {topicId} = this.state;

        if(topicId === "0"){
            AjxRequest.getArticles(data=>{
                if(data.code === 0){
                    this.setState({
                        blogs: data.message,
                        total: data.message.length,
                    });
                }else{
                    message.error(data.message);
                }
            });
        }else{
            AjxRequest.getArticlesByTopicID(topicId,data=>{
                if(data.code === 0){
                    this.setState({
                        blogs: data.message,
                        total: data.message.length
                    });
                }else{
                    message.error(data.message);
                }
            });
        }
    }

    render() {
        var {blogs, total, pageSize, topicName} = this.state;

        return(
            <DocumentTitle title='博客'>
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem><Link to={"/topic"}>话题</Link></BreadcrumbItem>
                        <BreadcrumbItem>{topicName}</BreadcrumbItem>
                    </Breadcrumb>
                    <div>
                    <List
                        style={{marginBottom:"20px"}}
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: pageSize,
                            simple:true,
                            total:total,
                            position:"bottom"
                        }}
                        dataSource={blogs}
                        renderItem={item => (
                            <List.Item
                                key={item.ID}
                                actions={[
                                <IconText type="read" text={item.Visit} key="list-vertical-star-o" />,
                                ]}
                                extra={
                                <img
                                    width={272}
                                    alt="logo"
                                    src={"/viewArticleImage/" + item.Image}
                                />
                                }
                            >
                                <List.Item.Meta
                                avatar={<Avatar src={"/viewAvatar/"+item.UserID+"/"+item.User.Avatar} />}
                                title={<Link to={"/detail?key="+item.Key}>{item.Title}</Link>}
                                description={
                                    <div>
                                        <font>作者：{item.User.Nickname}</font><br/>
                                        <font>创建：{item.CreatedAt.substring(0, 16)}</font><br/>
                                        <font>更新：{item.UpdatedAt.substring(0, 16)}</font>
                                    </div>
                                }
                                />
                                <p style={{wordWrap: "break-word"}}>{item.Summary}</p>
                            </List.Item>
                        )}
                    />
                    </div>
                    <div>
                        <BackTop>
                            <div className="ant-back-top-inner">UP</div>
                        </BackTop>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}