/*
 * @Author: yangli 
 * @Date: 2018-04-19 16:28:50 
 * @Last Modified by: yangli
 * @Last Modified time: 2018-04-23 14:19:42
 */
import React from 'react';
import {Link} from 'react-router-dom'
import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

import PageTitle from 'component/page-title/index.jsx';
import TableList from 'util/table-list/index.jsx';

// import './index.scss'

const _mm = new MUtil();
const _product = new Product();

class CategoryList extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categoryId : this.props.match.params.cid ,
            list : []
        }
    }
    componentDidMount(){
        this.loadCategoryList()
    }
    componentDidUpdate(prevProps,prevState){
        let oldPath = prevProps.location.pathname,
            newPath = this.props.location.pathname,
            newId = this.props.match.params.cid || 0;
        if(oldPath !==newPath){
            this.setState({
                categoryId : newId
            },()=>{
                this.loadCategoryList()
            })
        }
    }
    loadCategoryList(){
        _product.getCategoryList(this.state.categoryId).then(res=>{
            this.setState({
                list : res
            });
        },errMsg=>{
            this.setState({
                list:[]
            })
            _mm.errorTips(errMsg)
        });
    }
    onModifyCategory(id,name){
        let newName= window.prompt("修改内容：",name);
        if(newName){
            _product.updateCategoryName({
                categoryId:id,
                categoryName: newName
            }).then(res=>{
                _mm.successTips(res);
                this.loadCategoryList();
            },errMsg=>{
                _mm.errorTips(errMsg);
            })
        }
    }
    render(){
        let tableHeads = [
          {name:'品类ID',width:'10%'},
          {name:'名称',width:'50%'},
          {name:'操作',width:'40%'},
        ]
        return (
            <div id="page-wrapper">
                <PageTitle title="品类列表">
                    <div className="page-header-right">
                        <Link to="/product-category/add" className="btn btn-primary">
                            <i className="fa fa-plus"></i>
                            <span>添加品类</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <p>当前目录：{this.state.categoryId}</p>
                    </div>
                </div>
                <div className="row">
                    <TableList title={tableHeads}>
                        { 
                          this.state.list.map((cate,index)=>{
                            return (
                                <tr key={index}> 
                                    <td>{cate.id}</td>
                                    <td>{cate.name}</td>
                                    <td>
                                        {
                                            cate.parentId === 0 ?
                                                <Link className="opear" to={`/product-category/index/${cate.id}`}>查看子类</Link>
                                                : null
                                        }
                                        <a className="opear"
                                            onClick={e=>this.onModifyCategory(cate.id,cate.name)}>编辑</a>
                                    </td>
                                </tr>
                            )
                          })
                        }
                    </TableList>
                </div>
            </div>
        )
    }
}

export default CategoryList;