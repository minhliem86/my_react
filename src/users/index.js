import React, { Component } from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import UserList from './list';
import UserCreate from './create';
import UserShow from './show';

class UserCenter extends Component{

    render() {
        return (
           <div className="user-container">
               <Switch>
                   <Route exact path="/" component={UserList}/>
                   <Route exact path="/users" component={UserList}/>
                   <Route exact path="/users/create" component={UserCreate}/>
                   <Route exact path="/users/:id" component={UserShow}/>
               </Switch>
           </div>
        );
    }
}

export default UserCenter;