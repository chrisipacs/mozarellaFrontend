/**
 * Created by krisztian on 2016. 10. 31..
 */
import {signupApi} from '../middleware/middleware';
import * as types from './actionTypes';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';
import pageSize from '../constants';

export function signupSuccess() {
    return {type: types.SIGNUP_SUCCESS};
}

export function signUp(newStudent){
    return dispatch => {
        dispatch(beginAjaxCall());
        return signupApi.signUp(newStudent).then(studentId => { //studentId not needed, will be used at login
            dispatch(signupSuccess());
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    }
}