import React from 'react';
import {Breadcrumb, BreadcrumbItem} from 'reactstrap';
import { List, Avatar, Icon, BackTop,message } from 'antd';
import {Link} from 'react-router-dom';

import '../static/css/common.css';
import DocumentTitle from '../components/DocumentTitle'
import {AjxRequest} from "../utils/AJXRequest"

const IconText = ({ type, text }) => (
    <span>
      <Icon type={type} style={{ marginRight: 8 }} />
      {text}
    </span>
  );

export default class Home extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            articleArray: [],
            total: 0,
            pageSize: 10,
        };
    }

    componentWillMount(){
        AjxRequest.getArticles(data=>{
            if(data.code === 0){
                this.setState({
                    articleArray: data.message,
                    total: data.message.length,
                });
            }else{
                message.error(data.message);
            }
        });
    }

    render() {
        var {articleArray, total, pageSize} = this.state;

        return(
            <DocumentTitle title='byung'>
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem>文章</BreadcrumbItem>
                        <BreadcrumbItem>全部</BreadcrumbItem>
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
                        dataSource={articleArray}
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
                                        <font>话题：{item.Topic.Name}</font><br/>
                                        <font>作者：{item.User.Nickname}</font><br/>
                                        <font>创建：{item.CreatedAt.substring(0, 16)}</font>
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