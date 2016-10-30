import {combineReducers} from 'redux';
import listsContext from './listReducer';
import student from './studentReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';

const rootReducer = combineReducers({
  listsContext,
  ajaxCallsInProgress,
  student
});

export default rootReducer;
