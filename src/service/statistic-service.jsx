/*
 * @Author: yangli 
 * @Date: 2018-04-19 13:35:27 
 * @Last Modified by: yangli
 * @Last Modified time: 2018-04-19 16:24:33
 */
import MUtil from 'util/mm.jsx';
const _mm = new MUtil();

class Statistic{
    getHomeCount(){
        return _mm.request({
            url:'/manage/statistic/base_count.do',
        }); 
    }
}

export default Statistic;