import React, { Component } from 'react';
import { Tag, Icon, Input, message } from 'antd';
import { newTag, listTags, delTag } from "../../interfaces/tags";
import "./tags.scss";

export default class componentName extends Component {

    state = {
        tags: [],
        inputVisible: false,
        inputValue: '',
    }


    // handleClose = removedTag => {
    //     const tags = this.state.tags.filter(tag => tag !== removedTag);
    //     // console.log(tags);
    //     this.setState({ tags });
    // };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = e => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputBlur = e => {
        this.setState({ inputVisible: false, inputValue: '' })
    }

    // 新建tag
    handleInputConfirm = () => {
        const tagName = this.state.inputValue;
        let { tags } = this.state;
        let createdBy;
        if (window.wizard_blog) createdBy = window.wizard_blog.user;
        let newItem = {
            createdBy,
            color: this.getColor(),
            name: tagName
        }

        newTag(newItem).then(res => {
            if (res.data.status !== "OK") {
                // 创建失败
                throw new Error(res.data.message)
            } else { // 创建成功
                newItem = res.data.result;
                tags = [...tags, newItem]
                this.setState({
                    tags,
                    inputVisible: false,
                    inputValue: '',
                });
            }
        }).catch(err => {
            console.log(err)
            message.error("创建标签失败服务器异常")
        })

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
    delTag = (id, index, e) => {
        // e.preventDefault();
        delTag(id)
            .then(res => {
                // console.log(res)
                if (res.data.status !== "OK") { // 删除失败
                    throw new Error(res.data.message)
                } else {
                    // 删除标签
                    const tags = this.state.tags;
                    tags.splice(index, 1);
                    this.setState({ tags });
                }
            })
            .catch(err => {
                console.log(err)
                message.error(err)
            })
    }

    componentDidMount() {
        // 获取标签数据
        listTags()
            .then(res => {
                if (res.data.status === "OK") {
                    this.setState({
                        tags: res.data.result
                    })
                } else {
                    throw new Error(res.data.message)
                }
            }).catch(err => {
                console.log(err)
                message.warn("服务器异常")
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
                            return (<Tag key={item.color} closable onClose={this.delTag.bind(this, item.id, index)} color={item.color}>{item.name}</Tag>)
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
