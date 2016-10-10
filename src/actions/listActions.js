import ListApi from '../mockApi/ListApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

export function loadListsSuccess(lists) {
  return {type: types.LOAD_LISTS_SUCCESS, lists};
}

export function browseListsSuccess(browseLists){
    return {type: types.BROWSE_LISTS, browseLists};
}

export function saveListSuccess(list){
    return {type: types.SAVE_LIST_SUCCESS, list};
}

export function loadListSuccess(list){
    return {type: types.LOAD_LIST_SUCCESS, list};
}

export function loadList(listId){
    return dispatch => {
        dispatch(beginAjaxCall());
        return ListApi.getList(listId).then(list => {
            dispatch(loadListSuccess(list));
        }).catch(error => {
            throw(error);
        });
    }
}

export function saveList(list){
    console.log('saveList');
        return dispatch => {
            dispatch(beginAjaxCall());
            return ListApi.addList(list).then(addedList => {
                console.log('saveList success is about to dispatched');
                dispatch(saveListSuccess(addedList));
            }).catch(error => {
                throw(error);
            });
    }

}

export function browseLists(value) {
    return dispatch=>{
        dispatch(browseListsSuccess(value));
    }
}

export function loadLists() {
  return dispatch => {
    dispatch(beginAjaxCall());
    return ListApi.getAllLists().then(lists => {
      dispatch(loadListsSuccess(lists));
    }).catch(error => {
      throw(error);
    });
  };
}