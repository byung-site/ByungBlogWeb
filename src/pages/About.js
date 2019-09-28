import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Steps, Card, Col, Row, Alert } from 'antd';

import DocumentTitle from '../components/DocumentTitle'
import QQ from "../static/image/qq.jpg"
import WeChat from "../static/image/wechat.png"
import "../static/css/About.css"


const { Step } = Steps;

export default class About extends React.Component {
    render() {
        return(
            <DocumentTitle title='关于站主'>
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem>关于站主</BreadcrumbItem>
                    </Breadcrumb>

                 
                    <div style={{minWidth:300, maxWidth:500, margin:"0 auto"}}>
                        <Card title="博主时间轴">
                            <Steps direction="vertical" size="small" current={2}>
                                <Step title="成都大学(2015.9-2019.6)" description="博主所学专业为计算机科学与技术" />
                                <Step title="实习-安恒信息(2018.8-2019.6)" description="实习期间做了个简易的远程的图形界面环境，用于公司的产品。
                                该项目没用图形库,界面是通过像素点绘出来的，鼠标键盘时件也是自己处理的，这么做的目的是减少资源消耗同时渲染层还要是RDP协议。" />
                                <Step title="正式-安恒信息(2019.7-至今)" description="负责堡垒机后端RDP和VNC协议的开发和维护。工作中会用到c语言和go语言。" />
                            </Steps>
                        </Card>

                        <Row gutter={16} style={{marginTop:"20px"}}>
                            <Col span={12}>
                                <Card title="QQ" bordered={false}>
                                    <img alt="qq" src={QQ} style={{width:128, height:128}}></img>
                                </Card>
                            </Col>
                            <Col span={12}>
                                <Card title="微信" bordered={false}>
                                    <img alt="qq" src={WeChat} style={{width:128, height:128}}></img>
                                </Card>
                            </Col>
                        </Row>
                        <Alert message="加好友请发送备注，否则会被拒绝" type="success" style={{marginBottom:20}}/>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}