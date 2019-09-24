import React from 'react';
import MarkdownIt from 'markdown-it'
import hljs  from 'highlight.js'

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
            article:{Title:"", Key: param.key, Content:""}
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
                <div>
                    <div>
                        <h1 style={{textAlign:"center"}}>{article.Title}</h1>
                        <div dangerouslySetInnerHTML = {{__html:articleContent}} ></div>
                    </div>
                </div>
            </DocumentTitle>
        );
    }
}