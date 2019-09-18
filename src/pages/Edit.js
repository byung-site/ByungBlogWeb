import React, { Component } from 'react'
import { Input, Button } from 'antd';
import MdEditor from 'react-markdown-editor-lite'
import MarkdownIt from 'markdown-it'

import DocumentTitle from '../components/DocumentTitle'

class Edit extends Component {
    mdParser = null

    constructor(props){
        super(props);

        this.state={
            article:{ID:0,Key:"",Content:"", Title:""},
        };

        // initial a parser
        this.mdParser = new MarkdownIt({
            html: true,
            linkify: true,
            typographer: true
        })
    }

    handleEditorChange = ({text}) => {
        let {article} = this.state;

        article.Content = text;
        this.setState({
            article,
        });
    }

    handleImageUpload = (file, callback) => {
        console.log(file);
        callback("vaiew/imajsf.png");
    }

    titleInputChange = (e) =>{
        let {article} = this.state;

        article.Title = e.target.value;
        this.setState({
            article,
        });
    }

    saveArticle = () =>{

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
                        <Button type="primary" style={{marginRight:"10px"}}>存稿</Button>
                        <Button type="primary">发布</Button>
                    </div>
                </div>
            </DocumentTitle>
        )
      }
}

export default Edit;