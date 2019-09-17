import React from 'react';
import {Avatar, Button, Modal,Tabs } from 'antd';
// import PubSub from 'pubsub-js'
import jwt_decode from 'jwt-decode'

import {OpCookies} from "../utils/OPCookies"
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';



const { TabPane } = Tabs;

class LoginRegister extends React.Component{
    constructor(props){
        super(props)
    
        let {isLogin, user} = this.props;

        var loginButtonContent="登录/注册";
        let avatarUrl = "";

        if(isLogin === true){
            loginButtonContent="退出登录";
            avatarUrl = "/api/viewAvatar/"+user.id+"/"+user.avatar
        }

        this.state={
          visible: false,
          currentTab:"login",
          loginButtonContent: loginButtonContent,
          isLogin: isLogin,
          avatarUrl: avatarUrl
        }

    }

    //登录成功消息回调
    loginSuccess = (msg) =>{
        let {loginStateChange} = this.props;

        //存jwt token为cookie
        OpCookies.save("token", msg);
        //解析jwt token
        const decoded = jwt_decode(msg);
        let avatarUrl = "/api/viewAvatar/"+decoded.id+"/"+decoded.avatar

        //通知父组件登录成功
        loginStateChange("login", decoded);

        //关闭登录窗口
        this.setState({ avatarUrl: avatarUrl, visible: false, isLogin: true, loginButtonContent: "退出登录" });
    }

    //tabs切换tab回调
    tabChange = key => {
        this.setState({
          currentTab: key,
        });
    }


    //点击登录/注册或退出登录按钮
    loginRegiterButtonClick = e =>{
        if(this.state.isLogin === false){//点击登录/注册
            this.setState({
                visible: true,
            });
        }else if(this.state.isLogin === true){//点击退出登录
            let {loginStateChange} = this.props;

            ////删除jwt token
            OpCookies.del("token");

            if(typeof loginStateChange != "undefined"){
                loginStateChange("logout", null);
            }

            this.setState({loginButtonContent: "登录/注册录", isLogin: false });
        }
      }

      registerSuccess = () => {
        this.setState({
            currentTab: "login",
        });
      }

    //登录注册框关闭
    handleCancel = () => {
        this.setState({ visible: false});
    };

    render(){
        const {visible, currentTab, avatarUrl} = this.state;

        return(
            <div>
                <Avatar src={avatarUrl} />
                <Button type="link" onClick={this.loginRegiterButtonClick}>{this.state.loginButtonContent}</Button>
                <Modal
                visible={visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                footer={[]}
                width="300px"
                >
                <Tabs activeKey={currentTab} onChange={this.tabChange}>
                    <TabPane tab="登录" key="login">
                        <LoginForm loginSuccess={this.loginSuccess}/>
                    </TabPane>
                    <TabPane tab="注册" key="register">
                        <RegisterForm registerSuccess={this.registerSuccess}/>
                    </TabPane>
                </Tabs>
            </Modal>
            </div>
           
        )
    }
}

export default LoginRegister;

