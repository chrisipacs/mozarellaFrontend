/**
 * Created by krisztian on 2016. 10. 31..
 */
import signupApi from '../mockApi/SignupApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';
import pageSize from '../constants';

export function signupSuccess(student) {
    return {type: types.SIGNUP_SUCCESS, student};
}

export function signUp(username,password){
    return dispatch => {
        dispatch(beginAjaxCall());
        let newStudent = {name:username,password:password};
        return signupApi.signUp(newStudent).then(student => {
            dispatch(signupSuccess(student));
        }).catch(error => {
            throw(error);
        });
    }
}