/*
 * @Author: yangli 
 * @Date: 2018-04-20 09:10:53 
 * @Last Modified by: yangli
 * @Last Modified time: 2018-04-20 17:15:03
 */
import React from 'react';
import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

import './category-selector.scss'

const _mm = new MUtil();
const _product = new Product();



class CategorySelector extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            firstCategoryList : [],
            firstCategoryId : 0,
            secondCategoryList: [],
            secondCategoryId : 0, 
        }
    }

    componentDidMount(){
        this.loadFirstCategory();
    }
    componentWillReceiveProps(nextProps){
        let categoryIdChange = this.props.categoryId !== nextProps.categoryId,
            parentCategoryIdChange = this.props.parentCategoryId !== nextProps.parentCategoryId;
        if(!categoryIdChange && !parentCategoryIdChange){
            return;
        }
        if(nextProps.parentCategoryId === 0){
            this.setState({
                firstCategoryId: nextProps.categoryId,
                secondCategoryId:0
            })
        }else{
            this.setState({
                firstCategoryId: nextProps.parentCategoryId,
                secondCategoryId: nextProps.categoryId
            },()=>{
                parentCategoryIdChange && this.loadSecondCategory();
            })
        }
    }

    loadFirstCategory(){
        _product.getCategoryList(this.state.firstCategoryId).then(res=>{
            this.setState({
                firstCategoryList:res
            })
        }, errMsg=>{
            _mm.errorTips(errMsg)
        })
    }
    loadSecondCategory(){
        _product.getCategoryList(this.state.firstCategoryId).then(res=>{
            this.setState({
                secondCategoryList:res
            })
        }, errMsg=>{
            _mm.errorTips(errMsg)
        })
    }

    onFirstCategoryChange(e){
        if(this.props.readOnly){
            return
        }
        let newValue = e.target.value || 0;
        this.setState({
            firstCategoryId : newValue,
            secondCategoryList: [],
            secondCategoryId : 0, 
        },()=>{
            this.loadSecondCategory();
            this.onPropsCategoryChange();
        })
    }
    onSecondCategoryChange(e){
        if(this.props.readOnly){
            return
        }
        let newValue = e.target.value || 0;
        this.setState({
            secondCategoryId : newValue, 
        },()=>{
            this.onPropsCategoryChange();
        })
    }

    onPropsCategoryChange(){
        let categoryChangable = typeof this.props.onCategoryChange === 'function';
        if(this.state.secondCategoryId){
            categoryChangable && this.props.onCategoryChange(this.state.secondCategoryId,this.state.firstCategoryId)
        }else{
            categoryChangable && this.props.onCategoryChange(this.state.firstCategoryId,0)
            
        }
    }

    render(){
        return (
            <div >
                <select className="form-control cate-select"
                        value={this.state.firstCategoryId}
                        readOnly={this.props.readOnly}
                        onChange={e=>this.onFirstCategoryChange(e)}>
                    <option value="">请选择</option>
                    {
                        this.state.firstCategoryList.map(
                            (category,index)=><option value={category.id} key={index}>{category.name}</option>)
                    }
                </select>
                {this.state.secondCategoryList.length ? (
                        <select name="" className="form-control cate-select"
                                value={this.state.secondCategoryId}
                                readOnly={this.props.readOnly}
                                onChange={e=>this.onSecondCategoryChange(e)}>
                            <option value="">请选择</option>
                            {
                                this.state.secondCategoryList.map(
                                    (category,index)=><option value={category.id} key={index}>{category.name}</option>)
                            }
                        </select>
                    ) : null
                }
            </div>
        )
    }
}
export default CategorySelector