import {combineReducers} from 'redux';
import listsContext from './listReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  listsContext,
  ajaxCallsInProgress
});

export default rootReducer;
