import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import RoutePicker from './Components/RoutePicker';
import Carousel from './Components/Carousel';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="row no-gutters">
          <div className="col-12 col-md-3">
            <div className="card LeftBlock">
              <div className="card-body">
                <h6 className="Label">LUFT // АВІАКВИТКИ</h6>
                <RoutePicker />
              </div>
            </div>
          </div>
          <div className="col-12 col-md-9">
            <Carousel />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
