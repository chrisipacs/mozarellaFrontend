import {listApi,learnItemApi} from '../middleware/middleware';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';
import pageSize from '../constants';

export function loadListsSuccess(lists, totalCount) {
  return {type: types.LOAD_LISTS_SUCCESS, lists, totalCount};
}

export function loadStudentListsSuccess(lists, totalCount) {
    return {type: types.LOAD_STUDENT_LISTS_SUCCESS, lists, totalCount};
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

export function loadLearnitemSuccess(activePage, totalCount,learnItems){ //for editing, NOT for learning
    return {type: types.LOAD_LEARNITEMS_SUCCESS, activePage, totalCount, learnItems};
}

export function changePage(activePage){
    return {type: types.CHANGE_LEARNITEMPAGE, activePage};
}

export function loadList(listId){
    return dispatch => {
        dispatch(beginAjaxCall());
        return listApi.getList(listId).then(list => {
            loadLearnItems(list.id);
            dispatch(loadListSuccess(list));
        })
    }
}

export function saveList(list){
        return dispatch => {
            dispatch(beginAjaxCall());
            return listApi.addList(list).then(addedList => {
                dispatch(saveListSuccess(addedList));
            })
    }
}

export function browseLists(value) {
    return dispatch=>{
        return new Promise((resolve, reject) => {
            dispatch(browseListsSuccess(value));
            resolve(value);
        });
    }
}

export function loadLists(pageNumber,pageSize,studentId) {
    return dispatch => {
        dispatch(beginAjaxCall());
        if(studentId==undefined){
            return listApi.getLists(pageNumber,pageSize,studentId).then((result) => {
                    dispatch(loadListsSuccess(result.lists,result.totalCount));
            })} else {
            return listApi.getListsOfStudent(pageNumber,pageSize,studentId).then((result) => {
                dispatch(loadStudentListsSuccess(result.lists,result.totalCount));
            })
        }
    };
}

export function loadLearnItems(listId,pageNumber=0) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return learnItemApi.getLearnItemsForList(listId,pageNumber).then(result => {
            dispatch(loadLearnitemSuccess(pageNumber,result.totalCount,result.learnItems));
        })
    };
}