import React, { Component, useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Sidebar from './components/sidebar.jsx'
import Results from './components/results.jsx'
class App extends Component {
  state = {
    category: 'All',
    group: ''
  }
  // here if user click at main category pass category with out group | if he/she choose group pass to arguments 
  handleUserChoice(newCategory, newGroup = '') {
    this.setState({ category: newCategory, group: newGroup });
  }

  render() {
    return (
      <>
        <Sidebar/>
        <Results  category={this.state.category} group={this.state.group} />
      </>
    );
  }
}

export default App;

