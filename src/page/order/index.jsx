/*
 * @Author: yangli 
 * @Date: 2018-04-19 16:28:50 
 * @Last Modified by: yangli
 * @Last Modified time: 2018-04-27 15:53:09
 */
import React from 'react';
import {Link} from 'react-router-dom'
import MUtil from 'util/mm.jsx';
import Order from 'service/order-service.jsx';

import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';
import ListSearch from './index-list-search.jsx';
import Pagination from 'util/pagination/index.jsx';

const _mm = new MUtil();
const _order = new Order();

class OrderList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            list : [],
            pageNum :1,
            listType:'list'
        }
    }
    componentDidMount(){
        this.loadOrderList()
    }
    loadOrderList(){
        let listParam = {};
        listParam.listType  = this.state.listType;
        listParam.pageNum  = this.state.pageNum;
        if(this.state.listType === 'search'){
            listParam.orderNo  = this.state.orderNo;
        }
        _order.getOrderList(listParam).then(res=>{
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
            this.loadOrderList();
        })
    }
    onSearch(orderNumber){
        let listType = orderNumber === '' ? 'list' : 'search';
        this.setState({
            listType : listType,
            pageNum: 1,
            orderNo: orderNumber,
        },()=>{
            this.loadOrderList();
        })
    }
    render(){
        let tableHeads = ['订单号','收件人','订单状态','订单总价','创建时间','操作']
        return (
            <div id="page-wrapper">
                <PageTitle title="用户列表">
                </PageTitle>
                <ListSearch onSearch={(orderNumber)=>this.onSearch(orderNumber)}></ListSearch>
                <div className="row">
                    <TableList title={tableHeads}>
                        { 
                          this.state.list.map((order,index)=>{
                            return (
                                <tr key={index}> 
                                    <td><Link className="opear" to={`/order/detail/${order.orderNo}`}>{order.orderNo}</Link></td>
                                    <td>{order.receiverName}</td>
                                    <td>{order.statusDesc}</td>
                                    <td>￥{order.payment}</td>
                                    <td>{order.createTime}</td>
                                    <td>
                                      <Link className="opear" to={`/order/detail/${order.orderNo}`}>详情</Link>
                                    </td>
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

export default OrderList;