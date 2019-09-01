import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";
import Blogs from "../Blogs/Blogs";
import TimeLine from "../TimeLine/TimeLine";
import Tags from "../Tags/Tags";
import Logs from "../Logs/Logs";
import Article from "../../components/Article/Article";
import Editor from "../../components/Editor/Editor";
import EditorC from "../../components/EditorC";
import "./content.scss";

export default class Right extends Component {
    render() {
        return (
            <div className="content">
                <Switch>
                    <Route path='/blogs' component={Blogs}/>
                    <Route path='/timeline' component={TimeLine}/>
                    <Route path='/tags' component={Tags}/>
                    <Route path='/logs' component={Logs}/>
                    <Route path='/article/:id=?' component={Article}/>
                    <Route path='/editor' component={Editor}/>
                    <Route path='/editorc' component={EditorC}/>
                </Switch>
            </div>
        )
    }
}
