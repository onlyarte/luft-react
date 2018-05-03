import React, { Component } from 'react';
import PropTypes from 'prop-types';

class FlightCard extends Component {
  render() {
    const { flight, onPick } = this.props;
    return (
      <div className="card flight-card">
        <div className="card-body">
          <div className="flight-card-info">
            <div className="flight-card-from">
              <h3>{flight.connection.originAirport.code}</h3>
              <h3>{flight.connection.departureTime}</h3>
            </div>
            <div className="flight-card-arrow">
              <span className="oi oi-arrow-right" />
            </div>
            <div className="flight-card-to">
              <h3>{flight.connection.destinationAirport.code}</h3>
              <h3>{flight.connection.arrivalTime}</h3>
            </div>
          </div>
          <div className="flight-card-order">
            <div className="text-danger flight-card-price">{flight.price.amount} ₴ </div>
            <button type="button" onClick={e => onPick(flight, e)} className="btn btn-outline-success">Далі</button>
          </div>
        </div>
      </div>
    );
  }
}

FlightCard.propTypes = {
  flight: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    price: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    }).isRequired,
    connection: PropTypes.shape({
      originAirport: PropTypes.shape({
        code: PropTypes.string.isRequired,
      }).isRequired,
      destinationAirport: PropTypes.shape({
        code: PropTypes.string.isRequired,
      }).isRequired,
      departureTime: PropTypes.string.isRequired,
      arrivalTime: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  onPick: PropTypes.func.isRequired,
};

export default FlightCard;
