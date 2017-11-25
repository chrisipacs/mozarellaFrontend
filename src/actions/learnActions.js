/**
 * Created by krisztian on 2017. 07. 29..
 */
import * as types from './actionTypes';
import {beginAjaxCall,ajaxCallError} from './ajaxStatusActions';
import pageSize from '../constants';

export function addSuccessfullyAnsweredLearnitemIdSuccess(learnItemId) {
    return {type: types.ADD_SUCCESSFULLY_ANSWERED_LEARNITEM_ID, learnItemId};
}

export function resetLearnContextSuccess() {
    return {type: types.RESET_LEARN_CONTEXT};
}

export function addSuccessfullyAnsweredLearnitemId(learnItemId) {
    return dispatch => {
        dispatch(addSuccessfullyAnsweredLearnitemIdSuccess(learnItemId));
    };
}

export function resetLearnContext() {
    return dispatch => {
        dispatch(resetLearnContextSuccess());
    };
}