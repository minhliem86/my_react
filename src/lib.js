import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import loadingGif from './loading.gif';

export class FlashData {
    static data = {};

    static get(key) {
        if (this.data[key]) {
            const data = this.data[key];
            this.data[key] = null;
            return data;
        }
        return null;

    }

    static set(key, value) {
        this.data[key] = value;
    }
}

// CACH TAO PAGINATION 12345 hoac 34567
export class Pagination extends Component {
    getUrl(page = 1) {
        let url = `/${this.props.to}?page=${page}`;
        if (this.props.keyword) {
            url += `&search=${this.props.keyword}`;
        }
        return url;
    }

    render() {
        const data = this.props.data || undefined;
        if (data && data.data.length > 0 && data.last_page > 1) {
            const range = +this.props.range || 2;
            const current_page = data.current_page;
            const lastPage = data.last_page;

            let pagelinks = [];

            // Tao Pagination trang dau tien
            pagelinks.push(
                <li
                    key="0"
                    className={current_page === 1 ? 'page-item disabled' : 'page-item'}>
                    <Link to={this.getUrl()} className="page-link">First</Link>
                </li>
            );

            // Tao Pagination cac trang giua
            for(let i = current_page - range; i < lastPage; i++){
                if( i > 0 && i >= current_page - range){
                    // Tao ra trang Active
                    if(current_page === i){
                        pagelinks.push(
                            <li
                                key={i}
                                className="page-item active">
                                <span className="page-link">{i}</span>
                            </li>
                        );
                    }else{
                        pagelinks.push(
                            <li
                                key={i}
                                className="page-item">
                                <Link to={this.getUrl(i)} className="page-link">{i}</Link>
                            </li>
                        );
                    }
                }
                if(i === current_page + range){
                    break;
                }
            }

            // Tao Pagination trang dau tien
            pagelinks.push(
                <li
                    key={current_page + range + 1}
                    className={current_page === lastPage ? 'page-item disabled' : 'page-item'}>
                    <Link to={this.getUrl(lastPage)} className="page-link">Last</Link>
                </li>
            );

            return (
                <ul className="pagination">
                    {pagelinks}
                </ul>
            );
        }

        return null;
    }
}

export class Loading extends Component{
    render(){
        const style ={
            width: this.props.width || 64,
            height: this.props.height || 64,
            display : this.props.show === true ? 'inline-block' : 'none',
        }
        return (
            <img src={loadingGif} alt="Loading" style={style}/>
        );
    }
}