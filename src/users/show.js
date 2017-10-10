import React, { Component } from 'react';
import UserModel from '../models/users';

import {Link, Redirect} from 'react-router-dom';
import {FlashData} from "../lib";

class UserShow extends Component{
    constructor(props){
        super(props);

        this.state = {
            errors: {},
            redirect : false,
            name : '',
            email: '',
            password : '',
            password_confirmation: ''
        }

        // BINDING
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount(){
        this.getuser();
    }

    getuser(){
        const id = this.props.match.params.id;
        UserModel.getUser(id).then( result => {
            const user = result.data;
            this.setState({
                name : user.name,
                email : user.email
            })
        });
    }

    handleChange(event){
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value,
        })
    }

    handleSubmit(event){
        event.preventDefault();
        let dataPass = {};
        const id = this.props.match.params.id;
        if(this.state.password){
            dataPass = {
                password : this.state.password,
                password_confirmation : this.state.password_confirmation,
            }
        }
        UserModel.updateUser(id, {
            name : this.state.name,
            email : this.state.email,
            ...dataPass

        }).then( result => {
            if (result.data.message) {
                FlashData.set('message', result.data.message);
                this.setState({
                    redirect: true
                })

            }
            if(result.data.errors){
                this.setState({
                    errors: result.data.errors || null,
                    message : null,
                })
            }

        });
    }

    render() {
        const errors = this.state.errors;
        return (
            <div className="user-container">
                {
                    this.state.redirect ? (<Redirect to="/users" />) : (
                        <section>
                            <h4 className="page-header">Tạo người dùng</h4>
                            <div className="control-bar mb-3">
                                <Link to="/users" className="btn btn-outline-secondary px-2"><i className="fa fa-chevron-circle-left"></i> Back</Link>
                            </div>
                            <div className="form-container">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="form-group">
                                        <label >Họ và tên</label>
                                        <input
                                            type="text"
                                            className= {errors.name ? "form-control is-invalid" : "form-control"}
                                            id="name"
                                            name="name"
                                            placeholder="Họ tên"
                                            value={this.state.name}
                                            onChange={this.handleChange}
                                        />
                                        {
                                            errors.name &&
                                            <div className="invalid-feedback">
                                                {errors.name}
                                            </div>
                                        }

                                    </div>
                                    <div className="form-group">
                                        <label >Email</label>
                                        <input type="email"
                                               className= {errors.email ? "form-control is-invalid" : "form-control"}
                                               id="email"
                                               name="email"
                                               placeholder="Email"
                                               value={this.state.email}
                                               onChange={this.handleChange}
                                        />
                                        {
                                            errors.email &&
                                            <div className="invalid-feedback">
                                                {errors.email}
                                            </div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label >Mật khẩu</label>
                                        <input
                                            type="password"
                                            className= {errors.password ? "form-control is-invalid" : "form-control"}
                                            id="password"
                                            name="password"
                                            placeholder="Password"
                                            value={this.state.password}
                                            onChange={this.handleChange}
                                        />
                                        {
                                            errors.password &&
                                            <div className="invalid-feedback">
                                                {errors.password}
                                            </div>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label >Xác nhận mật khẩu</label>
                                        <input
                                            type="password"
                                            className= {errors.password_confirmation ? "form-control is-invalid" : "form-control"}
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            placeholder="Password Confirmation"
                                            value={this.state.password_confirmation}
                                            onChange={this.handleChange}
                                        />
                                        {
                                            errors.password_confirmation &&
                                            <div className="invalid-feedback">
                                                {errors.password_confirmation}
                                            </div>
                                        }
                                    </div>
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                </form>
                            </div>
                        </section>
                    )
                }
            </div>
        );
    }
}

export default UserShow;