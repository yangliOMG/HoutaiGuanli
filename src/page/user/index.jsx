/*
 * @Author: yangli 
 * @Date: 2018-04-19 16:28:50 
 * @Last Modified by: yangli
 * @Last Modified time: 2018-04-20 10:51:45
 */
import React from 'react';
import {Link} from 'react-router-dom'
import MUtil from 'util/mm.jsx';
import User from 'service/user-service.jsx';

import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';
import Pagination from 'util/pagination/index.jsx';

const _mm = new MUtil();
const _user = new User();

class UserList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list : [],
            pageNum :1,
        }
    }
    componentDidMount(){
        this.loadUserList()
    }
    loadUserList(){
        _user.getUserList(this.state.pageNum).then(res=>{
            this.setState(res);
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
        let tableHeads = [
            {name:'ID',width:'10%'},
            {name:'用户名',width:'20%'},
            {name:'邮箱',width:'20%'},
            {name:'电话',width:'20%'},
            {name:'创建时间',width:'30%'},
          ]
        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表">
                </PageTitle>
                <div className="row">
                    <TableList title={tableHeads}>
                        { 
                          this.state.list.map((user,index)=>{
                            return (
                                <tr key={index}> 
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{new Date(user.createTime).toLocaleString()}</td>
                                </tr>
                            )
                          })
                        }
                    </TableList>
                    <Pagination current={this.state.pageNum} 
                                total={this.state.total} 
                                onChange={pageNum=> this.onPageNumChange(pageNum)} />
                </div>
            </div>
        )
    }
}

export default UserList;