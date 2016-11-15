/**
 * Created by krisztian on 2016. 11. 14..
 */
/**
 * Created by krisztian on 2016. 10. 30..
 */
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function learnItemReducer(state = initialState.student, action = {}) {
    switch (action.type) {
        case types.LOAD_LEARNABLE_LEARNITEMS_SUCCESS:
            return Object.assign(...state, action.learnItems);
        default:
            return state;
    }
}
