import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

class Basket extends Component {
  constructor(props) {
    super(props);
    this.handleBuy = this.handleBuy.bind(this);
  }

  handleBuy() {
    Promise.all(this.props.basket.map(order => (
      axios.post('http://localhost:3000/tickets/new', {
        flightId: order.flight._id,
        priceId: order.price._id,
        seat: order.seat,
        passanger: order.passanger,
      }, { withCredentials: true })
    )))
      .then(() => {
        this.props.onBought();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="modal fade" id="basket">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h4 className="modal-title">Кошик</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>

            <div className="modal-body">
              {this.props.basket.length === 0 && (
                <div className="empty-label">Тут поки порожньо...</div>
              )}
              {this.props.basket.map((item, index) => (
                <div className="card basket-card" key={`${item.flight._id}-${item.seat}`}>
                  <div className="card-body">
                    <div className="basket-card-info">
                      <div className="basket-card-from">
                        <h3>{item.flight.origin}</h3>
                        <h3>{item.flight.departure}</h3>
                      </div>
                      <div className="basket-card-arrow">
                        <span className="oi oi-arrow-right" />
                      </div>
                      <div className="basket-card-to">
                        <h3>{item.flight.destination}</h3>
                        <h3>{item.flight.arrival}</h3>
                      </div>
                      <div className="basket-cart-two-row-info">
                        <div>{item.flight.date.toString().slice(0, 10)}</div>
                        <div className="text-danger basket-card-price">{item.price.amount} ₴ </div>
                      </div>
                    </div>
                    <form>
                      <div className="form-group">
                        <label htmlFor="basket-pass-fn">Ім'я:</label>
                        <input type="text" name="firstname" value={item.passanger.firstname} onChange={e => this.props.onPassangerChange(index, 'firstname', e.target.value)} className="form-control" id="basket-pass-fn" />
                      </div>
                      <div className="form-group">
                        <label htmlFor="basket-pass-sn">Прізвище:</label>
                        <input type="text" name="surname" value={item.passanger.surname} onChange={e => this.props.onPassangerChange(index, 'surname', e.target.value)} className="form-control" id="basket-pass-sn" />
                      </div>
                    </form>
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <div className="text-danger basket-card-price">
                {this.props.basket.reduce((sum, current) => (sum + current.price.amount), 0)} ₴
              </div>
              <button type="button" className="btn btn-outline-success" onClick={this.handleBuy}>Купити</button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

Basket.propTypes = {
  basket: PropTypes.arrayOf(PropTypes.shape({
    flight: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      origin: PropTypes.string.isRequired,
      destination: PropTypes.string.isRequired,
      departure: PropTypes.string.isRequired,
      arrival: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    }).isRequired,
    price: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
    }).isRequired,
    seat: PropTypes.number,
    passanger: PropTypes.shape({
      firstname: PropTypes.string.isRequired,
      surname: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,

  onOrderRemove: PropTypes.func.isRequired,
  onPassangerChange: PropTypes.func.isRequired,
  onBought: PropTypes.func.isRequired,
};

export default Basket;
