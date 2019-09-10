import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { List, Typography } from 'antd';

import DocumentTitle from '../components/DocumentTitle'

const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];


export default class Manage extends React.Component {
    constructor(props){
        super(props);

        this.state={
            total: 0,
            pageSize: 10
        };
    }

    callback = (key) => {
        console.log(key);
    }

    render() {
        var {total, pageSize} = this.state;

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
                            dataSource={data}
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
                                <List.Item>
                                <Typography.Text mark>[ITEM]</Typography.Text> {item}
                                </List.Item>
                            )}
                        />
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}