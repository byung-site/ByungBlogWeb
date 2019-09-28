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
            article:{UpdatedAt:"", CreatedAt:"", Title:"", Key: param.key, Content:"",User:{Nickname:""}}
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
        let {article} = this.state;

        AjxRequest.getArticle(article.Key, data=>{
            if(data.code === 0){
                this.setState({
                    article: data.message,
                });
            }
        });
    }

    render() {
        let {article} = this.state;
        var articleContent = this.mdParser.render(article.Content);
        return(
            <DocumentTitle title={article.Title}>
                <div style={{marginTop:20}}>
                    <h1 style={{textAlign:"center",  backgroundColor:"#f0f0f0"}}>
                        {article.Title}
                    </h1>
                    <div style={{textAlign:"center"}}>
                        <p>作者：{article.User.Nickname}</p> 
                        <p>更新时间：{article.UpdatedAt.substring(0, 10)}</p>
                    </div>
                    <div 
                        className="MarkdownWrap"
                        dangerouslySetInnerHTML = {{__html:articleContent}} 
                    ></div>

                    <div style={{marginBottom:20}}>
                        <Button>上一篇</Button>
                        <Button style={{float:"right"}}>下一篇</Button>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}