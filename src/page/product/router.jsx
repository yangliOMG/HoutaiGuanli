/*
 * @Author: yangli 
 * @Date: 2018-04-20 09:10:53 
 * @Last Modified by: yangli
 * @Last Modified time: 2018-04-20 17:21:22
 */
import React from 'react';
import {BrowserRouter as Router, Route,Switch, Link,Redirect} from 'react-router-dom';

import ProductList from 'page/product/index/index.jsx';
import ProductSave from 'page/product/index/save.jsx';
import ProductDetail from 'page/product/index/detail.jsx';

class ProductRouter extends React.Component{
  render(){
    return (
        <Switch>
          <Route path="/product/index" component={ProductList}/>
          <Route path="/product/save/:pid?" component={ProductSave}/>
          <Route path="/product/detail/:pid" component={ProductDetail}/>
          <Redirect exact from="/product" to="/product/index"/>
        </Switch>
    )
  }
}
export default ProductRouter