import ListApi from '../mockApi/ListApi';
import LearnItemApi from '../mockApi/LearnItemApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';
import pageSize from '../constants';

export function saveLearnItemSuccess(learnItem) {
  return {type: types.SAVE_LEARNITEM_SUCCESS, learnItem};
}

export function loadLearnableLearnItemsSuccess(learnItems) {
    return {type: types.LOAD_LEARNABLE_LEARNITEMS_SUCCESS, learnItems};
}

export function loadLearnItemsToLearn(listId,numberOfLearnItems=10) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return LearnItemApi.getLearnItemsToLearn(listId, numberOfLearnItems).then(learnItems => {
            dispatch(loadLearnableLearnItemsSuccess(learnItems));
        }).catch(error => {
            throw(error);
        });
    };
}

export function saveLearnItem(learnItem){
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