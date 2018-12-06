import React, { Component } from 'react';
import CommentView from './components/CommentView';
// import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div id="root" className="wrap_comment">
        <CommentView />
      </div>
    );
  }
}

export default App;
