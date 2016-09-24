import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './app';
import CreateLearnItemListPage from './components/createLearnItemListPage.js';
import LearningPage from './components/learning/learningPage';
import PracticePage from './components/practice/practicePage';
import CourseSelectionPage from './components/listSelection/listSelectionPage.js';
import HomePage from './components/homePage';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="courses" component={CourseSelectionPage} />
    <Route path="learn" component={LearningPage} />
    <Route path="practice" component={PracticePage} />
  </Route>
);
