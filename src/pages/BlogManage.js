import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { List, Avatar, Icon, Select, BackTop, Button, message } from 'antd';
import {Link} from 'react-router-dom';

import '../static/css/common.css';
import DocumentTitle from '../components/DocumentTitle'
import {localParam} from "../utils/LocalParam"
import {AjxRequest} from "../utils/AJXRequest"

const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

const { Option } = Select;

export default class BlogManage extends React.Component {
    constructor(props){
        super(props);

        let param = localParam(this.props.location.search);
        if(typeof param === "undefined"){
            param = {id:0};
        }

        this.state={
            blogs: [],
            total: 0,
            pageSize: 10,
            userID: param.id,
            filter:"全部"
        };
    }

    componentWillMount(){
        let {userID} = this.state;

        AjxRequest.getArticlesByUserID(userID, data=>{
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

    deleteBlog = (id) =>{
        let {blogs} = this.state;

        blogs.forEach((item, index, blogs)=>{
            if(item.ID === id) {
                blogs.splice(index, 1);
                this.setState({
                    blogs
                });
            }
        });
    }

    handleSelectChange = (value) => {
        let {userID} = this.state;

        if(value === "all"){
            AjxRequest.getArticlesByUserID(userID, data=>{
                if(data.code === 0){
                    this.setState({
                        blogs: data.message,
                        total: data.message.length,
                        filter:"全部"
                    });
                }else{
                    message.error(data.message);
                }
            });
        }else if(value === "published"){
            AjxRequest.getPublishArticles(userID, data=>{
                if(data.code === 0){
                    this.setState({
                        blogs: data.message,
                        total: data.message.length,
                        filter:"已发布"
                    });
                }else{
                    message.error(data.message);
                }
            });
        }else if(value === "draft"){
            this.setState({
                blogs: [],
                total: 0,
                filter:"草稿"
            });
        }
    }

    render() {
        var {blogs, total, pageSize, filter} = this.state;

        return(
            <DocumentTitle title='博客管理'>
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem>管理</BreadcrumbItem>
                        <BreadcrumbItem>博客管理</BreadcrumbItem>
                        <BreadcrumbItem>{filter}</BreadcrumbItem>
                    </Breadcrumb>
                    <div >
                        <Select defaultValue="全部" style={{ marginRight: "20px", marginBottom: "20px", width: 290 }} onChange={this.handleSelectChange}>
                        <Option value="all">全部</Option>
                        <Option value="published">已发布</Option>
                        <Option value="draft">草稿</Option>
                        </Select>
                        <Button  type="primary" style={{width: 290 }} onClick={e => {
                            this.props.history.push('/edit?key=');
                        }}>编写博客</Button>
                    </div>
                    <div style={{marginTop:"20px"}}>
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
                                    <Button type="link" icon="edit" onClick={e=>{
                                        this.props.history.push("/edit?key="+item.Key);
                                    }}></Button>,
                                    <Button type="link" icon="delete" onClick={e=>{
                                        if(window.confirm("确实要删除该\"" + item.Title + "\"吗?")){
                                            AjxRequest.deleteArticle(item.Key, data=>{
                                                if(data.code === 0){
                                                    this.deleteBlog(item.ID);
                                                    message.success(data.message);
                                                }else{
                                                    message.error(data.message);
                                                }
                                            });
                                        }
                                    }}></Button>,
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