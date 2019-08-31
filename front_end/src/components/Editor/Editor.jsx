import React, { Component } from 'react';
import { Button, Input, Form } from "antd";
import Bar from "../Bar/Bar";
import marked from "marked";
import hljs from "highlight.js";
import "./editor.scss";

class Article extends Component {

    state = {
        article:"",
        preview:null,
        editor:null
    }

    componentDidMount() {

        document.onclick = e=>{
            this._text_area.focus();
        }

        window.blog.openEditor();

        // marked相关配置
        marked.setOptions({
            renderer: new marked.Renderer(),
            gfm: true,
            tables: true,
            breaks: true,
            pedantic: false,
            sanitize: true,
            smartLists: true,
            smartypants: false,
            highlight: function(code) {
                return hljs.highlightAuto(code).value;
            },
        });

    }


    textChange = e => {

        const otextarea = this._article_content;
        otextarea.style.height = otextarea.scrollHeight + "px";
        const tscrollHeight = otextarea.scrollHeight;
        const toffsetHeight = otextarea.offsetHeight;
        const editor = tscrollHeight === toffsetHeight ? null : {scrollHeight:tscrollHeight,offsetHeight:toffsetHeight};
        if(!editor) {// 没有滚动条，重置位置，解绑事件
            this._preview.style.top = 0;
            this._preview.onmousewheel = null;
        }

        // preview
        const opreview = this._preview;
        const scrollHeight = opreview.scrollHeight;
        const offsetHeight = opreview.offsetHeight;
        const preview = scrollHeight === offsetHeight ? null : {scrollHeight,offsetHeight};
        if(!preview) {// 没有滚动条，重置位置，解绑事件
            this._preview.style.top = 0;
            this._preview.onmousewheel = null;
        }
        this.setState({
            article:marked( e.target.value ),
            preview,
            editor
        })
    }

    render() {
        const { TextArea } = Input;
        const { getFieldDecorator } = this.props.form;

        return (
            <div className="editor">

                <div className="tools">
                    <i>不要吹灭你的灵感和你的想象力; 不要成为你的模型的奴隶。 ——文森特・梵高</i>
                    <Button type="primary">保存</Button>
                </div>

                <div className="content-box" ref={_out => this._out=_out}>

                    <div id="content-editor">
                        <Form onSubmit={this.handleSubmit} style={{height:"100%"}}>
                            <Form.Item >
                                {getFieldDecorator('content')(
                                    <div ref={_text => this._article_content = _text}>
                                        <TextArea name="content" onChange={this.textChange} ref={_text => this._text_area = _text}/>
                                        {
                                            this.state.editor && <Bar preview={this._text_area}/>
                                        }
                                    </div>
                                )}
                            </Form.Item>
                        </Form>
                    </div>

                    <div className="preview" ref={_preview => this._preview = _preview}>
                        <div className="content-preview" ref={_preview_con => this._preview_con=_preview_con} dangerouslySetInnerHTML={{__html:this.state.article}} />
                        {
                            this.state.preview && <Bar preview={this._preview_con}/>
                        }
                    </div>

                </div>

            </div>
        )
    }
}

export default Form.create({ name: "article" })(Article)