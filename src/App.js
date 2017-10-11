import React, { Component } from 'react';
import './App.css';
import {
    Route,
    Link,
    NavLink,
} from 'react-router-dom'
import UserCenter from './users/index';
import RoomCenter from './rooms/index';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/users">User</NavLink>
                            {/*<a className="nav-link" href="#">User <span className="sr-only">(current)</span></a>*/}
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/rooms">Room</NavLink>
                        </li>

                    </ul>
                </div>
            </nav>
        </header>
        <div className="App-intro">
            <div className="container my-2">
                <div className="row">
                    <div className="col-sm-12">
                        <Route exact path="/" component={UserCenter}/>
                        <Route path="/users" component={UserCenter}/>
                        <Route path="/rooms" component={RoomCenter}/>
                    </div>
                </div>
            </div>

        </div>

      </div>

    );
  }
}

export default App;
