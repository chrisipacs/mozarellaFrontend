import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function listReducer(state = initialState.listsContext, action) {
  switch (action.type) {
    case types.LOAD_LISTS_SUCCESS:
        console.log('load action: '+JSON.stringify(action));
      return Object.assign({}, state, {lists: action.lists});
    case types.BROWSE_LISTS:
        console.log('browse action'+JSON.stringify(action));
        return Object.assign({}, state, {browseLists: action.browseLists});
    default:
      return state;
  }
}
