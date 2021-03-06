/*eslint-disable import/default */
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
//import {loadCourses} from './actions/courseActions';
import {loginSuccess} from './actions/loginActions';
import {loadLists} from './actions/listActions';
import listActions from './actions/listActions';
import {beginAjaxCall} from './actions/ajaxStatusActions';

const store = configureStore(window.devToolsExtension && window.devToolsExtension());
//store.dispatch(loadCourses());
store.dispatch(loadLists(0,10));

let student = localStorage.getItem('student');

if(student != undefined){
    //loginSuccess does not include beginAjaxCall
    store.dispatch(beginAjaxCall());
    store.dispatch(loginSuccess(JSON.parse(student)));

    store.dispatch(loadLists(0,10,JSON.parse(student).id));
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
    document.getElementById('app')
);
