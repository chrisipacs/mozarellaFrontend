/**
 * Created by krisztian on 2016. 10. 30..
 */
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function listReducer(state = initialState.student, action) {
    switch (action.type) {
     case types.LOGIN_SUCCESS:
            return Object.assign({}, action.student);
        default:
            return state;
    }
}
