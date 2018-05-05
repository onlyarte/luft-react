import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

import Basket from './Components/Basket';
import Tickets from './Components/Tickets';
import RoutePicker from './Components/RoutePicker';
import FlightPicker from './Components/FlightPicker';
import Carousel from './Components/Carousel';
import AuthModal from './Components/Auth/AuthModal';

class App extends Component {
  constructor(props) {
    super(props);
    this.fetchUser = this.fetchUser.bind(this);
    this.fetchTickets = this.fetchTickets.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

    this.handleRoutePick = this.handleRoutePick.bind(this);

    this.handleOrdersAdd = this.handleOrdersAdd.bind(this);
    this.handleOrderRemove = this.handleOrderRemove.bind(this);
    this.handlePassangerChange = this.handlePassangerChange.bind(this);

    this.state = {
      route: null,
      basket: [],
      user: null,
      tickets: [],
    };
  }

  componentDidMount() {
    this.fetchUser();
    this.fetchTickets();
  }

  fetchUser() {
    axios.get(
      'http://localhost:3000/users/current',
      { withCredentials: true },
    )
      .then(({ data }) => {
        console.log(data);
        this.setState({ user: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  fetchTickets() {
    axios.get(
      'http://localhost:3000/users/tickets',
      { withCredentials: true },
    )
      .then(({ data }) => {
        console.log(data);
        this.setState({ tickets: data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleLogin(user) {
    this.setState({ user });
  }

  handleLogout() {
    axios.delete('http://localhost:3000/users/logout', { withCredentials: true })
      .then(() => {
        this.setState({ user: null });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  handleRoutePick({ from, to, date, dateBack }) {
    this.setState({ route: { from, to, date, dateBack } });
  }

  handleOrdersAdd(orders) {
    const { basket } = this.state;
    basket.push(...orders);
    const uniqueBasket = basket.filter((item, pos, items) => (
      items.findIndex(curr =>
        curr.flight._id === item.flight._id
        && curr.seat === item.seat)
        === pos
    ));
    this.setState({ basket: uniqueBasket });
  }

  handleOrderRemove(order) {
    const { basket } = this.state;
    const newBasket = basket.filter(item => (
      !(item.flight._id === order.flight._id && item.seat === order.seat)
    ));
    this.setState({ basket: newBasket });
  }

  handlePassangerChange(index, prop, val) {
    const { basket } = this.state;
    basket[index].passanger[prop] = val;
    this.setState({ basket });
  }

  render() {
    return (
      <div className="App">
        <div className="row no-gutters">
          <div className="col-12 col-sm-6 col-md-4 col-lg-3">
            <div className="card LeftBlock">
              <div className="card-body">
                <nav className="navbar navbar-light bg-light navbar-full-width">
                  <div className="navbar-brand">LUFT</div>
                  <div className="btn-group">
                    <button className="btn btn-outline-success" type="button" data-toggle="modal" data-target="#basket">
                      <span className="oi oi-cart" />
                    </button>
                    <button className="btn btn-outline-dark" type="button" data-toggle="collapse" data-target="#hidden-navbar" aria-expanded="false" aria-label="Toggle navigation">
                      <span className="oi oi-menu" />
                    </button>
                  </div>
                  <div className="collapse navbar-collapse" id="hidden-navbar">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                      <li className="nav-item">
                        <a className="nav-link" href="#basket" data-toggle="modal" data-target="#basket">Кошик</a>
                      </li>
                      {!this.state.user && (
                        <li className="nav-item">
                          <a className="nav-link" href="#auth" data-toggle="modal" data-target="#auth">Увійти</a>
                        </li>
                      )}
                      {this.state.user && (
                        <React.Fragment>
                          <li className="nav-item">
                            <a className="nav-link" href="#tickets" data-toggle="modal" data-target="#tickets">Мої квитки</a>
                          </li>
                          <li className="nav-item">
                            <a className="nav-link" href="#logout" onClick={this.handleLogout}>Вийти</a>
                          </li>
                        </React.Fragment>
                      )}
                      <li className="nav-item">
                        <a className="nav-link" href="#">Контакти</a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="#">Інформація</a>
                      </li>
                    </ul>
                  </div>
                </nav>
                <Basket
                  basket={this.state.basket}
                  onOrderRemove={this.handleOrderRemove}
                  onPassangerChange={this.handlePassangerChange}
                  user={this.state.user ? this.state.user._id : null}
                  onBought={this.fetchTickets}
                />
                <Tickets
                  tickets={this.state.tickets}
                />
                {!this.state.user && (
                  <AuthModal onLogin={this.handleLogin} />
                )}
                <RoutePicker onPick={this.handleRoutePick} />
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-8 col-lg-9">
            {this.state.route && (
              <FlightPicker
                from={this.state.route.from}
                to={this.state.route.to}
                date={this.state.route.date}
                dateBack={this.state.route.dateBack}
                onOrdersAdd={this.handleOrdersAdd}
              />
            )}
            {!this.state.route && (
              <Carousel />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
