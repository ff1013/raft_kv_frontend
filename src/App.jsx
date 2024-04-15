import './App.css'
import Raft from './raft/Raft';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import React, { Component } from 'react';
import KVStore from './kvStore/KVStore';

class App extends Component {
  render() {
    return (
      <Routes>
        <Route exact path='/' element={<Home />}></Route>
        <Route exact path='/raft' element={<Raft />}></Route>
        <Route exact path='/kvStore' element={<KVStore />}></Route>
      </Routes>
    )
  }
}

export default App
