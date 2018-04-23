/*
 * @Author: yangli 
 * @Date: 2018-04-19 16:28:50 
 * @Last Modified by: yangli
 * @Last Modified time: 2018-04-23 14:24:39
 */
import React from 'react';
import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

import PageTitle from 'component/page-title/index.jsx';

const _mm = new MUtil();
const _product = new Product();

class CategoryAdd extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            categoryList : [] ,
            parentCategoryId : 0,
            categoryId :  0,
            categoryName : ''
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
        _product.getCategoryList().then(res=>{
            this.setState({
                categoryList : res
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
                name: newName
            }).then(res=>{
                _mm.successTips(res);
                this.loadProductList();
            },errMsg=>{
                _mm.errorTips(errMsg);
            })
        }
    }
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value;
        this.setState({
            [name]:value
        })
    }
    onSubmit(e){
        let categoryName = this.state.categoryName.trim();
        if(categoryName){
            _product.saveCategory({
                parentId : this.state.parentCategoryId,
                categoryName : categoryName
            }).then(res=>{
                _mm.successTips(res);
                this.props.history.push('/product-category');
            }, errMsg=>
                _mm.errorTips(errMsg)
            )
        }else{
            _mm.errorTips("请输入名称")
        }
    }
    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="添加品类">
                </PageTitle>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-sm-2 control-label">所属分类</label>
                        <div className="col-sm-5">
                            <select className="form-control"
                                onChange={e=>this.onValueChange(e)}>
                                <option value="0">根品类/</option>
                                {
                                    this.state.categoryList.map((cate,index)=>{
                                        return <option value={cate.id} key={index}>根品类/{cate.name}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">品类名称</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control" 
                                    placeholder="输入名称"
                                    name="categoryName"
                                    value ={this.state.categoryName}
                                    onChange={e=>this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-2 col-sm-10">
                            <button className="btn btn-primary" onClick={e=>this.onSubmit(e)}>保存</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CategoryAdd;