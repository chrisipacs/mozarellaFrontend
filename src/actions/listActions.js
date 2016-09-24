import ListApi from '../mockApi/ListApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';

export function loadListsSuccess(lists) {
  return {type: types.LOAD_LISTS_SUCCESS, lists};
}

export function browseListsSuccess(browseLists){
    return {type: types.BROWSE_LISTS, browseLists};
}

export function studyList(){ //this is the "add list" function to study a new list



}

export function browseLists(value) {
    return dispatch=>{
       //dispatch(browseListsSuccess(value));
        console.log('browse disp');
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
