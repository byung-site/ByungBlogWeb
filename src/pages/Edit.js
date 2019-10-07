
import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Input, Button, message, Select, Upload, Icon } from 'antd';
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'
import jwt_decode from 'jwt-decode'
import hljs  from 'highlight.js'
import {Link} from 'react-router-dom';
import 'highlight.js/styles/github.css';

import DocumentTitle from '../components/DocumentTitle'
import {AjxRequest} from "../utils/AJXRequest"
import {OpCookies} from "../utils/OPCookies"
import {localParam} from "../utils/LocalParam"

const { Option } = Select;

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
            article:{UserID:user.id, TopicID:0, Key: param.key, Content:"", Title:"", Summary:"", Image:""},
            topics:[],
            user,
            defaultTopic: "话题选择"
        };

        // initial a parser
        this.mdParser = new MarkdownIt({
            html: false,
            linkify: true,
            typographer: true,
            highlight: function (str, lang) {
                if (lang && hljs.getLanguage(lang)) {
                  try {
                    return hljs.highlight(lang, str).value;
                  } catch (__) {}
                }
            
                return ''; // 使用额外的默认转义
              }
        })
    }

    componentWillMount(){
        var {article, user} = this.state;

        //得到本用户所有话题
        AjxRequest.getTopicsByUserID(user.id, data=>{
            if(data.code === 0){
                this.setState({
                    topics: data.message
                });
            }else{
                message.error(data.message);
            }
        });

        //读取文章或获取key
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
                let {topics, defaultTopic} = this.state;

                if(data.code === 0){
                    for(var i=0;i<topics.length;i++){
                        if(topics[i].ID === data.message.TopicID){
                            defaultTopic=topics[i].Name;
                        }
                    }
                    this.setState({
                        article: data.message,
                        defaultTopic: defaultTopic,
                    });
                }
            });
        }
    }

    getSummary = (markdownString) => {
        var htmlStr = this.mdParser.render(markdownString);
        var dd=htmlStr.replace(/<\/?.+?>/g,"");
        var dds=dd.replace(/ /g," ");//剔除空格
        var summary = dds.replace(/[\r\n]/g,"").substring(0, 400) + "...";//剔除换行符和截取前200字符
        
        return summary;
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
                callback("/viewArticleImage/"+data.message);
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

    topicChange = (value) =>{
        let {article} = this.state;

        article.TopicID = value;
        this.setState({
            article,
        });
    }

    uploadAttach = (info) =>{
        let {article} = this.state;

        if (info.file.status !== 'uploading') {
            if(info.file.response.code === 0){
                article.Image = info.file.response.message;
                this.setState({
                    article,
                });
                message.success(`${info.file.name} 上传成功`);
            }else{
                message.error(`${info.file.name} 上传失败`);
            }
        }
    }


    saveArticle = (e) =>{
        let {article} = this.state;

        article.Summary = this.getSummary(article.Content)
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

        article.Summary = this.getSummary(article.Content)
        AjxRequest.publishArticle(article, data=>{
            if(data.code === 0){
                message.success(data.message);
                this.props.history.push("/detail?key="+article.Key);
            }else{
                message.error(data.message);
            }
        });
    }


    render() {  
       let {article, topics, user, defaultTopic} = this.state;
     
        return (
            <DocumentTitle title='编辑'>
                <div>
                    <Breadcrumb>
                        <BreadcrumbItem>管理</BreadcrumbItem>
                        <BreadcrumbItem><Link to={"/articlemanage?id="+user.id}>文章管理</Link></BreadcrumbItem>
                        <BreadcrumbItem>编辑</BreadcrumbItem>
                    </Breadcrumb>
                    <div>
                        <div style={{textAlign:"center", marginTop:"20px"}}>
                            <Select 
                            placeholder={defaultTopic}
                            maxTagCount={10}
                            maxTagTextLength={10}
                            onChange={this.topicChange}
                            style={{ width: "280px",marginRight:"20px", marginBottom:"20px" }} >
                                {
                                    topics.map(item=>{
                                        return <Option key={item.ID} value={item.ID}>{item.Name}</Option>
                                    })
                                }
                            </Select>
                            <Input style={{ width:"280px", marginRight:"20px", marginBottom:"20px"}}
                                onChange={this.titleInputChange}
                                value={article.Title}
                                placeholder="请输入标题"
                            />
                        </div>
                        <div style={{height: "500px", minWidth:"280px"}}>
                            <MdEditor
                            config={{
                                view: {
                                  menu: true,
                                  md: true,
                                  html: true
                                },
                            }}
                            value={article.Content}
                            renderHTML={(text) => this.mdParser.render(text)}
                            onChange={this.handleEditorChange} 
                            onImageUpload={this.handleImageUpload}
                            />                
                        </div>
                    </div>
                    <div style={{textAlign:"right", marginTop:"20px", marginBottom:"20px"}}>
                        <Button type="primary" style={{marginRight:"10px"}} onClick={this.saveArticle}>存稿</Button>
                        <Button type="primary" onClick={this.publishArticle} style={{marginRight:"10px"}}>发布</Button>
                        <Upload
                            name = 'file'
                            action = {'/api/uploadArticleAttachImage/'+user.id+"/"+article.Key}
                            headers = {
                                {authorization:'authorization-text'}
                            }
                            onChange={this.uploadAttach}
                        >
                            <Button>
                            <Icon type="upload" /> 附件上传
                            </Button>
                        </Upload>
                    </div>
                </div>
            </DocumentTitle>
        )
      }
}

export default Edit;