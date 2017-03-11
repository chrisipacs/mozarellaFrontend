/**
 * Created by krisztian on 2017. 03. 05..
 */

import {studentApi} from '../middleware/middleware';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';
import pageSize from '../constants';

export function signupToListSuccess(list) {
    return {type: types.SIGNUP_STUDENT_TO_LIST_SUCCESS, list: list};
}

export function deregisterFromListSuccess(list) {
    return {type: types.DEREGISTER_STUDENT_FROM_LIST_SUCCESS, list: list};
}

export function subscribeStudentToList(student,list){
    return dispatch => {
        dispatch(beginAjaxCall());
        return studentApi.signUpStudentToList(student,list).then(() => { //studentId not needed, will be used at login
            dispatch(signupToListSuccess(list));
        }).catch(error => {
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
            throw(error);
        });
    }
}