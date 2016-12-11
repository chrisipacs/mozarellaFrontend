/**
 * Created by krisztian on 2016. 10. 31..
 */
import {signupApi} from '../middleware/middleware';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';
import pageSize from '../constants';

export function signupSuccess(student) {
    return {type: types.SIGNUP_SUCCESS, student};
}

export function signUp(newStudent){
    return dispatch => {
        dispatch(beginAjaxCall());
        return signupApi.signUp(newStudent).then(student => {
            dispatch(signupSuccess(student));
        }).catch(error => {
            throw(error);
        });
    }
}