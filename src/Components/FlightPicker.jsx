import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import FlightCard from './Flights/Card';

class FlightPicker extends Component {
  constructor(props) {
    super(props);
    this.fetchAirports = this.fetchAirports.bind(this);
    this.fetchFlights = this.fetchFlights.bind(this);
    this.handlePick = this.handlePick.bind(this);

    this.state = {
      from: { name: '' },
      to: { name: '' },
      loaded: false,
      flights: [],
      flightsBack: [],
      basket: [],
    };
  }

  componentDidMount() {
    const { from, to, date, dateBack } = this.props;
    this.fetchAirports(from, to);
    this.fetchFlights(from, to, date, dateBack);
  }

  componentWillReceiveProps(nextProps) {
    const { from, to, date, dateBack } = nextProps;
    this.fetchAirports(from, to);
    this.fetchFlights(from, to, date, dateBack);
  }

  fetchAirports(fromId, toId) {
    axios.get(`http://localhost:3000/airports/${fromId}`)
      .then(({ data }) => {
        this.setState({ from: data });
      })
      .catch((error) => {
        console.log(error);
      });

    axios.get(`http://localhost:3000/airports/${toId}`)
      .then(({ data }) => {
        this.setState({ to: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchFlights(from, to, date, dateBack) {
    axios.get(`http://localhost:3000/flights/find/${from}/${to}/${date}`)
      .then(({ data }) => {
        this.setState({ flights: data, loaded: true });
      })
      .catch((error) => {
        console.log(error);
      });

    // back
    if (dateBack) {
      axios.get(`http://localhost:3000/flights/find/${to}/${from}/${dateBack}`)
        .then(({ data }) => {
          this.setState({ flightsBack: data, loaded: true });
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  handlePick(flight) {
    const { basket } = this.state;
    const newBasket = [...basket];
    newBasket.push(flight);
    this.setState({ basket: newBasket });
    console.log(newBasket);
  }

  render() {
    return (
      <div className="pane">
        {this.state.loaded && (
          <React.Fragment>
            <h2>{this.state.from.name} — {this.state.to.name}</h2>
            <div className="flight-cards">
              {this.state.flights.map(flight => (
                <FlightCard flight={flight} onPick={this.handlePick} key={flight._id} />
              ))}
            </div>
            {this.props.dateBack && (
              <React.Fragment>
                <h2>{this.state.to.name} — {this.state.from.name}</h2>
                <div className="flight-cards">
                  {this.state.flightsBack.map(flight => (
                    <FlightCard flight={flight} onPick={this.handlePick} key={flight._id} />
                  ))}
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
        {!this.state.loaded && (
          <div>loading...</div>
        )}
      </div>
    );
  }
}

FlightPicker.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  dateBack: PropTypes.string,
};

export default FlightPicker;
