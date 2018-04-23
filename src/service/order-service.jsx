/*
 * @Author: yangli 
 * @Date: 2018-04-19 13:35:27 
 * @Last Modified by: yangli
 * @Last Modified time: 2018-04-23 16:15:20
 */
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();

class Order{
    getOrderList(listParam){
        let url = '',
            data = {};
        if(listParam.listType === 'list'){
            url = '/manage/order/list.do';
            data.pageNum = listParam.pageNum;
        }else if(listParam.listType === 'search'){
            url = '/manage/order/search.do';
            data.pageNum = listParam.pageNum;
            data.orderNo = listParam.orderNo;
        }
        return _mm.request({
            type:'post',
            url:url,
            data:data
        }); 
    }
    getOrderDetail(orderNumber){
        return _mm.request({
            type:'post',
            url:'/manage/order/detail.do',
            data:{
                orderNo:orderNumber
            }
        }); 
    }
    sendGoods(orderNo){
        return _mm.request({
            type:'post',
            url:'/manage/order/send_goods.do',
            data:{
                orderNo:orderNo
            }
        });
    }
}

export default Order;