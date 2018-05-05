import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tickets extends Component {
  render() {
    return (
      <div className="modal fade" id="tickets">
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h4 className="modal-title">Мої квитки</h4>
              <button type="button" className="close" data-dismiss="modal">&times;</button>
            </div>

            <div className="modal-body">
              {this.props.tickets.length === 0 && (
                <div className="empty-label">Тут поки порожньо...</div>
              )}
              {this.props.tickets.map((ticket, index) => (
                <div className="card basket-card" key={`${ticket.flight._id}-${ticket.seat}`}>
                  <div className="card-body">
                    <div className="basket-card-info">
                      <div className="basket-card-from">
                        <h3>{ticket.flight.origin}</h3>
                        <h3>{ticket.flight.departure}</h3>
                      </div>
                      <div className="basket-card-arrow">
                        <span className="oi oi-arrow-right" />
                      </div>
                      <div className="basket-card-to">
                        <h3>{ticket.flight.destination}</h3>
                        <h3>{ticket.flight.arrival}</h3>
                      </div>
                      <div className="basket-cart-two-row-info">
                        <div>{ticket.flight.date.toString().slice(0, 10)}</div>
                        <div className="text-danger basket-card-price">{ticket.price} ₴ </div>
                      </div>
                    </div>
                    <form>
                      <div className="form-group">
                        <label htmlFor="basket-pass-fn">Ім'я:</label>
                        <input
                          type="text"
                          name="firstname"
                          value={ticket.passanger.firstname}
                          className="form-control"
                          id="basket-pass-fn"
                          readOnly
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="basket-pass-sn">Прізвище:</label>
                        <input
                          type="text" name="surname"
                          value={ticket.passanger.surname}
                          className="form-control"
                          id="basket-pass-sn"
                          readOnly
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="basket-pass-code">Код підтвердження:</label>
                        <input
                          type="text" name="code"
                          value={ticket._id}
                          className="form-control"
                          id="basket-pass-code"
                          readOnly
                        />
                      </div>
                    </form>
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-outline-success" data-dismiss="modal">Закрити</button>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

Tickets.propTypes = {
  tickets: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string.isRequired,
    flight: PropTypes.shape({
      origin: PropTypes.string.isRequired,
      destination: PropTypes.string.isRequired,
      departure: PropTypes.string.isRequired,
      arrival: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      plane: PropTypes.string.isRequired,
    }).isRequired,
    price: PropTypes.number.isRequired,
    seat: PropTypes.number,
    passanger: PropTypes.shape({
      firstname: PropTypes.string.isRequired,
      surname: PropTypes.string.isRequired,
    }).isRequired,
  })).isRequired,
};

export default Tickets;
