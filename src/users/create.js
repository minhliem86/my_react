import React, { Component } from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import UserModel from '../models/users';

class UserCreate extends Component{

    render() {
        return (
            <div className="user-container user-create">
                User Create
            </div>
        );
    }
}

export default UserCreate;