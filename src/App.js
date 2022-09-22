import React, { Component } from 'react';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';
import Results from './components/Results/results';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedCategory: 'All', selectedGroup: '' };
  }

  updateState = (object) => {
    this.setState(object);
  };

  render() {
    const { selectedCategory, selectedGroup } = this.state;
    return (
      <div className="main">
        <Sidebar updateState={this.updateState} />
        <Results category={selectedCategory} group={selectedGroup} />
      </div>
    );
  }
}
export default App;
