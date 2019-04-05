import React from "react";
import Home from "../home/Home.js";
import Game from "../game/Game.js";
import TopNavigation from "./navigation/TopNavigation.js";
import "./MainPage.css";
import {BrowserRouter as Router, Route} from "react-router-dom";

export default class MainPage extends React.Component {
  render() {
    return (
      <div>
        <TopNavigation/>
        <Router>
          <Route path="/home" component={() => <Home/>}/>
          <Route path="/game" component={() => <Game/>}/>
        </Router>
      </div>
    )
  }
}