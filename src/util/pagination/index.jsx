/*
 * @Author: yangli 
 * @Date: 2018-04-19 16:28:50 
 * @Last Modified by: yangli
 * @Last Modified time: 2018-04-19 17:08:50
 */
import React from 'react';

import RcPagination from 'rc-pagination';
import "rc-pagination/dist/rc-pagination.min.css"

class Pagination extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className="row">
                <div className="col-md-12">
                    <RcPagination  {...this.props} hideOnSinglePage showQuickJumper />
                </div>
            </div>
        )
    }
}

export default Pagination;