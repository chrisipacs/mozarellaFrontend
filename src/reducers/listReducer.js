import * as types from '../actions/actionTypes';
import initialState from './initialState';
import update from 'react-addons-update';

function appendNewlySavedLearnItemToEndOfList(learnItems,newLearnItem){
    //TODO determine the last page from the totalCount, this is incorrect as it is

    let learnItemsDeepCopy = Object.assign({},JSON.parse(JSON.stringify(learnItems)));

    let existingPageKeys = Object.keys(learnItemsDeepCopy.pages);
    let lastPageKey = existingPageKeys[existingPageKeys.length-1];
    let lastPage = learnItemsDeepCopy.pages[lastPageKey];

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
        case types.LOAD_LIST_SUCCESS: {
            //loaded learnItems have to be kept

            let newState = update(state, {
                activeList: {$set:action.list}
            });

            if(state.activeList.learnItems!==undefined){
                let learnItemsSave = JSON.parse(JSON.stringify(state.activeList.learnItems)); //deep copy
                newState.activeList.learnItems = learnItemsSave;
            }

            return newState;
        }
        case types.CLEAR_ACTIVE_LIST:{

            console.log('initialstate '+JSON.stringify(initialState));

            let newState = update(state, {
                    activeList: {$set:initialState.listsContext.activeList}
            });

            console.log('newState '+JSON.stringify(newState));

            return newState;
        }
        case types.SAVE_LEARNITEM_SUCCESS:{
            let maxPageNumber = Math.floor(state.activeList.learnItems.totalCount/state.activeList.learnItems.pageSize);
            console.log('lastPageNumber: '+maxPageNumber);

            let lastPageIsAlreadyLoaded = state.activeList.learnItems.pages[maxPageNumber]!=undefined;
            console.log('lastPageIsAlreadyLoaded: '+lastPageIsAlreadyLoaded);

            if(lastPageIsAlreadyLoaded){
                console.log('applying');
                let learnItems = appendNewlySavedLearnItemToEndOfList(state.activeList.learnItems,action.learnItem);

                return update(state,  {
                    activeList: {learnItems : {$set:learnItems}}
                });
            }

            console.log('returning');
            return state;
        }
        case types.DELETE_LEARNITEM_SUCCESS:{
            let activePageNumber = state.activeList.learnItems.activePage;
            let activePageContent = JSON.parse(JSON.stringify(state.activeList.learnItems.pages[activePageNumber]));

            let index = -1;
            activePageContent.forEach((item,idx)=>{
                if(item.id===action.learnItemId){
                    index=idx;
                }
            });

            console.log('index: '+index);
            console.log('activePageContent before: '+JSON.stringify(activePageContent));

            if (index > -1) {
                activePageContent.splice(index, 1);
            }

            //TODO update
            //TODO the RIGHT PAGE IS NEEDED

            let newLearnItems = JSON.parse(JSON.stringify(state.activeList.learnItems));
            newLearnItems.pages[activePageNumber] = activePageContent;

            //console.log('activePageContent: '+JSON.stringify(activePageContent));

            let newState = update(state, {
                activeList: {learnItems : {$set:newLearnItems}}
            });

            //console.log('activePageContent after??: '+JSON.stringify(activePageContent));
            return newState;
        }
        default:
            return state;
    }
}