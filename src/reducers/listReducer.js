import * as types from '../actions/actionTypes';
import initialState from './initialState';
import update from 'react-addons-update';

function appendNewlySavedLearnItemToEndOfList(learnItems,newLearnItem){
    let learnItemsDeepCopy = Object.assign({},JSON.parse(JSON.stringify(learnItems)));

    let lastPage = learnItemsDeepCopy.pages[Object.keys(learnItemsDeepCopy.pages).length-1];
    if(lastPage.length<learnItemsDeepCopy.pageSize){
        lastPage.push(newLearnItem);
    } else {
        learnItemsDeepCopy.pages[Object.keys(learnItemsDeepCopy.pages).length] = [newLearnItem];
    }

    learnItemsDeepCopy.totalCount+=1;

    return learnItemsDeepCopy;
}

//TODO switch to update() everywhere
export default function listReducer(state = initialState.listsContext, action = {}) {
    switch (action.type) {
        case types.LOAD_LISTS_SUCCESS:
            return Object.assign({}, state, {lists:action.lists,totalCount:action.totalCount});
        case types.SAVE_LIST_SUCCESS: {
                //loaded learnItems have to be kept
                let learnItemsSave = JSON.parse(JSON.stringify(state.activeList.learnItems)); //deep copy
                let newList=Object.assign({}, {activeList:action.list});
                newList.activeList.learnItems = learnItemsSave;

                return Object.assign({}, state, newList);
            }
        case types.RESET_LIST_UNDER_EDIT:
            return Object.assign({}, state, Object.assign({}, {activeList:initialState.listsContext.activeList}));
        case types.LOAD_LEARNITEMS_SUCCESS:
        {
            let newPages = Object.assign({},state.activeList.learnItems.pages);
            newPages[action.activePage] = action.learnItems;

            return Object.assign({}, state, {lists: state.lists}, {
                activeList: Object.assign({}, state.activeList, {
                    learnItems:{
                        totalCount: action.totalCount,
                        activePage:action.activePage,
                        pages: newPages,
                        pageSize: state.activeList.learnItems.pageSize
                    }
                })
            });
        }
        case types.CHANGE_LEARNITEMPAGE:{
            let result = Object.assign({},state);
            result.activeList = Object.assign({},state.activeList);
            result.activeList.learnItems = Object.assign({},state.activeList.learnItems,{activePage:action.activePage});

            return result;
        }
        case types.BROWSE_LISTS:
            return Object.assign({}, state, {browseLists: action.browseLists});
        case types.LOAD_LIST_SUCCESS:
            return update(state, {
                activeList: {$set:action.list}
            });/*Object.assign({}, state, {
                activeList: Object.assign({}, action.list, {
                    name: action.list.name,
                    learnItems: Object.assign({activePage:0},state.activeList.learnItems)
                })
            });*/
        case types.SAVE_LEARNITEM_SUCCESS:{
            let learnItems = appendNewlySavedLearnItemToEndOfList(state.activeList.learnItems,action.learnItem);

            return update(state,  {
                activeList: {learnItems : {$set:learnItems}}
            });
        }
        default:
            return state;
    }
}