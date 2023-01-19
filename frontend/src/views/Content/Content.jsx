import {Spin} from 'antd';
import React, {Component, lazy, Suspense} from 'react';
import {Switch, Route} from "react-router-dom";

import "./content.scss";

export default class Right extends Component {

    render() {
        return (
            <div className="content">
                <Suspense fallback={<Spin/>}>
                    <Switch>
                        <Route exact path='/' component={lazy(() => import("../Blogs/Blogs"))}/>
                        <Route path='/timeline' component={lazy(() => import("../TimeLine/TimeLine"))}/>
                        <Route path='/tags' component={lazy(() => import("../Tags/Tags"))}/>
                        <Route path='/logs' component={lazy(() => import("../Logs/Logs"))}/>
                        <Route path='/article/:id' component={lazy(() => import("../../components/Article/Article"))}/>
                        <Route path='/editor' component={lazy(() => import("../../components/Editor/Editor"))}/>
                        <Route path='/editorc' component={lazy(() => import("../../components/EditorC"))}/>
                    </Switch>
                </Suspense>
            </div>
        )
    }
}

