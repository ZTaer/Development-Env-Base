import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';

import HomePages from './pages/homepages/homepages.component';
import Example from './pages/examplepages/example.component';
import Header from './components/header/header.component';

import { GlobalStyled } from './global.styles';

function App() {

  return (
    <div className="App">
      <Header />
      <GlobalStyled />
      <Switch>
        <Route exact={true} path="/" component={HomePages} />
        <Route exact={true} path="/example" component={Example} />
      </Switch>
    </div>
  );
}

export default App;
