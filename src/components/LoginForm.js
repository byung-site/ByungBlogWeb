import React from 'react';
import { Form, Icon, Input, Button, Checkbox, message} from 'antd';
// import PubSub from 'pubsub-js'

import "../static/css/LoginForm.less"
import {AjxRequest} from "../utils/AJXRequest"



message.config({
  duration: 2,
  maxCount: 1,
});

class LoginFormComp extends React.Component {

  loginCallback = (isSuccess, data) =>{
    var setFields = this.props.form.setFields;

    if(isSuccess === true){
    
      //登录成功消息发布
      // PubSub.publish('loginSuccess', data);

      //清空邮箱和密码输入
      setFields({
        password:{
          value: "",
        },
        email:{
          value: "",
        },
        });
    }else if(isSuccess === false){
      //全局错误消息提示
      message.error(data);

      //清空密码输入
      setFields({
        password:{
          value: "",
        }
        });
    }
  }

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        AjxRequest.loginRequest(values.email, values.password, this.loginCallback);
      }
    });

  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: '请输入你的邮箱!' }],
          })(
            <Input
              prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="邮箱"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入你的密码!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>记住密码</Checkbox>)}
          <a className="login-form-forgot" href="/">
            忘记密码?
          </a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const LoginForm = Form.create({ name: 'login_form' })(LoginFormComp);

export default LoginForm;