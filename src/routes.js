import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app';
import CreateLearnItemListPage from './components/createLearnItemListPage.js';
import LearningPage from './components/learning/LearningPage';
import PracticePage from './components/practice/practicePage';
import ListSelectionPage from './components/listSelection/ListSelectionPage.js';
import HomePage from './components/homePage';
import ListPage from './components/list/ListPage.js';
import LoginComponent from './components/login/LoginPage.js';
import SignUpPage from './components/login/SignUpPage.js';

function requireAuth(nextState, replace) {

  if(typeof(Storage)!=="undefined")
  {
    console.log('student in localStorage: '+localStorage.getItem("student"));
    let student = localStorage.getItem("student");
    if(localStorage.getItem("student")==undefined){
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      })
    }
  }
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} onEnter={requireAuth}/>
    <Route path="lists" component={ListSelectionPage} onEnter={requireAuth}/>
    <Route path="lists/:listId" component={ListPage} onEnter={requireAuth}/>
    <Route path="learn" component={LearningPage} onEnter={requireAuth}/>
    <Route path="practice" component={PracticePage} onEnter={requireAuth}/>
    <Route path="login" component={LoginComponent} />
    <Route path="signup" component={SignUpPage} />
  </Route>
);
