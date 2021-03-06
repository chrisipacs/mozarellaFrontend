/**
 * Created by krisztian on 2016. 10. 30..
 */
import {loginApi} from '../middleware/middleware';
import * as types from './actionTypes';
import {beginAjaxCall,ajaxCallError} from './ajaxStatusActions';
import pageSize from '../constants';

export function loginSuccess(student) {
    return {type: types.LOGIN_SUCCESS, student};
}

export function login(username,password){
    return dispatch => {
        dispatch(beginAjaxCall());
                return loginApi.login(username,password).then(student => {
                    if(window.localStorage){
                        localStorage.setItem('student',JSON.stringify(student));
                    }
                    dispatch(loginSuccess(student));
                }).catch(error => {
                    dispatch(ajaxCallError());
                    throw(error);
                });
            }
}