/**
 * Created by krisztian on 2017. 06. 24..
 */

import {loginApi} from '../middleware/middleware';
import * as types from './actionTypes';
import {beginAjaxCall,ajaxCallError} from './ajaxStatusActions';
import pageSize from '../constants';

export function logoutSuccess(student) {
    return {type: types.LOGOUT_SUCCESS, student};
}

export function logout(username,password){
    return dispatch => {
        localStorage.removeItem("student");
        dispatch(logoutSuccess);
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}