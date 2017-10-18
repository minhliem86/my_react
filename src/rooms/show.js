import React, {Component} from 'react';
import RoomModel from '../models/rooms';

import {Link, Redirect} from 'react-router-dom';
import {FlashData} from "../lib";


class RoomShow extends Component{
    render () {
        return (
            <section className="list-component">
                <section className="list-component">
                    {
                        this.state.redirect ? (<Redirect to="/rooms" />) : (
                            <section>
                                <h4 className="page-header">Tạo phòng</h4>
                                <div className="control-bar mb-3">
                                    <Link to="/rooms" className="btn btn-outline-secondary px-2"><i
                                        className="fa fa-chevron-circle-left"></i> Back</Link>
                                </div>
                                <div className="form-container">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <label>Number</label>
                                            <input
                                                type="text"
                                                className={this.state.errors.number ? "form-control is-invalid" : "form-control"}
                                                id="number"
                                                name="number"
                                                placeholder="Number"
                                                value={this.state.number}
                                                onChange={this.handleChange}
                                            />
                                            {
                                                this.state.errors.number &&
                                                <div className="invalid-feedback">
                                                    {this.state.errors.number}
                                                </div>
                                            }
                                        </div>

                                        <div className="form-group">
                                            <label>Price</label>
                                            <input
                                                type="text"
                                                className={this.state.errors.price ? "form-control is-invalid" : "form-control"}
                                                id="price"
                                                name="price"
                                                placeholder="Price"
                                                value={this.state.price}
                                                onChange={this.handleChange}
                                            />
                                            {
                                                this.state.errors.price &&
                                                <div className="invalid-feedback">
                                                    {this.state.errors.price}
                                                </div>
                                            }
                                        </div>

                                        <div className="form-group">
                                            <label>Loại</label>
                                            <select name="type" className="form-control" value={this.state.type}
                                                    onChange={this.handleChange}>
                                                <option value="single">Single</option>
                                                <option value="double">Double</option>
                                                <option value="triple">Triple</option>
                                            </select>

                                        </div>
                                        <div className="form-group">
                                            <label>Số khách tối thiểu</label>

                                            <select name="min" className="form-control" value={this.state.min}
                                                    onChange={this.handleChange}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>


                                        </div>
                                        <div className="form-group">
                                            <label>Số khách tối đa</label>

                                            <select name="max" className="form-control" value={this.state.max}
                                                    onChange={this.handleChange}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>


                                        </div>
                                        <div className="form-group">
                                            <label>Dịch vụ wifi</label>
                                            <div className="row">
                                                <div className="col">
                                                    <label htmlFor="wifi-1">
                                                        <input type="radio" id="wifi-1" name="wifi" value="1"  onChange={this.handleChange} checked = {this.state.wifi === 1}  /> Có
                                                    </label>
                                                </div>
                                                <div className="col">
                                                    <label htmlFor="wifi-0">
                                                        <input type="radio" id="wifi-0" name="wifi" value="0"  onChange={this.handleChange} checked = {this.state.wifi === 1}/> Không
                                                    </label>
                                                </div>
                                            </div>


                                        </div>

                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </form>
                                </div>
                            </section>
                        )
                    }

                </section>
            </section>
        );
    }
}
export default RoomShow;