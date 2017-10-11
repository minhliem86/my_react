import React, {Component} from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import RoomList from './list.js';
import RoomCreate from './create.js';
import RoomShow from './show.js';

class RoomCenter extends Component{
    render() {
        return (
            <div className="room-container section-container">
                <Switch>
                    <Route exact path="/rooms" component={RoomList}/>
                    <Route exact path="/rooms/create" component={RoomCreate}/>
                    <Route exact path="/rooms/:id" component={RoomShow}/>
                </Switch>
            </div>
        );
    }
}

export default RoomCenter;