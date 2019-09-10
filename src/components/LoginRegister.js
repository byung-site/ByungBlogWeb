import React from 'react';
import {Avatar, Button, Modal,Tabs, message } from 'antd';
// import PubSub from 'pubsub-js'
// import jwt_decode from 'jwt-decode'

// import {OpCookies} from "../utils/OPCookies"
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';



const { TabPane } = Tabs;

class LoginRegister extends React.Component{
    constructor(props){
        super(props)
    
        var isLogin = this.props.isLogin;
        var loginButtonContent="登录/注册";

        if(isLogin === true){
            loginButtonContent ="退出登录";
        }

        this.state={
          visible: false,
          currentTab:"login",
          loginButtonContent: loginButtonContent,
          isLogin: this.props.isLogin,
        }

    }

    componentWillMount = () =>{
        // PubSub.subscribe('loginSuccess', this.loginSuccessCallback);
    }

    //登录成功消息回调
    loginSuccessCallback = (msg, data) =>{
        let {onLoginStateChange} = this.props;

        //存jwt token为cookie
        // OpCookies.save("token", data);

        //解析jwt token
        // const decoded = jwt_decode(data);

        //通知父组件登录成功
        // onLoginStateChange(true, decoded);

        //关闭登录窗口
        this.setState({ visible: false, isLogin: true, loginButtonContent: "退出登录" });
    }

    //tabs切换tab回调
    tabChange = key => {
        this.setState({
          currentTab: key,
        });
    }


    //点击登录/注册或退出登录按钮
    loginRegiterButtonClick = e =>{
        this.setState({
            visible: true,
        });
        if(this.state.isLogin === false){//点击登录/注册
            this.setState({
                visible: true,
            });
        }else if(this.state.isLogin === true){//点击退出登录
            let {onLoginStateChange} = this.props;

            ////删除jwt token
            // OpCookies.del("token");

            if(typeof onLoginStateChange != "undefined"){
                onLoginStateChange(false, null);
            }

            this.setState({loginButtonContent: "登录/注册录", isLogin: false });
            window.location.href="/"
        }
      }

      registerResult = (data) => {
        if(data === "ok"){
            message.success("注册成功");
            this.setState({
                currentTab: "login",
              });
        }else{
            message.error(data);
        }
      }

    //登录注册框关闭
    handleCancel = () => {
        this.setState({ visible: false});
    };

    render(){
        const {visible, currentTab} = this.state;

        return(
            <div>
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
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
                        <LoginForm loginSuccessCallback={this.loginSuccessCallback}/>
                    </TabPane>
                    <TabPane tab="注册" key="register">
                        <RegisterForm registerResult={this.registerResult}/>
                    </TabPane>
                </Tabs>
            </Modal>
            </div>
           
        )
    }
}

export default LoginRegister;

