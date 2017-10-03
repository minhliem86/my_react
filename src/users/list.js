import React, {Component} from 'react';
import UserModel from '../models/users';
import {Link} from 'react-router-dom';
import  {Pagination} from "../lib";
import queryString from 'query-string';

class UserList extends Component {
    currentPage = 1;
    //set bien timeout đê thuc hien search keypress
    timeOutkeypress = null;
    // set lan dau duoc load
    firstLoad = 1;
    constructor(props) {
        super(props);

        this.state = {
            users: null,
            keyword : queryString.parse(props.location.search).search || '',
        }
        // set currentPage mặc định khi vừa load trang
        this.currentPage = queryString.parse(props.location.search).page || 1;

        // BINDING
        this.onHandleSearch = this.onHandleSearch.bind(this);
    }


    componentWillMount() {
        this.getUser();
    }

    // Component Lifecycle chạy khi page re-render
    componentWillReceiveProps(nextProps){
        if(this.props.location.search !== nextProps.location.search){
            this.currentPage = queryString.parse(nextProps.location.search).page || 1;
            this.getUser(nextProps);
        }
    }

    getUser(props = this.props, forcePage = null) {
        let page = 1;
        let keyword = this.state.keyword || '';
        let uri = props.location.search ? queryString.parse(props.location.search) : '';

        if(uri) {
            page = uri.page || 1;
            if (this.currentPage !== page){
                page = this.currentPage;
            }
            // Uu tien trang tai
            if(forcePage){
                page = forcePage;
            }
            keyword = uri.search || '';
            if(this.firstLoad !== 1 && this.state.keyword !== keyword){
                keyword = this.state.keyword;
            }
            // Neu trang da load
            this.firstLoad = 0;
        }

        UserModel.getUsers(page, keyword).then(result => {
            this.setState({
                users: result.data,
                keyword : keyword
            })
        });
    }
    // SEARCH EVENT
    onHandleSearch(event){
        clearTimeout(this.timeOutkeypress);
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name] : value
        })
        // SET TIMEOUT TO PROCESS GET USER
        this.timeOutkeypress = setTimeout(() => {
            this.getUser(this.props, 1);
        }, 300);


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
                            onChange={this.onHandleSearch}
                            value={this.state.keyword}
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