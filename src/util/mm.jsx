/*
 * @Author: yangli 
 * @Date: 2018-04-19 10:56:47 
 * @Last Modified by: yangli
 * @Last Modified time: 2018-04-19 15:11:02
 */
class MUtil{
    request(param){
        return new Promise((resolve,reject)=>{
            $.ajax({
                type: param.type || 'get',
                url: param.url || '',
                data: param.data || 'json',
                dataType: param.dataType || null,
                success :res =>{
                    if( 0 === res.status){
                        typeof resolve === 'function' &&
                            resolve(res.data,res.msg)
                    }else if( 10 === res.status){
                        this.doLogin();
                    }else{
                        typeof reject === 'function' &&
                            reject(res.data||res.msg)
                    }
                },
                error :err =>{
                    typeof reject === 'function' &&
                            reject(err.statusText)
                }
            });
        });
    }
    doLogin(){
        window.location.href = '/login?redirect=' + encodeURIComponent(window.location.pathname);
    }

    getUrlParam(name){
        let queryString = window.location.search.split('?')[1] || '',
            reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"),
            result = queryString.match(reg);
        return result ? decodeURIComponent(result[2]) : null; 
    }
    errorTips(errMsg=`出错了~`){
        alert(errMsg);
    }
    setStorage(name,data){
        let dataType = typeof data;
        if(typeof data === 'object'){
            window.localStorage.setItem(name,JSON.stringify(data));
        }else if(['number','string','boolean'].indexOf(dataType)>=0){
            window.localStorage.setItem(name,data);
        }else{
            alert('不能存')
        }
    }
    getStorage(name){
        let data = window.localStorage.getItem(name);
        if(data){
            return JSON.parse(data);
        }else{
            return "";
        }
    }
    removeStorage(name){
        window.localStorage.removeItem(name)
    }
}
export default MUtil;