import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function listReducer(state = initialState.listsContext, action = {}) {
    switch (action.type) {
        case types.LOAD_LISTS_SUCCESS:
            return Object.assign({}, state, {lists:action.lists,totalCount:action.totalCount});
        case types.SAVE_LIST_SUCCESS: {
                return Object.assign({}, state, Object.assign({}, {activeList:action.list}));
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
                        pages: newPages
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
            return Object.assign({}, state, {
                activeList: Object.assign({}, action.list, {
                    name: action.list.name,
                    learnItems: Object.assign({activePage:0},state.activeList.learnItems)
                })
            }); //TODO probably still not good enough
        default:
            return state;
    }
}