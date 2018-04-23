/*
 * @Author: yangli 
 * @Date: 2018-04-20 09:10:53 
 * @Last Modified by: yangli
 * @Last Modified time: 2018-04-23 13:57:10
 */
import React from 'react';
import {BrowserRouter as Router, Route,Switch, Link,Redirect} from 'react-router-dom';

import ProductList from 'page/product/index/index.jsx';
import ProductSave from 'page/product/index/save.jsx';
import ProductDetail from 'page/product/index/detail.jsx';
import ProductCategory from 'page/product/category/index.jsx';
import CategoryAdd from 'page/product/category/add.jsx';

class ProductRouter extends React.Component{
  render(){
    return (
        <Switch>
          <Route path="/product/index" component={ProductList}/>
          <Route path="/product/save/:pid?" component={ProductSave}/>
          <Route path="/product/detail/:pid" component={ProductDetail}/>
          <Route path="/product-category/index/:cid?" component={ProductCategory}/>
          <Route path="/product-category/add" component={CategoryAdd}/>
          <Redirect exact from="/product" to="/product/index"/>
          <Redirect exact from="/product-category" to="/product-category/index"/>
        </Switch>
    )
  }
}
export default ProductRouter