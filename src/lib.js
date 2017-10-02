import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export class FlashData{
    static data = {};

    static get(key){
        if(this.data[key]){
            const data = this.data[key];
            this.data[key] = null;
            return data;
        }
        return null;

    }

    static set(key, value){
        this.data[key] = value;
    }
}

export class Pagination extends Component{
    getUrl(page =1){
        let url = `/${this.props.to}?page=${page}`;
        if(this.props.keyword){
            url += `&search=${this.props.keyword}`;
        }
        return url;
    }
}