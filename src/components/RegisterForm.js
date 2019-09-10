import React from 'react';
import {
    Form,
    Input,
    Icon,
    Checkbox,
    Button
  } from 'antd';
  import "../static/css/RegisterForm.less"
  import {AjxRequest} from "../utils/AJXRequest"

class RegistrationForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      confirmDirty: false,
    };
  }

  handleSubmit = e => {
    var setFields = this.props.form.setFields;
    var {registerResult} = this.props;

    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if(!err){
        AjxRequest.registerRequest(values.nickname, values.email, values.password, values.confirm, (isSuccess, data) => {
          if(isSuccess){
            registerResult("ok");
            //清空输入
            setFields({
              email:{
                  value: "",
              },
              password:{
              value: "",
              },
              confirm:{
                  value: "",
              },
              nickname:{
                  value: "",
              }, 
              });
          }else{
            registerResult(data);
          }
        });
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码不匹配!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          {getFieldDecorator('email', {
            rules: [
              {
                type: 'email',
                message: '无效的邮箱!',
              },
              {
                required: true,
                message: '请输入邮箱!',
              },
            ],
          })(<Input 
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="email"
            />)}
        </Form.Item>
        <Form.Item hasFeedback>
          {getFieldDecorator('password', {
            rules: [
              {
                required: true,
                message: '请输入密码!',
              },
              {
                validator: this.validateToNextPassword,
              },
            ],
          })(<Input 
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
            />)}
        </Form.Item>
        <Form.Item  hasFeedback>
          {getFieldDecorator('confirm', {
            rules: [
              {
                required: true,
                message: '请再次输入密码!',
              },
              {
                validator: this.compareToFirstPassword,
              },
            ],
          })(<Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Confirm password"
           onBlur={this.handleConfirmBlur} />)}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('nickname', {
            rules: [{ required: true, message: '请输入你的昵称!', whitespace: true }],
          })(<Input 
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="nickname"
          />)}
        </Form.Item>
       
        <Form.Item >
          {getFieldDecorator('agreement', {
            valuePropName: 'checked',
          })(
            <Checkbox>
              I have read the <a href="/">agreement</a>
            </Checkbox>,
          )}
        </Form.Item>
        <Form.Item >
          <Button type="primary" htmlType="submit" className="register-form-button">
            注册
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const RegisterForm = Form.create({ name: 'register' })(RegistrationForm);
export default RegisterForm;
