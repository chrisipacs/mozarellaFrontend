import {combineReducers} from 'redux';
import listsContext from './listReducer';
import learnContext from './learnReducer';
import student from './studentReducer';
import studentsList from './studentsListReducer'
import learnItems from './learnItemReducer'
import ajaxCallsInProgress from './ajaxStatusReducer';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    listsContext,
    ajaxCallsInProgress,
    student: combineReducers({
        student,
        listsContext:studentsList
    }),
    learnContext,
    form: formReducer
});

export default rootReducer;
