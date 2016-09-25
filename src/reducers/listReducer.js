import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function listReducer(state = initialState.listsContext, action) {
  switch (action.type) {
    case types.LOAD_LISTS_SUCCESS:
      return Object.assign({}, state, {lists: action.lists});
      case types.SAVE_LIST_SUCCESS:
          return Object.assign({}, state, {lists: [...state.lists, Object.assign({},action.list)]});
    case types.BROWSE_LISTS:
        return Object.assign({}, state, {browseLists: action.browseLists});
    default:
        console.log('default reducer branch');
      return state;
  }
}
