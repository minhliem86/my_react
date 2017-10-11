import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {Pagination} from "../lib";
import RoomModel from '../models/rooms';


class DeleteButton extends Component{
    render() {

        return (
          <div style={{'display': 'inline-block'}}>
              <button type="button " className="btn btn-danger" >Xóa</button>
          </div>
        );
    }
}
class RoomList extends Component{
    constructor(props){
        super(props);
        this.state = {
            rooms: null,
            keyword: '',
        }
    }

    componentDidMount(){
        this.getRoomList();
    }
    getRoomList(){
        RoomModel.getRooms().then( results => {
           this.setState({
               rooms: results.data
           })
        });
    }
    render () {
        return (
            <section className="list-component">
                <div className="room-list">
                    <h4 className="page-header">Danh Sách Phòng</h4>
                    <div className="control-bar mb-3">
                        <Link to="/rooms/create" className="btn btn-primary px-4"><i className="fa fa-plus"></i> Tạo
                            mới</Link>&nbsp;
                        <Link to="/rooms" className="btn btn-outline-dark px-4"><i className="fa fa-refresh"></i> Refresh</Link>&nbsp;
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
                            <th>STT</th>
                            <th>Số phòng</th>
                            <th>Loại phòng</th>
                            <th>Số khách tối đa</th>
                            <th>Wifi</th>
                            <th>Đơn giá</th>
                            <th>Chức năng</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.rooms !== null && this.state.rooms.data.length > 0 ?
                                this.state.rooms.data.map((room, key) => (
                                    <tr key={key + 1}>
                                        <td>{key + 1 + (this.state.rooms.current_page - 1) * this.state.rooms.per_page}</td>
                                        <td>{room.number}</td>
                                        <td>{room.type}</td>
                                        <td>{room.max}</td>
                                        <td>{room.hasWifi ? 'Có' : 'Không'}</td>
                                        <td>${room.price}</td>
                                        <td>
                                            <Link to={`/rooms/${room.id}`} className="btn btn-info btn-xs mr-2" style={{'display': 'inline-block'}}><i className="fa fa-eye text-light"></i></Link>
                                            <DeleteButton user={room} selectedUser={this.setUser} />

                                        </td>
                                    </tr>
                                ))
                             : (
                                <tr>
                                    <td colSpan="7">Chua co du lieu</td>
                                </tr>
                            )
                        }

                        </tbody>
                    </table>
                    <nav aria-label="Page navigation example" className="d-flex justify-content-center ">
                        <Pagination data={this.state.rooms} to="rooms" range="2" keyword="" />
                    </nav>

                    <div className="modal fade">
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Xóa phòng</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <p>Bạn có muốn xóa phần tử này khỏi danh sách ?</p>
                                </div>
                                <div className="modal-footer">
                                    <button className="btn btn-primary" onClick="">Xóa</button>
                                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Hủy</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
export default RoomList;