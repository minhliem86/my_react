import axios from 'axios';
import config from '../config';

let path = `${config.apiURL}`;

class RoomModel {
    // GET ALL
    static getRooms(page = 1, search = null){
        let url = path+`/rooms?page=${page}`;
        if(search){
            url += `&search=${search}`;
        }
        return axios.get(url);
    }

    // SHOW ROOM
    static getRoom(id = 1){
        let url = path + `/rooms/${id}`;
        return axios.get(url);
    }

    // DELETE
    static deleteRoom(id = 1){
        return axios.delete(path + `/rooms/${id}`);
    }

    // CREATE
    static createRoom(data = {}){
        return axios.post(path+`/rooms/create`,data);
    }

    // UPDATE
    static updateRoom(id, data ={}){
        return axios.put(path+`/rooms/${id}`,data);
    }
}

export default RoomModel;