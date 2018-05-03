import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Scheme extends Component {
  render() {
    const Empty = (i, j) => (
      <button
        type="button"
        onClick={e => this.props.onClick(i, j, e)}
        className="btn scheme-cell"
        key={(i * 100) + j}
      />
    );

    const ReservedSeat = (seatNum, i, j) => (
      <button
        type="button"
        className="btn btn-outline-light scheme-cell"
        key={(i * 100) + j}
      >
        {seatNum}
      </button>
    );

    const SelectedSeat = (seatNum, i, j) => (
      <button
        type="button"
        onClick={e => this.props.onClick(i, j, e)}
        className="btn btn-primary scheme-cell"
        key={(i * 100) + j}
      >
        {seatNum}
      </button>
    );

    const AvailableSeat = (seatNum, i, j) => (
      <button
        type="button"
        onClick={e => this.props.onClick(i, j, e)}
        className="btn btn-outline-primary scheme-cell"
        key={(i * 100) + j}
      >
        {seatNum}
      </button>
    );

    return (
      <div className="scheme">
        {this.props.scheme.map((row, i) => (
          <div className="scheme-row" key={i}>
            {row.map((cell, j) => {
              if (cell.empty) {
                return Empty(i, j);
              } else if (cell.reserved) {
                return ReservedSeat(cell.seatNum, i, j);
              } else if (cell.selected) {
                return SelectedSeat(cell.seatNum, i, j);
              }
              return AvailableSeat(cell.seatNum, i, j);
            })}
          </div>
        ))}
      </div>
    );
  }
}

Scheme.defaultProps = {
  onClick: () => {},
};

Scheme.propTypes = {
  scheme: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    empty: PropTypes.bool,
    seatNum: PropTypes.number,
  }))).isRequired,
  onClick: PropTypes.func,
};

export default Scheme;
