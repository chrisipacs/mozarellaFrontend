import {listApi} from '../middleware/middleware';
import LearnItemApi from '../mockApi/LearnItemApi';
import * as types from './actionTypes';
import {beginAjaxCall} from './ajaxStatusActions';
import pageSize from '../constants';

export function loadListsSuccess(lists) {
  return {type: types.LOAD_LISTS_SUCCESS, lists, totalCount:1000};
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

export function loadLearnitemSuccess(totalCount,learnItems){
    return {type: types.LOAD_LEARNITEMS_SUCCESS,totalCount, learnItems};
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
        return listApi.getAllLists(pageNumber,pageSize).then((lists,totalNumber) => {
            console.log('lists before dispatch: '+JSON.stringify(lists));
            dispatch(loadListsSuccess(lists));
        }).catch(error => {
            throw(error);
        });
    };
}

export function loadLearnItems(listId,pageNumber=0) {
    return dispatch => {
        dispatch(beginAjaxCall());
        return LearnItemApi.getLearnItemsForList(listId,pageNumber).then(result => {
            dispatch(loadLearnitemSuccess(result.totalCount,result.learnItems));
        }).catch(error => {
            throw(error);
        });
    };
}