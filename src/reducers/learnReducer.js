/**
 * Created by krisztian on 2017. 01. 21..
 */
import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function listReducer(state = initialState.learnContext, action = {}) {
    switch (action.type) {
        case types.LOAD_LEARNABLE_LEARNITEMS_SUCCESS:
        {
            let newLearnItems = [];

            let idsStillInList = state.learnItems.map((item)=>{
                return item.id;
            });

            let uniqueNewItems = action.learnItems.filter((item)=>{
                return idsStillInList.indexOf(item.id)==-1;
            });

            return Object.assign({}, state, {learnItems: [...state.learnItems,...uniqueNewItems]});
        }
        case types.REMOVE_LEARNABLE_LEARNITEM:{

            let newLearnItems = [...(state.learnItems)];
            newLearnItems.shift();

            return Object.assign({}, state, {learnItems:newLearnItems});
        }
        default:
            return state;
    }
}