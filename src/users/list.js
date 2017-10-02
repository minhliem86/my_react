import React, {Component} from 'react';
import UserModel from '../models/users';
import {Link} from 'react-router-dom';
import  {Pagination} from "../lib";
import queryString from 'query-string';

class UserList extends Component {
    currentPage = 1;
    constructor(props) {
        super(props);

        this.state = {
            users: null,
            keyword : ''
        }
    }

    componentWillMount() {
        this.getUser();
    }

    componentWillReceiveProps(nextProps){
        if(this.props.location.search !== nextProps.location.search){
            this.currentPage = queryString.parse(nextProps.location.search).page || 1;
            this.getUser(nextProps);
        }
    }

    getUser(props = this.props, forcePage = null) {
        // let page = 1;
        let page = props.location.search ? querySring.parse(props.location.search).page : 1;
        if (this.currentPage !== page){
            page = this.currentPage;
        }
        // Uu tien trang tai
        if(forcePage){
            page = forcePage;
        }
        UserModel.getUsers(page).then(result => {
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
                    <Pagination data={this.state.users} range={2} to="users" keyword={this.state.keyword} />
                </nav>
            </div>
        );
    }
}

export default UserList;