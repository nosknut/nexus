import React from "react";
import Square from "./Square.js";

export default class Board extends React.Component {

  renderSquare(i) {
    return <Square
      key={i}
      value={this.props.status.squares[i]}
      highlighted={this.props.status.highlighted.includes(i)}
      onClick={() => this.props.onClick(i)}
    />;
  }

  render() {
    return (
      <div>
        {(() => {
          let rows = [];
          for (let y = 0; y < 3; y++) {
            rows[y] = (
              <div className="board-row" key={y}>
                {(() => {
                  let cols = [];
                  for (let x = 0; x < 3; x++) {
                    cols[x] = (this.renderSquare((y * 3) + x))
                  }
                  return cols;
                })()}
              </div>);
          }
          return rows;
        })()}
      </div>
    );
  }
}