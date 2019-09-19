import React, { Component } from 'react'
import { Input, Button, message } from 'antd';
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'
import jwt_decode from 'jwt-decode'

import DocumentTitle from '../components/DocumentTitle'
import {AjxRequest} from "../utils/AJXRequest"
import {OpCookies} from "../utils/OPCookies"
import {localParam} from "../utils/LocalParam"

class Edit extends Component {
    mdParser = null

    constructor(props){
        super(props);

        var user = this.loadToken();
        let param = localParam(this.props.location.search);
        if(typeof param.key === "undefined"){
            param = {key:""};
        }

        this.state={
            article:{UserID:0, TopicID:0, Key: param.key, Content:"", Title:"", Summary:"test", Image:""},
            user,
        };

        // initial a parser
        this.mdParser = new MarkdownIt({
            html: true,
            linkify: true,
            typographer: true
        })
    }

    componentDidMount(){
        var {article} = this.state;

        if(article.Key === ""){
            AjxRequest.getNewKey(data=>{
                if(data.code === 0){
                    article.Key = data.message
                    this.setState({
                        article
                    });
                }
            });
        }else{
            AjxRequest.getArticle(article.Key, data=>{
                if(data.code === 0){
                    this.setState({
                        article: data.message
                    });
                }
            });
        }
    }

    loadToken = () => {
        let token = OpCookies.get("token");
        if(token == null){
            return null;
        }
        //解析jwt token
        const decoded = jwt_decode(token);
        return decoded
      }

    handleEditorChange = ({text}) => {
        let {article} = this.state;

        article.Content = text;
        this.setState({
            article,
        });
    }

    handleImageUpload = (file, callback) => {
        var {article, user} = this.state;

        AjxRequest.uploadArticleImage(user.id, article.Key ,file, data =>{
            if(data.code === 0){
                callback("/api/viewArticleImage/"+data.message);
            }else{
                message.error(data.message);
            }
        });
    }

    titleInputChange = (e) =>{
        let {article} = this.state;

        article.Title = e.target.value;
        this.setState({
            article,
        });
    }

    saveArticle = (e) =>{
        let {article} = this.state;

        AjxRequest.saveArticle(article, data=>{
            console.log(data)
            if(data.code === 0){
                message.success(data.message);
            }else{
                message.error(data.message);
            }
        });
    }

    publishArticle = (e) =>{
        let {article} = this.state;

        AjxRequest.publishArticle(article, data=>{
            console.log(data)
            if(data.code === 0){
                message.success(data.message);
                this.props.history.push("/detail?key="+article.Key+"&title="+article.Title);
            }else{
                message.error(data.message);
            }
        });
    }

    render() {  
       let {article} = this.state;

        return (
            <DocumentTitle title='编辑'>
                <div>
                    <div>
                        <div style={{textAlign:"center", marginTop:"20px"}}>
                            <Input style={{maxWidth:"400px", marginBottom:"20px"}}
                                onChange={this.titleInputChange}
                                value={article.Title}
                                placeholder="请输入标题"
                            />
                        </div>
                        <div style={{height: "500px"}}>
                            <MdEditor
                            config={{
                                view: {
                                  menu: true,
                                  md: true,
                                  html: false
                                }
                            }}
                            value={article.Content}
                            renderHTML={(text) => this.mdParser.render(text)}
                            onChange={this.handleEditorChange} 
                            onImageUpload={this.handleImageUpload}
                            />                
                        </div>
                    </div>
                    <div style={{textAlign:"right", marginTop:"20px", marginBottom:"20px"}}>
                        <Button type="link">使用说明</Button>
                        <Button type="primary" style={{marginRight:"10px"}} onClick={this.saveArticle}>存稿</Button>
                        <Button type="primary" onClick={this.publishArticle}>发布</Button>
                    </div>
                </div>
            </DocumentTitle>
        )
      }
}

export default Edit;