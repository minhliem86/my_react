import React, {Component} from 'react';
import UserModel from '../models/users';
import {Link} from 'react-router-dom';
import  {Pagination} from "../lib";
import queryString from 'query-string';
const jQuery = window.jQuery;

class DeleteButton extends Component{

    constructor(props){
        super(props);

        // BINDING
        this.setUser = this.setUser.bind(this);
    }

    setUser (event){
        event.preventDefault();
        const user = this.props.user;
        jQuery('.modal').modal('show');
    }

    render(){
        return (
            <button
                type="button"
                className="btn btn-danger btn-xs"
                onClick={this.setUser}
            ><i className="fa fa-remove text-light"></i></button>
        );
    }
}

class UserList extends Component {
    currentPage = 1;
    //set bien timeout đê thuc hien search keypress
    timeOutkeypress = null;
    // set lan dau duoc load
    firstLoad = 1;
    // set selected User
    selectedUser = null;

    constructor(props) {
        super(props);

        this.state = {
            message: null,
            error: null,
            users: null,
            keyword : queryString.parse(props.location.search).search || '',
        }
        // set currentPage mặc định khi vừa load trang
        this.currentPage = queryString.parse(props.location.search).page || 1;

        // BINDING
        this.onHandleSearch = this.onHandleSearch.bind(this);
        this.onHandleDelete = this.onHandleDelete.bind(this);
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

    // DELETE HANDLE
    onHandleDelete(){
        if(this.selectedUser){
            UserModel.deleteUser(this.selectedUser.id).then( result => {
                if (result.data.message) {
                    this.state.users.data.splice(this.state.users.data.indexOf(this.seletedUser));
                    this.setState({
                        message: result.data.message || null,
                        error: null,
                    })

                }
                if(result.data.error){
                    this.setState({
                        error: result.data.error || null,
                        message : null,
                    })
                }
                this.getUser();
            });
        }
        jQuery('.modal').modal('hide');
        // console.log(this.seletedUser);
    }
    render() {
        return (
            <div className="user-list">
                <h4 className="page-header">Danh Sách người dùng</h4>
                <div className="control-bar mb-3">
                    <Link to="/users/create" className="btn btn-primary px-4"><i className="fa fa-plus"></i> Tạo
                        mới</Link>&nbsp;
                    <Link to="/users/create" className="btn btn-outline-dark px-4"><i className="fa fa-refresh"></i> Refresh</Link>&nbsp;
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
                {
                    this.state.error && <div className="alert alert-danger">{this.state.error}</div>
                }
                {
                    this.state.message && <div className="alert alert-success">{this.state.message}</div>
                }
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
                                <tr key={key + 1 + (this.state.users.current_page - 1) * this.state.users.per_page}>
                                    <td>{key + 1 + (this.state.users.current_page - 1) * this.state.users.per_page}</td>
                                    <td>{value.name}</td>
                                    <td>{value.email}</td>
                                    <td>
                                        <Link to={`/users/${value.id}`} className="btn btn-info btn-xs mr-2"><i className="fa fa-eye text-light"></i></Link>
                                        <DeleteButton user={value} />

                                    </td>
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
                
                <div className="modal fade">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Modal body text goes here.</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn btn-primary" onClick={this.onHandleDelete}>Xóa</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Hủy</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserList;