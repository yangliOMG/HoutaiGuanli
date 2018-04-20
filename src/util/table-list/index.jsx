/*
 * @Author: yangli 
 * @Date: 2018-04-19 16:28:50 
 * @Last Modified by: yangli
 * @Last Modified time: 2018-04-20 10:32:17
 */
import React from 'react';

import Table from 'rc-pagination';

class TableList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstLoading : true
        }
    }
    componentWillReceiveProps(){
        this.setState({
            firstLoading:false
        })
    }
    render(){
        let listBody = this.props.children,
            title = this.props.title;
        let listError = (
            <tr>
                <td colSpan={this.props.title.length} className="text-center">
                    {this.state.firstLoading ? '正在加载':'没有结果'}
                </td>
            </tr>
        );
        let tableBody = listBody.length >0 ? listBody : listError;
        let tableHead = title.map((item,idx)=>{
            if(typeof title === 'object'){
                return <th key={idx} width={item.width}>{item.name}</th>
            }else if(typeof title === 'string'){
                return <th key={idx}>{item}</th>
            }
        });
        return (
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-striped table-border">
                        <thead>
                            <tr>
                                {tableHead}
                            </tr>
                        </thead>
                        <tbody>
                            {tableBody}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default TableList;