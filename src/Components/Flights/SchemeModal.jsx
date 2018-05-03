import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Scheme from './Scheme';

class SchemeModal extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      scheme: this.props.flight.plane.scheme,
      selection: [],
    };
  }

  handleClick(i, j) {
    const { scheme, selection } = this.state;

    if (scheme[i][j].selected) {
      scheme[i][j].selected = false;
      selection.splice(
        selection.findIndex(seatNum => seatNum === scheme[i][j].seatNum),
        1,
      );
    } else {
      scheme[i][j].selected = true;
      selection.push(scheme[i][j].seatNum);
    }

    console.log(selection);

    this.setState({ scheme, selection });
  }

  handleSubmit() {
    const { flight } = this.props;
    const { selection } = this.state;

    const orders = selection.map(seatNum => ({
      flight: {
        _id: flight._id,
        origin: flight.connection.originAirport.code,
        destination: flight.connection.destinationAirport.code,
        departure: flight.connection.departureTime,
        arrival: flight.connection.arrivalTime,
        date: flight.date,
      },
      seat: seatNum,
      price: {
        _id: flight.price._id,
        amount: flight.price.amount,
      },
    }));

    this.props.onSubmit(orders);
  }

  render() {
    return (
      <div className="modal fade" id={this.props.id}>
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h4 className="modal-title">Оберіть місця</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>

            <div className="modal-body">
              <Scheme scheme={this.state.scheme} onClick={this.handleClick} />
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-outline-success" onClick={this.handleSubmit}>
                У кошик
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

SchemeModal.propTypes = {
  id: PropTypes.string.isRequired,
  flight: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,

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

    plane: PropTypes.shape({
      scheme: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
        empty: PropTypes.bool,
        seatNum: PropTypes.number,
      }))).isRequired,
    }).isRequired,
  }).isRequired,

  onSubmit: PropTypes.func.isRequired,
};

export default SchemeModal;
