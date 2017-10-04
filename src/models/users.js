import axios from 'axios';
import config from '../config';

let path = `${config.apiURL}`;

class UserModel {
    // GET ALL
    static getUsers(page = 1, search = null){
        let url = path+`/users?page=${page}`;
        if(search){
           url += `&search=${search}`;
        }
        return axios.get(url);
    }

    // SHOW USER
    static getUser(id = 1){
        let url = path + `/users/${id}`;
        return axios.get(url);
    }

    // DELETE
    static deleteUser(id = 1){
        return axios.delete(`${config.apiURL}/users/${id}`);
    }

    // CREATE
    static createUser(data = {}){
        return axios.post(path+`/users/create`,data);
    }

    // UPDATE
    static updateUser(id, data ={}){
        return axios.post(path+`/users/create/${id}`,data);
    }
}

export default UserModel;