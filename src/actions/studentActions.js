/**
 * Created by krisztian on 2017. 03. 05..
 */

import {studentApi} from '../middleware/middleware';
import * as types from './actionTypes';
import {beginAjaxCall,ajaxCallError} from './ajaxStatusActions';
import pageSize from '../constants';

export function loadLearnableLearnItemsSuccess(learnItems) {
    return {type: types.LOAD_LEARNABLE_LEARNITEMS_SUCCESS, learnItems};
}

export function signupToListSuccess(list) {
    return {type: types.SIGNUP_STUDENT_TO_LIST_SUCCESS, list: list};
}

export function deregisterFromListSuccess(list) {
    return {type: types.DEREGISTER_STUDENT_FROM_LIST_SUCCESS, list: list};
}

export function loadLearnItemsToLearn(listId,numberOfLearnItems=10) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return studentApi.getLearnItemsToLearn(listId, numberOfLearnItems).then(learnItems => {
            dispatch(loadLearnableLearnItemsSuccess(learnItems));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}

export function subscribeStudentToList(student,list){
    return dispatch => {
        dispatch(beginAjaxCall());
        return studentApi.signUpStudentToList(student,list).then(() => { //studentId not needed, will be used at login
            dispatch(signupToListSuccess(list));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    }
}

export function deregisterStudentFromList(student,list){
    return dispatch => {
        dispatch(beginAjaxCall());
        return studentApi.deregisterStudentFromList(student,list).then(() => { //studentId not needed, will be used at login
            dispatch(deregisterFromListSuccess(list));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    }
}