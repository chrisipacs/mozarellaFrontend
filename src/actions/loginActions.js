/**
 * Created by krisztian on 2016. 10. 30..
 */

import loginApi from '../mockApi/LoginApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';
import pageSize from '../constants';

export function loginSuccess(student) {
    return {type: types.LOGIN_SUCCESS, student};
}

export function login(username,password){
    return dispatch => {
        dispatch(beginAjaxCall());
                return loginApi.login(username,password).then(student => {
                    if(username=="user" && password=="password"){
                        localStorage.setItem('student',student);
                        dispatch(loginSuccess(student));
                    } else {
                        throw "Invalid username or password";
                    }
                }).catch(error => {
                    throw(error);
                });
            }
}