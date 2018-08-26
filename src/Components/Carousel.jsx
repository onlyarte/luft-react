import React, { Component } from 'react';

class Carousel extends Component {
  constructor(props) {
    super(props);

    this.defaultItems = [
      {
        img: 'https://preview.ibb.co/mMOThp/maxresdefault.jpg',
        title: 'Київ',
        text: 'Від 200 грн',
      },
      {
        img: 'https://image.ibb.co/d7Zqv9/maxresdefault.jpg',
        title: 'Харків',
        text: 'Від 500 грн',
      },
    ];

    this.state = {
      items: this.defaultItems,
    };
  }

  render() {
    return (
      <div id="demo" className="carousel slide" data-ride="carousel">

        {/* Indicators */}
        <ul className="carousel-indicators">
          {this.state.items.map((item, index) => (
            <li data-target="#demo" data-slide-to={index} className={index === 0 ? 'active' : ''} key={index} />
          ))}
        </ul>

        {/* The slideshow */}
        <div className="carousel-inner">        
          {this.state.items.map((item, index) => (
            <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
              <img src={item.img} alt={item.title} />
              <div className="carousel-caption">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Left and right controls */}
        <a className="carousel-control-prev" href="#demo" data-slide="prev">
          <span className="carousel-control-prev-icon" />
        </a>
        <a className="carousel-control-next" href="#demo" data-slide="next">
          <span className="carousel-control-next-icon" />
        </a>

      </div>
    );
  }
}

export default Carousel;
