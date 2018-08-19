import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuild from './containers/BurgerBuild/BurgerBuild';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <BurgerBuild />
        </Layout>
      </div>
    );
  }
}

export default App;
