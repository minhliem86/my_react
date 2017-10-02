import React, {Component} from 'react';
import UserModel from '../models/users';
import {Link} from 'react-router-dom';

class UserList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null,
        }
    }

    componentWillMount() {
        this.getUser();
    }

    getUser() {
        UserModel.getUsers().then(result => {
            this.setState({
                users: result.data
            })
        });
    }

    render() {
        return (
            <div className="user-list">
                <h4 className="page-header">Danh Sách người dùng</h4>
                <div className="control-bar mb-3">
                    <Link to="/users/create" className="btn btn-primary px-4"><i className="fa fa-plus"></i> Tạo
                        mới</Link>&nbsp;
                    <Link to="/users/create" className="btn btn-outline-dark px-4"><i className="fa fa-refresh"></i>
                        Refresh</Link>&nbsp;
                    <form style={{'display': 'inline-block'}} className="form-inline">
                        <input
                            type="text"
                            name="keyword"
                            className="form-control"
                            placeholder="Tìm kiếm"
                        />
                    </form>
                </div>
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
                                <tr key={key + 1}>
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
                <nav aria-label="Page navigation example" className="d-flex justify-content-center ">
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href="#">Trang đầu</a></li>
                        <li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
                        <li className="page-item"><a className="page-link" href="#">Trang cuối</a></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default UserList;