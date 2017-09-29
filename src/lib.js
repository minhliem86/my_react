import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export FlashData{
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