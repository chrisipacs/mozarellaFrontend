/**
 * Created by krisztian on 2017. 03. 05..
 */
import * as types from '../actions/actionTypes';
import initialState from './initialState';
import update from 'react-addons-update';

export default function listReducer(state = initialState.studentContext.listsContext, action = {}) {
    switch (action.type) {
        case types.LOAD_STUDENT_LISTS_SUCCESS:
            return Object.assign({}, state, {lists:action.lists,totalCount:action.totalCount});
        default:
            return state;
    }
}