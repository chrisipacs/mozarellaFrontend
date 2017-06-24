/**
 * Created by krisztian on 2016. 10. 30..
 */
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function studentReducer(state = initialState.studentContext.student, action = {}) {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return Object.assign({}, action.student);
        case types.LOGOUT_SUCCESS:
            return {};
        case types.SIGNUP_SUCCESS:
            return state;
        default:
            return state;
    }
}
