import ListApi from '../mockApi/ListApi';
import LearnItemApi from '../mockApi/LearnItemApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';
import pageSize from '../constants';

export function saveLearnItemSuccess(learnItem) {
  return {type: types.SAVE_LEARNITEM_SUCCESS, learnItem};
}

export function saveLearnItem(learnItem){
    console.log('before');
    return dispatch => {
        dispatch(beginAjaxCall());
        return LearnItemApi.saveLearnItem(learnItem).then(learnItem => {
            saveLearnItemSuccess(learnItem);
            dispatch(saveLearnItemSuccess(learnItem));
        }).catch(error => {
            throw(error);
        });
    }
}