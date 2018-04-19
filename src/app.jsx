import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route,Switch, Link,Redirect} from 'react-router-dom';

import Layout from 'component/layout/index.jsx';
import Home from 'page/home/index.jsx';

class App extends React.Component{
  render(){
    return (
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/product" component={Home} />
            <Route exact path="/product-category" component={Home} />
            {/* <Redirect from="*" to="/" /> */}
          </Switch>
        </Layout>
      </Router>
    )
  }
}

ReactDOM.render(
  <App/> ,
  document.getElementById('app')
);