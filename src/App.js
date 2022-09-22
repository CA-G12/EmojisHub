import React, { Component } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedCategory: 'all', selectedGroup: null };
  }

  updateState = (object) => {
    this.setState(object);
  };

  render() {
    const { selectedCategory, selectedGroup } = this.state;
    console.log(selectedCategory, selectedGroup);
    return (
      <div className="main">
        <Sidebar updateState={this.updateState} />
      </div>
    );
  }
}

export default App;
