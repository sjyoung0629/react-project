import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Editor from './components/Editor';
import SearchList from './components/SearchList';
import CommentView from './components/CommentView';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/editor" component={Editor}/>
          <Route exact path="/searchList" component={SearchList}/>
          <Route path="/commentView" component={CommentView}/>
        </div>
      </Router>
    );
  }
}

export default App;
