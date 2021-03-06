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
import LogoutComponent from './components/logout/LogoutPage.js';
import SignUpPage from './components/login/SignUpPage.js';
import ListSelectionPageForLearning from './components/learning/ListSelectionPageForLearning';

function requireAuth(nextState, replace) {

  if(typeof(Storage)!=="undefined")
  {
    let student = localStorage.getItem("student");
    let nextPathname =  '/';

    if(nextState!=undefined && nextState.location!=undefined && nextState.location.pathname != undefined){
      nextPathname = nextState.location.pathname;
        console.log('!next path name is: '+nextPathname);
    }

    if(localStorage.getItem("student")==undefined){
      replace({
        pathname: '/login',
        state: { nextPathname }
      })
    }
  }
}

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} onEnter={requireAuth}/>
    <Route path="lists" component={ListSelectionPage} onEnter={requireAuth}/>
    <Route path="lists/:listId" component={ListPage} onEnter={requireAuth}/>
    <Route path="learn" component={ListSelectionPageForLearning} onEnter={requireAuth}/>
    <Route path="learn/:listId" component={LearningPage} onEnter={requireAuth}/>
    <Route path="practice" component={PracticePage} onEnter={requireAuth}/>
    <Route path="login" component={LoginComponent} />
    <Route path="logout" component={LogoutComponent} />
    <Route path="signup" component={SignUpPage} />
  </Route>
);
