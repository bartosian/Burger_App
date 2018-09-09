import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuild from './containers/BurgerBuild/BurgerBuild';
import { Route, Switch } from 'react-router-dom';
import Checkout from './containers/Checkout/Checkout';


class App extends Component {
  render() {
    return (
              <div>
                <Layout>
                    <Switch>
                        <Route path="/checkout" component={ Checkout } />
                        <Route path="/" exact component={ BurgerBuild } />
                    </Switch>
                </Layout>
              </div>
    );
  }
}

export default App;
