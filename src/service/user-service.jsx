/*
 * @Author: yangli 
 * @Date: 2018-04-19 13:35:27 
 * @Last Modified by: yangli
 * @Last Modified time: 2018-04-19 15:19:36
 */
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();

class User{
    login(loginInfo){
        return _mm.request({
            type:'post',
            url:'/manage/user/login.do',
            data:loginInfo
        });
    }
    logout(){
        return _mm.request({
            type:'post',
            url:'/user/logout.do',
        }); 
    }
    getUserList(pageNum){
        return _mm.request({
            type:'post',
            url:'/manage/user/list.do',
            data:{
                pageNum:pageNum
            }
        }); 
    }

    checkLoginInfo(loginInfo){
        let username = $.trim(loginInfo.username),
            password = $.trim(loginInfo.password);
        if(typeof username !== 'string' || username.length === 0){
            return {
                status: false,
                msg: '用户名不能为空'
            }
        }
        if(typeof password !== 'string' || password.length === 0){
            return {
                status: false,
                msg: '密码不能为空'
            }
        }
        return {
            status: true,
            msg: '验证通过'
        }
    }
    
}

export default User;