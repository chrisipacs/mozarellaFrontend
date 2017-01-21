import {listApi,learnItemApi} from '../middleware/middleware';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';
import pageSize from '../constants';

export function loadListsSuccess(lists, totalCount) {
  return {type: types.LOAD_LISTS_SUCCESS, lists, totalCount};
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

export function resetListUnderEdit(){
    return {type: types.RESET_LIST_UNDER_EDIT};
}

export function loadList(listId){
    return dispatch => {
        dispatch(beginAjaxCall());
        return listApi.getList(listId).then(list => {
            loadLearnItems(list.id);
            dispatch(loadListSuccess(list));
        }).catch(error => {
            console.log(error);
            throw(error);
        });
    }
}

export function saveList(list){
        return dispatch => {
            dispatch(beginAjaxCall());
            return listApi.addList(list).then(addedList => {
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

export function loadLists(pageNumber,pageSize) {
    return dispatch => {
        console.log(pageSize);
        dispatch(beginAjaxCall());
        return listApi.getAllLists(pageNumber,pageSize).then((result) => {
            dispatch(loadListsSuccess(result.lists,result.totalCount));
        }).catch(error => {
            throw(error);
        });
    };
}

export function loadLearnItems(listId,pageNumber=0) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return learnItemApi.getLearnItemsForList(listId,pageNumber).then(result => {
            dispatch(loadLearnitemSuccess(pageNumber,result.totalCount,result.learnItems));
        }).catch(error => {
            throw(error);
        });
    };
}