import {listApi,learnItemApi} from '../middleware/middleware';
import * as types from './actionTypes';
import {beginAjaxCall,ajaxCallError} from './ajaxStatusActions';
import pageSize from '../constants';

export function saveLearnItemSuccess(learnItem) {
  return {type: types.SAVE_LEARNITEM_SUCCESS, learnItem};
}

export function saveLearnItem(learnItem,listId){
    return dispatch => {
        dispatch(beginAjaxCall());
        return learnItemApi.saveLearnItem(learnItem,listId).then(learnItem => {
            dispatch(saveLearnItemSuccess(learnItem));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    }
}