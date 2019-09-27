// import React from 'react';
// import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

// import DocumentTitle from '../components/DocumentTitle'

// export default class Personal extends React.Component {
//     render() {
//         return(
//             <DocumentTitle title='个人中心'>
//                 <div>
//                     <Breadcrumb>
//                         <BreadcrumbItem>个人中心</BreadcrumbItem>
//                     </Breadcrumb>
//                 </div>
//             </DocumentTitle>
//         );
//     }
// }

import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import {Card, Input, Icon, Button, Upload, message, Avatar } from 'antd';
import jwt_decode from 'jwt-decode'

import DocumentTitle from '../components/DocumentTitle'
import {OpCookies} from "../utils/OPCookies"
import {AjxRequest} from "../utils/AJXRequest"


class Personal extends React.Component{
  constructor(props){
    super(props);

    //存jwt token为cookie
    const token = OpCookies.get("token");

    //解析jwt token
    const decoded = jwt_decode(token);
    var avatarUrl = "/viewAvatar/" + decoded.id + "/" + decoded.avatar;

    this.state = {
      user: decoded,
      avatarUrl,
      newNickname:"",
      newEmail:"",
      oldPassword:"",
      newPassword:"",
      confirmPassword:"",
    };
  }

  //改昵称回调
  handleChangeNicknameCallback = (data) =>{
    if(data.code === 0){
        //存jwt token为cookie
        OpCookies.save("token", data.message);

        const decoded = jwt_decode(data.message);

        this.setState({
          newNickname:"",
          user:decoded,
        });

        message.success("更改昵称成功");
    }else{
      message.error(data.message);
    }
  }

  //改昵称按钮事件处理
  handleChangeNickname = (e) => {
    var {newNickname, user} = this.state;

    if(newNickname === ""){
      alert("昵称不能为空!");
      return;
    }

    AjxRequest.changeNickname(user.id, newNickname, this.handleChangeNicknameCallback);
  }

  //改昵称输入框处理
  handleNicknameInputChange = (e) => {
    this.setState({
      newNickname: e.target.value,
    });
  }

  //改邮箱回调
  handleChangeEmailCallback = (data) => {
    if(data.code === 0){
      //存jwt token为cookie
      OpCookies.save("token", data.message);

      const decoded = jwt_decode(data.message);

      this.setState({
        newEmail:"",
        user:decoded,
      });

      message.success("更改邮箱成功");
  }else{
        message.error(data.message);
    }
  }

  //改邮箱输入框改变处理
  handleEmailInputChange = (e) => {
    this.setState({
      newEmail: e.target.value,
    });
  }

  //改邮箱按钮事件处理
  handleChangeEmail = (e) =>{
    var {newEmail, user} = this.state;

    if(newEmail === ""){
      alert("邮箱不能为空!");
      return;
    }

    AjxRequest.changeEmail(user.id, newEmail, this.handleChangeEmailCallback);
  }

  handleChangePassCallback = (data) =>{
    if(data.code === 0){
      this.setState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      message.success(data.message);
    }else{
      message.error(data.message);
    }
  }

  //老密码输入框改变
  handleOldPassInputChange = (e) => {
    this.setState({
      oldPassword: e.target.value,
    });
  }

  //新密码输入框改变
  handleNewPassInputChange = (e) => {
    this.setState({
      newPassword: e.target.value,
    });
  }
      //确认新密码输入框改变
  handleConfirmPassInputChange = (e) => {
    this.setState({
      confirmPassword: e.target.value,
    });
  }

  //改密按钮事件处理
  handleChangePass = (e) => {
    var {confirmPassword, newPassword, oldPassword, user} = this.state;

    if(oldPassword === ""){
      alert("老密码输入不能为空");
      return;
    }
    if(newPassword === ""){
      alert("新密码输入不能为空");
      return;
    }
    if(confirmPassword === ""){
      alert("密码验证输入不能为空");
      return;
    }

    AjxRequest.changePassword(user.id, oldPassword, newPassword, confirmPassword, this.handleChangePassCallback);
  }

  render(){
      var {user,
          avatarUrl, 
          newNickname,
          newEmail,
          oldPassword,
          newPassword,
          confirmPassword
      } = this.state;

      //改头像
      var _this = this;
      const props = {
        name: 'file',
        action:  "/api/changeAvatar/"+user.id,
        headers: {
          authorization: 'authorization-text',
        },
        onChange(info) {
          if (info.file.status !== 'uploading') {
           
          }
          if (info.file.status === 'done') {
            console.log(info.file.response);
            if(info.file.response.code === 0){
              //存jwt token为cookie
              OpCookies.save("token", info.file.response.message);

              const decoded = jwt_decode(info.file.response.message);
              var avatarUrl = "/viewAvatar/" + decoded.id + "/" + decoded.avatar;

              _this.setState({
                user:decoded,
                avatarUrl,
              });
              window.location.reload();
            }else{
                message.error(`${info.file.name} ${info.file.response.message}`)
            }
          } else if (info.file.status === 'error') {
            message.error(`${info.file.name} 上传失败`);
          }
        },
      };

      return (
        <DocumentTitle title='个人中心'>
          <div>
            <div>
                <Breadcrumb>
                    <BreadcrumbItem>个人中心</BreadcrumbItem>
                </Breadcrumb>
            </div>
            <Card title="个人信息"  style = {{margin:"0 auto", width:300}}>
              <div style = {{margin:"0 auto", width:100}}>
                <Upload
                  {...props}
                >
                  <Avatar size={90} shape="square" src={avatarUrl}></Avatar>
                  <Button style={{width:"90px", height:"90px", marginTop:"10px"}} icon="upload" onClick={this.handleChangeAvatar}></Button>
                </Upload>
              </div>
              
              <p style={{marginTop:"20px"}}>昵称：{user.nickname}</p>
              <p>邮箱：{user.email}</p>
              <hr/>

              <Input
                style = {{minWidth:260, width:260}}
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入新昵称"
                onChange = {this.handleNicknameInputChange}
                value = {newNickname}
              /><br/>
              <Button type="primary" onClick={this.handleChangeNickname} style = {{minWidth:260, width:260, marginTop:"15px"}}>确定改昵称</Button>
              <hr/>

              <Input
                style = {{minWidth:260, width:260, marginTop:"15px"}}
                prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="请输入新邮箱"
                onChange={this.handleEmailInputChange}
                value={newEmail}
              /><br/>
              <Button type="primary" onClick={this.handleChangeEmail} style = {{minWidth:260, width:260, marginTop:"20px"}}>确定改邮箱</Button>
              <hr/>

              <Input
                style = {{minWidth:260, width:260, marginTop:"15px"}}
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="请输入老密码"
                onChange={this.handleOldPassInputChange}
                value={oldPassword}
              /><br/>
              <Input
                style = {{minWidth:260, width:260, marginTop:"15px"}}
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="请输入新密码"
                onChange={this.handleNewPassInputChange}
                value={newPassword}
              /><br/>
               <Input
                style = {{minWidth:260, width:260, marginTop:"15px"}}
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="请再次输入新密码"
                onChange={this.handleConfirmPassInputChange}
                value={confirmPassword}
              /><br/>
              <Button type="primary" onClick={this.handleChangePass} style = {{minWidth:260, width:260, marginTop:"20px"}}>确定改密</Button>
            </Card>
          </div>
        </DocumentTitle>
      )
  }
};

export default Personal;