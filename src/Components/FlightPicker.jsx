import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import FlightCard from './Flights/Card';

class FlightPicker extends Component {
  constructor(props) {
    super(props);
    this.fetchAirports = this.fetchAirports.bind(this);
    this.fetchFlights = this.fetchFlights.bind(this);
    this.handleOrders = this.handleOrders.bind(this);

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
        console.log(data);
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

  handleOrders(orders) {
    const { basket } = this.state;
    basket.push(...orders);
    this.setState({ basket });
    console.log(basket);
  }

  render() {
    return (
      <div className="pane">
        {this.state.loaded && (
          <React.Fragment>
            <h2>{this.state.from.name} — {this.state.to.name}</h2>
            <div className="flight-cards">
              {this.state.flights.map(flight => (
                <FlightCard flight={flight}  onOrder={this.handleOrders} key={flight._id} />
              ))}
            </div>
            {this.props.dateBack && (
              <React.Fragment>
                <h2>{this.state.to.name} — {this.state.from.name}</h2>
                <div className="flight-cards">
                  {this.state.flightsBack.map(flight => (
                    <FlightCard flight={flight} onOrder={this.handleOrders} key={flight._id} />
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
