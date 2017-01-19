import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function listReducer(state = initialState.listsContext, action = {}) {
    switch (action.type) {
        case types.LOAD_LISTS_SUCCESS:
            return Object.assign({}, state, {lists:action.lists,totalCount:action.totalCount});
        case types.SAVE_LIST_SUCCESS: {
                return Object.assign({}, state, Object.assign({}, {listUnderEdit:action.list}));
            }
        case types.RESET_LIST_UNDER_EDIT:
            return Object.assign({}, state, Object.assign({}, {listUnderEdit:initialState.listsContext.listUnderEdit}));
        case types.SAVE_LEARNITEM_SUCCESS:
            //no need to deal with this
            return Object.assign({}, state);
        case types.LOAD_LEARNITEMS_SUCCESS:
            return Object.assign({}, state, {lists: state.lists}, {
                listUnderEdit: Object.assign({}, state.listUnderEdit, {
                    totalCount: action.totalCount,
                    learnItems: action.learnItems
                })
            });
        case types.BROWSE_LISTS:
            return Object.assign({}, state, {browseLists: action.browseLists});
        case types.LOAD_LIST_SUCCESS:
            return Object.assign({}, state, {
                listUnderEdit: Object.assign({}, action.list, {
                    name: action.list.name,
                    learnItemContext: state.listUnderEdit.learnItemContext
                })
            }); //TODO probably still not good enough
        default:
            return state;
    }
}
