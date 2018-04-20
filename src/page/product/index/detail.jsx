/*
 * @Author: yangli 
 * @Date: 2018-04-19 16:28:50 
 * @Last Modified by: yangli
 * @Last Modified time: 2018-04-20 17:20:03
 */
import React from 'react';
import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

import PageTitle from 'component/page-title/index.jsx';
import CategorySelector from './category-selector.jsx';

import './index.scss'

const _mm = new MUtil();
const _product = new Product();

class ProductDetail extends React.Component{
    constructor(props){
        super(props);
        this.state={
            id:this.props.match.params.pid,
            name:"",
            subtitle:"",
            price:"",
            stock:"",
            detail:"",
            status:1,
            categoryId:0,
            parentCategoryId:0,
            subImages:[]
        }
    }
    componentDidMount(){
        this.loadProduct();
    }
    loadProduct(){
        if(this.state.id){
            _product.getProduct(this.state.id).then(res=>{
                let images = res.subImages.split(',');
                res.subImages = images.map(imgUri=>{
                    return{
                        uri: imgUri,
                        url: res.imageHost + imgUri
                    }
                });
                this.setState(res);
            },errMsg=>{
                _mm.errorTips(errMsg);
            })
        }
    }
    getSubImagesString(){
        return this.state.subImages.map((image)=>image.uri).join(',')
    }

    render(){
        return (
            <div id="page-wrapper">
                <PageTitle title="添加商品">
                </PageTitle>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-sm-2 control-label">商品名称</label>
                        <div className="col-sm-5">
                            <p className="form-control-static">{this.state.name}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">商品描述</label>
                        <div className="col-sm-5">
                            <p className="form-control-static">{this.state.subtitle}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">所属分类</label>
                        <div className="col-sm-10">
                            <CategorySelector 
                                readOnly
                                categoryId={this.state.categoryId}
                                parentCategoryId={this.state.parentCategoryId} ></CategorySelector>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">商品价格</label>
                        <div className="col-sm-3">
                            <div className="input-group">
                                <input type="number" className="form-control" 
                                        value ={this.state.price} readOnly />
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">商品库存</label>
                        <div className="col-sm-3">
                            <div className="input-group">
                                <input type="number" className="form-control" 
                                        value ={this.state.stock} readOnly/>
                                <span className="input-group-addon">件</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">商品图片</label>
                        <div className="col-sm-10">
                            {
                                this.state.subImages.length ? this.state.subImages.map(
                                    (item,idx)=>(
                                    <div key={idx} className="img-icon">
                                        <img src={item.url} />
                                    </div>)    
                                ) : <div>无图片</div>
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">商品详情</label>
                        <div className="col-sm-10" dangerouslySetInnerHTML={{__html:this.state.detail}}>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetail;