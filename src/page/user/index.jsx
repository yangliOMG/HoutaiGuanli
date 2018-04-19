/*
 * @Author: yangli 
 * @Date: 2018-04-19 16:28:50 
 * @Last Modified by: yangli
 * @Last Modified time: 2018-04-19 17:08:49
 */
import React from 'react';
import {Link} from 'react-router-dom'
import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

import PageTitle from 'component/page-title/index.jsx';
import Pagination from 'util/pagination/index.jsx';

const _mm = new MUtil();
const _user = new User();

class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list : [],
            pageNum :1,
            firstLoading:true
        }
    }
    componentDidMount(){
        this.loadUserList()
    }
    loadUserList(){
        _user.getUserList(this.state.pageNum).then(res=>{
            this.setState(res, ()=>{
                this.setState({
                    firstLoading:false
                })
            });
        },errMsg=>{
            this.setState({
                list:[]
            })
            _mm.errorTips(errMsg)
        });
    }
    onPageNumChange(pageNum){
        this.setState({
            pageNum:pageNum
        },()=>{
            this.loadUserList();
        })
    }
    render(){
        let ListBody = this.state.list.map((user,index)=>{
            return (
                <tr key={index}> 
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user.phone}</td>
                    <td>{new Date(user.createTime).toLocaleString()}</td>
                </tr>
            )
        });
        let listError = (
            <tr>
                <td colSpan="5" className="text-center">
                    {this.state.firstLoading ? '正在加载':'没有结果'}
                </td>
            </tr>
        );
        let tableBody = this.state.list.length >0 ? ListBody : listError;
        return (
            <div id="page-wrapper">
                <PageTitle title="用户">
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>用户名</th>
                                    <th>邮箱</th>
                                    <th>电话</th>
                                    <th>创建时间</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tableBody
                                }
                            </tbody>
                        </table>
                    </div>
                    <Pagination current={this.state.pageNum} 
                                total={this.state.total} 
                                onChange={pageNum=> this.onPageNumChange(pageNum)} />
                </div>
            </div>
        )
    }
}

export default UserList;