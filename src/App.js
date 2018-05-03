import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import RoutePicker from './Components/RoutePicker';
import FlightPicker from './Components/FlightPicker';
import Carousel from './Components/Carousel';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleRoutePicked = this.handleRoutePicked.bind(this);

    this.state = {
      route: {
        selected: false,
        from: null,
        to: null,
        date: null,
        dateBack: null,
      },
    };
  }

  handleRoutePicked({ from, to, date, dateBack }) {
    console.log({ from, to });
    this.setState({
      route: {
        from,
        to,
        date,
        dateBack,
        selected: true,
      },
    });
  }

  render() {
    return (
      <div className="App">
        <div className="row no-gutters">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card LeftBlock">
              <div className="card-body">
                <h6 className="Label">LUFT // АВІАКВИТКИ</h6>
                <RoutePicker onPick={this.handleRoutePicked} />
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-8 col-lg-9">
            {this.state.route.selected && (
              <FlightPicker
                from={this.state.route.from}
                to={this.state.route.to}
                date={this.state.route.date}
                dateBack={this.state.route.dateBack}
              />
            )}
            {!this.state.route.selected && (
              <Carousel />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
