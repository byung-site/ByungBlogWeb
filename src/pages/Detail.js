import React from 'react';
import MarkdownIt from 'markdown-it'
import {Button} from "antd"
import hljs  from 'highlight.js'
import 'highlight.js/styles/github.css';

import DocumentTitle from '../components/DocumentTitle'
import {localParam} from "../utils/LocalParam"
import {AjxRequest} from "../utils/AJXRequest"

export default class Detail extends React.Component {
    mdParser = null

    constructor(props){
        super(props);

        let param = localParam(this.props.location.search);
        if(typeof param.key == "undefined"){
            param = {key:""};
        }

        
        this.state={
            article:{UpdatedAt:"", CreatedAt:"", Title:"", Key: param.key, Content:"",User:{Nickname:""}, Topic:{Name:""}},
            next:{Title:"", Key: ""},
            previous:{ Title:"", Key: ""}
        };

        // initial a parser
        this.mdParser = new MarkdownIt({
            html: true,
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
        this.getArticleDeatil(this.state.article);
    }
        
    getArticleDeatil = (article) =>{
        let {next, previous} = this.state;

        AjxRequest.getArticle(article.Key, data=>{
            AjxRequest.getNext(data.message.TopicID, data.message.Key, data=>{
               if (data.code === 0){
                    this.setState({
                        next: data.message,
                    });
               }else if(data.code === 1){
                   next.Title = data.message;
                   this.setState({
                    next,
                });
               }
            });
    
            AjxRequest.getPrevious(data.message.TopicID, data.message.Key, data=>{
                if (data.code === 0){
                    this.setState({
                        previous: data.message,
                    });
               }else if(data.code === 1){
                    previous.Title = data.message;
                   this.setState({
                    previous,
                });
               }
            });

            if(data.code === 0){
                this.setState({
                    article: data.message,
                });
            }
        });
    }

    render() {
        let {article, previous, next} = this.state;
        var articleContent = this.mdParser.render(article.Content);

        return(
            <DocumentTitle title={article.Title}>
                <div style={{marginTop:20}}>
                    <h1 style={{textAlign:"center",  backgroundColor:"#f0f0f0"}}>
                        {article.Title}
                    </h1>
                    <div style={{textAlign:"center"}}>
                        <font>更新时间：{article.UpdatedAt.substring(0, 16)}</font><br/>
                        <font>话题：{article.Topic.Name}</font><br/>
                        <font>作者：{article.User.Nickname}</font>
                    </div>
                    <div 
                        className="MarkdownWrap"
                        dangerouslySetInnerHTML = {{__html:articleContent}} 
                    ></div>

                    <div style={{marginTop:40}}>
                        <Button onClick={e=>{
                            let {previous} = this.state;

                            if (previous.Key !== ""){
                                this.getArticleDeatil(previous);
                            }
                        }}>上一篇</Button>
                        <Button style={{float:"right"}} onClick={e=>{
                            let {next} = this.state;

                            if (next.Key !== ""){
                                this.getArticleDeatil(next);
                            }
                        }}>下一篇</Button>
                    </div>
                    <div style={{marginBottom:20}}>
                        <font>{previous.Title}</font>
                        <font style={{float:"right"}}>{next.Title}</font>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}