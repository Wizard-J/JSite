import React, { Component } from 'react';
import { Button } from "antd";
import Bar from "../Bar/Bar";
import marked from "marked";
import 'highlight.js/styles/atom-one-light.css';
import "./editor.scss";
import "./markdown.scss";

export default class Article extends Component {

    state = {
        article: "",
    }

    componentDidMount() {
        // marked相关配置
        marked.setOptions({
            renderer: new marked.Renderer(),
            highlight: function(code) {
              return require('highlight.js').highlightAuto(code).value;
            },
            pedantic: false,
            gfm: true,
            tables: true,
            breaks: false,
            sanitize: false,
            smartLists: true,
            smartypants: false,
            xhtml: false
          });

        this._editor_box.onclick = e => {
            this._editor_textarea.focus();
        }

        window._wizard.disableMenu();

    }

    textChange = e => {
        /* 
            输入文本时：
            - 调整textarea高度
            - 超出视口高度则显示滚动条
        */
        // 编辑区
        const otextarea = this._editor_textarea;
        otextarea.style.height = "auto";
        otextarea.scrollTop = 0;
        otextarea.style.height = otextarea.scrollHeight + "px";
        this.setState({
            article: marked(e.target.value),
        })
    }

    render() {
        return (
            <div className="editor">

                <div className="tools">
                    <i>不要吹灭你的灵感和你的想象力; 不要成为你的模型的奴隶。 ——文森特・梵高</i>
                    <Button type="primary">保存</Button>
                </div>

                <div className="content-box" ref={_out => this._out = _out}>
                    
                    <div className="editor-box" ref={_text => this._editor_box = _text}>
                        <textarea name="content" onChange={this.textChange} ref={_text => this._editor_textarea = _text} />
                        <Bar box={this._editor_box} text={this._editor_textarea} />
                    </div>

                    <div className="preview" ref={_preview => this._preview = _preview}>
                        <div className="content-preview" ref={_preview_con => this._preview_con = _preview_con} dangerouslySetInnerHTML={{ __html: this.state.article }} />
                        <Bar box={this._preview} text={this._preview_con} />
                    </div>

                </div>

            </div>
        )
    }
}
