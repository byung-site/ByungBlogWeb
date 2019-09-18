import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { List, Avatar, Icon, Select, BackTop, Button } from 'antd';

import '../static/css/common.css';
import DocumentTitle from '../components/DocumentTitle'

const listData = [];
for (let i = 0; i < 23; i++) {
  listData.push({
    href: 'http://ant.design',
    title: `ant design part ${i}`,
    avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    description:
      'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    content:
      'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
  });
}

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

        this.state={
            blogs: listData,
            total: 0,
            pageSize: 10
        };
    }

    callback = (key) => {
        console.log(key);
    }

    handleChange = (value) => {
        console.log(`selected ${value}`);
      }

    render() {
        var {blogs, total, pageSize} = this.state;

        return(
            <DocumentTitle title='博客管理'>
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem>管理</BreadcrumbItem>
                        <BreadcrumbItem>博客管理</BreadcrumbItem>
                    </Breadcrumb>
                    <div >
                        <Select defaultValue="全部" style={{ marginRight: "20px", marginBottom: "20px", width: 290 }} onChange={this.handleChange}>
                        <Option value="all">全部</Option>
                        <Option value="published">已发布</Option>
                        <Option value="draft">草稿</Option>
                        </Select>
                        <Button  type="primary" style={{width: 290 }} onClick={e => {
                            this.props.history.push('/edit?id=0')
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
                                    key={item.title}
                                    actions={[
                                    <IconText type="star-o" text="156" key="list-vertical-star-o" />,
                                    <IconText type="like-o" text="156" key="list-vertical-like-o" />,
                                    <IconText type="message" text="2" key="list-vertical-message" />,
                                    ]}
                                    extra={
                                    <img
                                        width={272}
                                        alt="logo"
                                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                                    />
                                    }
                                >
                                    <List.Item.Meta
                                    avatar={<Avatar src={item.avatar} />}
                                    title={<a href={item.href}>{item.title}</a>}
                                    description={item.description}
                                    />
                                    {item.content}
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