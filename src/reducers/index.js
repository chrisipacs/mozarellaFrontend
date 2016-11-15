import {combineReducers} from 'redux';
import listsContext from './listReducer';
import student from './studentReducer';
import learnItems from './learnItemReducer'
import ajaxCallsInProgress from './ajaxStatusReducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
  listsContext,
  ajaxCallsInProgress,
  student,
  learnItems,
  form: formReducer
});

export default rootReducer;
