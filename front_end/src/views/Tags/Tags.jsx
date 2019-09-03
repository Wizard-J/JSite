import React, { Component } from 'react';
import { Tag, Icon, Input } from 'antd';
import { newTag } from "../../interfaces/tags";
import "./tags.scss";

export default class componentName extends Component {

    state = {
        tags: [],
        inputVisible: false,
        inputValue: '',
    }


    handleClose = removedTag => {
        const tags = this.state.tags.filter(tag => tag !== removedTag);
        console.log(tags);
        this.setState({ tags });
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };
    
    handleInputBlur = e => {
        this.setState({inputVisible: false,inputValue: ''})
    }

    // 新建tag
    handleInputConfirm = () => {
        const tagName = this.state.inputValue;
        let { tags } = this.state;
        let createdBy;
        if(window.wizard_blog) createdBy = window.wizard_blog.user;
        const newItem = {
            createdBy,
            color: this.getColor(),
            name: tagName
        }
        newTag(newItem).then(res=>{
            console.log(res)
        })
        
        tags = [...tags, newTag]
        
        this.setState({
            tags,
            inputVisible: false,
            inputValue: '',
        });
    };

    saveInputRef = input => (this.input = input);


    // 获取随机颜色
    getColor = () => {
        const table = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
        let randomColor = "#";
        for (let i = 0; i < 6; i++) {
            randomColor += table[(Math.floor(Math.random() * 16))]
        }
        return randomColor
    }

    // 删除tag
    delTag = (index,e) => {
        e.preventDefault();
        // console.log(index);
        const deletedTag = this.state.tags[index];
        console.log(deletedTag)  
    }

    componentDidMount() {
        // 获取标签数据
        const tags = []
        for (let i = 0; i < 4; i++) {
            const color = this.getColor();
            tags[i] = {
                color,
                name: color
            }
        }
        this.setState({
            tags
        })
    }

    render() {
        const { tags, inputVisible, inputValue } = this.state;
        return (
            <div className="tags">
                <h4 style={{ marginBottom: 16 }}>标签库:</h4>
                <div>
                    <Tag color="magenta">magenta</Tag>
                    <Tag color="red">red</Tag>
                    <Tag color="volcano">volcano</Tag>
                    <Tag color="orange">orange</Tag>
                    <Tag color="gold">gold</Tag>
                    <Tag color="lime">lime</Tag>
                    <Tag color="green">green</Tag>
                    <Tag color="cyan">cyan</Tag>
                    <Tag color="blue">blue</Tag>
                    <Tag color="geekblue">geekblue</Tag>
                    <Tag color="purple">purple</Tag>
                </div>
                <h4 style={{ margin: '16px 0' }}>新建标签:</h4>
                <div>
                    {
                        tags.map((item, index) => {
                            return (<Tag key={item.color} closable onClose={this.delTag.bind(this,index)} color={item.color}>{item.name}</Tag>)
                        })
                    }
                </div>
                {inputVisible && (
                    <Input
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 78 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputBlur}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && (
                    <Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
                        <Icon type="plus" /> New Tag
                    </Tag>
                )}
            </div>
        )
    }
}
