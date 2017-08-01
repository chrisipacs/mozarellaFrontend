/**
 * Created by krisztian on 2017. 01. 21..
 */
import * as types from '../actions/actionTypes';
import initialState from './initialState';
import numberOfItemsToLoad from '../components/NumberOfItemsToLoadAtOnce';

export default function listReducer(state = initialState.learnContext, action = {}) {
    switch (action.type) {
        case types.LOAD_LEARNABLE_LEARNITEMS_SUCCESS:
        {
            let newLearnItems = [];

            //1. take out duplicates
            //2. also take out items that are no longer here, but were successfully answered previously

            let idsStillInList = state.learnItems.map((item)=>{
                return item.id;
            });

            let uniqueNewItems = action.learnItems.filter((item)=>{
                return idsStillInList.indexOf(item.id)==-1;
            }).filter((item)=>{
                return state.successfullyAnsweredIds.indexOf(item.id)==-1;
            });

            let canLoadMore = action.learnItems.length === numberOfItemsToLoad;
            let newState = Object.assign({}, state, {learnItems: [...state.learnItems,...uniqueNewItems]}, {loadingInProgress:false}, {canLoadMore});

            return newState;
        }
        case types.REMOVE_LEARNABLE_LEARNITEM:{
            let newLearnItems = [...(state.learnItems)];
            newLearnItems.shift();

            return Object.assign({}, state, {learnItems:newLearnItems});
        }
        case types.CLEAR_LEARN_CONTEXT:{
            let newLearnItems = [...(state.learnItems)];
            newLearnItems.shift();

            return Object.assign(initialState.learnContext);
        }
        case types.ADD_SUCCESSFULLY_ANSWERED_LEARNITEM_ID:{

            let newSuccessfullyAnsweredIds = [...(state.successfullyAnsweredIds),action.learnItemId];

            return Object.assign({}, state, {successfullyAnsweredIds:newSuccessfullyAnsweredIds});
        }
        case types.RESET_LEARN_CONTEXT:{
            return Object.assign({}, initialState.learnContext);
        }
        case types.LOADING_LEARNABLE_LEARNITEMS_START:{
            return Object.assign({}, state, {loadingInProgress:true});
        }
        default:
            return state;
    }
}