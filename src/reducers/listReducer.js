import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function listReducer(state = initialState.listsContext, action = {}) {
    switch (action.type) {
        case types.LOAD_LISTS_SUCCESS:
            return Object.assign({}, state, {lists: action.lists});
        case types.SAVE_LIST_SUCCESS: {
            let existingElement = state.lists.find((list)=> {
                return list.id === action.list.id
            });
            if (existingElement) {
                let index = state.lists.indexOf(existingElement);
                let newLists = [];
                state.lists.forEach((element)=> {
                    if (element.id !== action.list.id) {
                        newLists.push(element);
                    } else {
                        console.log(JSON.stringify(action.list));
                        newLists.push(Object.assign({}, action.list));
                    }
                });
                return Object.assign({}, state, {lists: [...newLists]}, {listUnderEdit: Object.assign({}, action.list)});
            } else {
                //if a list is a new one
                return Object.assign({}, state, {lists: [...state.lists, Object.assign({}, action.list)]});
            }}

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
