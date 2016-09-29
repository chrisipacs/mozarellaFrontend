import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app';
import CreateLearnItemListPage from './components/createLearnItemListPage.js';
import LearningPage from './components/learning/learningPage';
import PracticePage from './components/practice/practicePage';
import ListSelectionPage from './components/listSelection/listSelectionPage.js';
import HomePage from './components/homePage';
import ListPage from './components/list/ListPage.js';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="lists" component={ListSelectionPage} />
    <Route path="lists/:listId" component={ListPage} />
    <Route path="learn" component={LearningPage} />
    <Route path="practice" component={PracticePage} />
  </Route>
);
