import React from "react";
import './TopNavigation.css';

export default class TopNavigation extends React.Component {

  render() {
    return (
      <div className="topNavigation">
        <ul>
          <li>
            <a href="home">
              <button>Home</button>
            </a>
          </li>
          <li>
            <a href="game">
              <button>Game</button>
            </a>
          </li>
        </ul>
      </div>
    );
  }
}