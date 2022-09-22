import React, { Component, useState, useEffect } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  state = { selectedCategory: "all", selectedGroup: null };
  updateState = (object) => {
    this.setState(object);
  };
  render() {
    console.log(this.state.selectedCategory, this.state.selectedGroup);
    return (
      <div className="main">
        <Sidebar updateState={this.updateState} />
      </div>
    );
  }
}

export default App;
