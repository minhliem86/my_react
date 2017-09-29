import React, {Component} from 'react';
import UserModel from '../models/users';

class UserList extends Component{
    constructor(props){
        super(props);

        this.state = {
            users : {}
        };
    }

    componentDidMount(){
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
        console.log(this.state.users);
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
                    {/*{*/}
                        {/*this.state.users !== null ?*/}
                            {/*this.state.users.data.map((value, key) => (*/}
                                {/*<tr>*/}
                                    {/*<td>{value.id}</td>*/}
                                    {/*<td>{value.name}</td>*/}
                                    {/*<td>{value.email}</td>*/}
                                    {/*<td>Xóa | Sửa</td>*/}
                                {/*</tr>*/}
                            {/*))*/}
                        {/*:*/}
                            {/*<tr>*/}
                                {/*<td colSpan="4">Không có dữ liệu</td>*/}
                            {/*</tr>*/}
                    {/*}*/}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default UserList;