import React from 'react';
// import './App.scss';
// import './index.scss';

import fontawesome from '@fortawesome/fontawesome'
import brands from '@fortawesome/fontawesome-free-brands'
import faCheckSquare from '@fortawesome/fontawesome-free-solid/faCheckSquare'
import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee'

import NavBar from './components/NavBar.js'

import Home from './pages/home/Home.js';
import Calculator from './pages/calculator/Calculator.js';
import Teams from './pages/teams/Teams.js';
import Rules from './pages/rules/Rules.js';
import Schedule from './pages/schedule/Schedule.js';

import { BrowserRouter as Router, Route} from 'react-router-dom';

fontawesome.library.add(brands, faCheckSquare, faCoffee)

const App = () => (
  <div className="app">
    <header className="app-header">
      <Router>
        <div>
          <NavBar />
          <Route exact path="/" component={Home} />
          <Route path="/calculator" component={Calculator} />
          <Route path="/schedule" component={Schedule} />
          <Route path="/teams" component={Teams} />
          <Route path="/rules" component={Rules} />
        </div>
      </Router>
    </header>
  </div>
);

export default App;
