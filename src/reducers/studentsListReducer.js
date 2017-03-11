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
        case types.SIGNUP_STUDENT_TO_LIST_SUCCESS: {
            let newState = update(state, {
                lists: {$set:[...state.lists,action.list]}
            });

            return newState;
        }
        case types.DEREGISTER_STUDENT_FROM_LIST_SUCCESS:{

            let updatedLists = state.lists.filter(function(obj) {
                return obj.id !== action.list.id;
            });

            let newState = update(state, {
                lists: {$set: updatedLists}
            });

            return newState;
        }
        default:
            return state;
    }
}