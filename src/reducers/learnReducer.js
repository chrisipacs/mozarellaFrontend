/**
 * Created by krisztian on 2017. 01. 21..
 */
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function listReducer(state = initialState.learnContext, action = {}) {
    switch (action.type) {
        case types.LOAD_LEARNABLE_LEARNITEMS_SUCCESS:
            return Object.assign({}, state, {learnItems:action.learnItems});
        default:
            return state;
    }
}