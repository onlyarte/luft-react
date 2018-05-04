import React, { Component } from 'react';
import './App.css';

import Basket from './Components/Basket';
import RoutePicker from './Components/RoutePicker';
import FlightPicker from './Components/FlightPicker';
import Carousel from './Components/Carousel';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleRoutePick = this.handleRoutePick.bind(this);
    this.handleOrdersAdd = this.handleOrdersAdd.bind(this);
    this.handleOrderRemove = this.handleOrderRemove.bind(this);
    this.handlePassangerChange = this.handlePassangerChange.bind(this);

    this.state = {
      route: {
        selected: false,
        from: null,
        to: null,
        date: null,
        dateBack: null,
      },
      basket: [],
    };
  }

  handleRoutePick({ from, to, date, dateBack }) {
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
    console.log(uniqueBasket);
  }

  handleOrderRemove(order) {
    const { basket } = this.state;
    const newBasket = basket.filter(item => (
      !(item.flight._id === order.flight._id && item.seat === order.seat)
    ));
    this.setState({ basket: newBasket });
    console.log(newBasket);
  }

  handlePassangerChange(index, prop, val) {
    console.log({index, prop, val});
    const { basket } = this.state;
    basket[index].passanger[prop] = val;
    this.setState({ basket });
    console.log(basket);
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
                />
                <RoutePicker onPick={this.handleRoutePick} />
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
                onOrdersAdd={this.handleOrdersAdd}
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
