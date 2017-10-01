import React, {Component} from 'react';
import UserModel from '../models/users';

class UserList extends Component{
    constructor(props){
        super(props);

        this.state = {
            users: null,
        }
    }

    componentWillMount(){
        this.getUser();
    }

    getUser(){
        UserModel.getUsers().then( result => {
            this.setState({
                users: result.data
            })
        });
    }

    render() {
        return (
            <div className="user-list">
                <table className="table table-responsive">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Chức năng</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.users !== null && this.state.users.data.length > 0 ?
                            this.state.users.data.map((value, key) => (
                                <tr key={key+1}>
                                    <td>{value.id}</td>
                                    <td>{value.name}</td>
                                    <td>{value.email}</td>
                                    <td>Xóa | Sửa</td>
                                </tr>
                            ))
                        :
                            <tr>
                                <td colSpan="4">Không có dữ liệu</td>
                            </tr>
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

export default UserList;