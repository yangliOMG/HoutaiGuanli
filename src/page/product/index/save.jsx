/*
 * @Author: yangli 
 * @Date: 2018-04-19 16:28:50 
 * @Last Modified by: yangli
 * @Last Modified time: 2018-04-20 17:06:57
 */
import React from 'react';
import MUtil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

import PageTitle from 'component/page-title/index.jsx';
import CategorySelector from './category-selector.jsx';
import FileUploader from 'util/file-uploader/index.jsx';
import RichEditor from 'util/rich-editor/index.jsx';

import './index.scss'

const _mm = new MUtil();
const _product = new Product();

class ProductSave extends React.Component{
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
                res.defaultDetail = res.detail;
                this.setState(res);
            },errMsg=>{
                _mm.errorTips(errMsg);
            })
        }
    }
    onCategoryChange(id,pid){
        this.setState({
            categoryId: id,
            parentCategoryId:pid
       })
    }
    onUploadSuccess(res){
        let subImages = this.state.subImages;
        subImages.push(res);
        this.setState({
             subImages: subImages
        })
    }
    onUploadError(errMsg){
        _mm.errorTips(errMsg)
    }
    onImageDelete(e){
        let index = parseInt( e.target.getAttribute('index') ),
            subImages = this.state.subImages;
        subImages.splice(index,1);
        this.setState({
            subImages:subImages
        })
    }
    onDetailChange(value){
        this.setState({
            detail : value
        })
    }
    onValueChange(e){
        let name = e.target.name,
            value = e.target.value;
        this.setState({
            [name]:value
        })
    }
    getSubImagesString(){
        return this.state.subImages.map((image)=>image.uri).join(',')
    }

    onSubmit(e){
        let product = {
            name: this.state.name,
            subtitle: this.state.subtitle,
            categoryId: parseInt(this.state.categoryId),
            subImages: this.getSubImagesString(),
            detail: this.state.detail,
            price: parseFloat(this.state.price),
            stock: parseInt(this.state.stock),
            status: this.state.status
        }
        let productCheckResult = _product.checkProduct(product);
        if(this.state.id){
            product.id = this.state.id;
        }
        if(productCheckResult.status){
            _product.saveProduct(product).then(res=>{
                _mm.successTips(res);
                this.props.history.push('/product/index');
            }, errMsg=>_mm.errorTips(errMsg))
        }else{
            _mm.errorTips(productCheckResult.msg)
        }
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
                            <input type="text" className="form-control" 
                                    placeholder="输入名称"
                                    name="name"
                                    value ={this.state.name}
                                    onChange={e=>this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">商品描述</label>
                        <div className="col-sm-5">
                            <input type="text" className="form-control" 
                                    placeholder="输入描述"
                                    name="subtitle"
                                    value ={this.state.subtitle}
                                    onChange={e=>this.onValueChange(e)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">所属分类</label>
                        <div className="col-sm-10">
                            <CategorySelector 
                                categoryId={this.state.categoryId}
                                parentCategoryId={this.state.parentCategoryId}
                                onCategoryChange={(id,pid)=>this.onCategoryChange(id,pid)}></CategorySelector>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">商品价格</label>
                        <div className="col-sm-3">
                            <div className="input-group">
                                <input type="number" className="form-control" 
                                        placeholder="价格"
                                        name="price"
                                        value ={this.state.price}
                                        onChange={e=>this.onValueChange(e)}/>
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">商品库存</label>
                        <div className="col-sm-3">
                            <div className="input-group">
                                <input type="number" className="form-control" 
                                        placeholder="库存"
                                        name="stock"
                                        value ={this.state.stock}
                                        onChange={e=>this.onValueChange(e)}/>
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
                                        <i className="fa fa-close" index={idx} onClick={e=>this.onImageDelete(e)}></i>
                                    </div>)    
                                ) : <div>请上传图片</div>
                            }
                        </div>
                        <div className="col-sm-offset-2 col-sm-10">
                            <FileUploader onSuccess={res=>this.onUploadSuccess(res)}
                                          onError={errMsg=>this.onUploadError(errMsg)}></FileUploader>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label">商品详情</label>
                        <div className="col-sm-10">
                            <RichEditor 
                                defaultDetail={this.state.defaultDetail}
                                detail={this.state.detail}
                                onValueChange={value=>this.onDetailChange(value)}></RichEditor>
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

export default ProductSave;