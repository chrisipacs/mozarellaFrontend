/**
 * Created by krisztian on 2017. 01. 22..
 */
import expect from 'expect';
import listReducer from './listReducer';
import * as actions from '../actions/listActions';
import * as learnItemActions from '../actions/learnItemActions';

describe('List Reducer', () => {
    it('should load list into activeList when passed LOAD_LIST_SUCCESS', () => {
        // arrange

        const initialState =
            {
                lists:[],
                browseLists: false,
                totalCount: 0,
                activeList: {
                    name: '',
                    isPublic: true,
                    fromLanguage: '',
                    toLanguage: '',
                    description: ''
                }
            };

        const loadedList = {
            name: 'testList',
            isPublic: true,
            fromLanguage: '',
            toLanguage: '',
            description: ''
        };

        const action = actions.loadListSuccess(loadedList);

        //act
        const newState = listReducer(initialState, action);

        //assert
        expect(newState.activeList.name).toEqual('testList');
    });

    it('should set browseLists true after BROWSE_LISTS with \'true\'', () => {

        const initialState = {
                lists:[],
                browseLists: false,
                totalCount: 0,
                activeList: {

                }
            };

        // arrange
        const action = actions.browseListsSuccess(true);

        // act
        const newState = listReducer(initialState, action);

        // assert
        expect(newState.browseLists).toEqual(true);
    });

    it('should modify active list upon SAVE_LIST_SUCCESS', () => {

        // arrange

        const initialState =
        {
            lists:[],
            browseLists: false,
            totalCount: 0,
            activeList: {
                name: 'gec',
                isPublic: true,
                fromLanguage: '',
                toLanguage: '',
                description: '',
                learnItems: {
                    totalCount: 0,
                    pageSize: 10,
                    activePage:0,
                    pages: {
                        1:{},
                        2:{}
                    }
                }
            }
        };

        const listToSave = {
            name: 'modifiedListName',
            isPublic: true,
            fromLanguage: 'HUN',
            toLanguage: 'ENG',
            description: 'this is a modified version of the list'
        };

        const action = actions.saveListSuccess(listToSave);

        // act
        const newState = listReducer(initialState, action);

        // assert
        expect(newState.activeList.name).toEqual('modifiedListName');
        expect(newState.activeList.isPublic).toEqual(true);
        expect(newState.activeList.fromLanguage).toEqual('HUN');
        expect(newState.activeList.toLanguage).toEqual('ENG');
        expect(newState.activeList.description).toEqual('this is a modified version of the list');
    });

    it('should keep already loaded learnitems upon SAVE_LIST_SUCCESS', () => {

        // arrange

        const initialState =
            {
                lists:[],
                browseLists: false,
                totalCount: 0,
                activeList: {
                    name: '',
                    isPublic: true,
                    fromLanguage: '',
                    toLanguage: '',
                    description: '',
                    learnItems: {
                        totalCount: 0,
                        pageSize: 10,
                        activePage:0,
                        pages: {
                            1:{},
                            2:{}
                        }
                    }
                }
            };

        const listToSave = {
            name: 'modifiedListName',
            isPublic: true,
            fromLanguage: 'HUN',
            toLanguage: 'ENG',
            description: 'this is a modified version of the list'
        };

        const action = actions.saveListSuccess(listToSave);

        // act
        const newState = listReducer(initialState, action);

        // assert
        expect(initialState.activeList.learnItems.pages).toEqual(newState.activeList.learnItems.pages);
    });

    it('should load the new list on LOAD_LIST_SUCCESS', () => {

        const initialState = {
            lists:[],
            browseLists: false,
            totalCount: 0,
            activeList: {

            }
        };

        const listToLoad = {
            name: 'loadedListName',
            isPublic: true,
            fromLanguage: 'HUN',
            toLanguage: 'ENG',
            description: 'this is a loaded list'
        };

        // arrange
        const action = actions.loadListSuccess(listToLoad);

        // act
        const newState = listReducer(initialState, action);

        // assert
        expect(newState.activeList.name).toEqual('loadedListName');
        expect(newState.activeList.isPublic).toEqual(true);
        expect(newState.activeList.fromLanguage).toEqual('HUN');
        expect(newState.activeList.toLanguage).toEqual('ENG');
        expect(newState.activeList.description).toEqual('this is a loaded list');
    });

    it('should load the learnitems into the right page of activeList.learnItems on LOAD_LEARNITEMS_SUCCESS', () => {

        const initialState = {
            lists:[],
            browseLists: false,
            totalCount: 0,
            activeList: {
                name: '',
                isPublic: true,
                fromLanguage: '',
                toLanguage: '',
                description: '',
                learnItems: {
                    totalCount: 0,
                    pageSize: 10,
                    activePage:0,
                    pages: {}
                }
            }
        };

        const learnItemsToLoad = [{},{},{},{},{},{},{},{}];

        // arrange
        const action = actions.loadLearnitemSuccess(2, 142,learnItemsToLoad)

        // act
        const newState = listReducer(initialState, action);

        // assert
        expect(newState.activeList.learnItems.pages[2]).toEqual(learnItemsToLoad);

    });

    it('should keep the already loaded pages of activeList.learnItems on LOAD_LEARNITEMS_SUCCESS', () => {

        const initialState = {
            activeList: {
                learnItems: {
                    totalCount: 0,
                    pageSize: 10,
                    activePage:0,
                    pages: {0:[],
                            1:[{},{}],
                            4:[]
                    }
                }
            }
        };

        const learnItemsToLoad = [{},{},{},{},{},{},{},{}];

        // arrange
        const action = actions.loadLearnitemSuccess(2, 142,learnItemsToLoad);

        // act
        const newState = listReducer(initialState, action);

        // assert
        expect(newState.activeList.learnItems.pages[0]).toEqual(initialState.activeList.learnItems.pages[0]);
        expect(newState.activeList.learnItems.pages[1]).toEqual(initialState.activeList.learnItems.pages[1]);
        expect(newState.activeList.learnItems.pages[2]).toEqual(learnItemsToLoad);
        expect(newState.activeList.learnItems.pages[4]).toEqual(initialState.activeList.learnItems.pages[4]);

    });

    it('should keep the already loaded pages of activeList.learnItems on LOAD_LEARNITEMS_SUCCESS', () => {

        const initialState = {
            activeList: {
                learnItems: {
                    totalCount: 0,
                    pageSize: 10,
                    activePage:0,
                    pages: {0:[],
                        1:[{},{}],
                        4:[]
                    }
                }
            }
        };

        const learnItemsToLoad = [{},{},{},{},{},{},{},{}];

        // arrange
        const action = actions.loadLearnitemSuccess(2, 142,learnItemsToLoad);

        // act
        const newState = listReducer(initialState, action);

        // assert
        expect(newState.activeList.learnItems.pages[0]).toEqual(initialState.activeList.learnItems.pages[0]);
        expect(newState.activeList.learnItems.pages[1]).toEqual(initialState.activeList.learnItems.pages[1]);
        expect(newState.activeList.learnItems.pages[2]).toEqual(learnItemsToLoad);
        expect(newState.activeList.learnItems.pages[4]).toEqual(initialState.activeList.learnItems.pages[4]);

    });

    it('should change activeList.learnItems.activePage on CHANGE_LEARNITEMPAGE', () => {

        const initialState = {
            activeList: {
                learnItems: {
                    totalCount: 42,
                    pageSize: 10,
                    activePage:0,
                    pages: {0:[],
                        1:[{},{}],
                        4:[]
                    }
                }
            }
        };

        // arrange
        const action = actions.changePage(42);

        // act
        const newState = listReducer(initialState, action);

        // assert
        expect(newState.activeList.learnItems.activePage).toEqual(42);

    });

    it('should append the saved learnItem to the end of the last loaded page on SAVE_LEARNITEM_SUCCESS', () => {

        // arrange

        const initialState = {
            activeList: {
                learnItems: {
                    totalCount: 42,
                    pageSize: 10,
                    activePage:0,
                    pages: {0:[],
                        1:[{},{}],
                        4:[]
                    }
                }
            }
        };

        const learnItemToSave = {"id":1000,"text":"newLearnItem","translations":["exampletranslation"],"priority":null,"pictureReference":null,"helperItem":null};
        const action = learnItemActions.saveLearnItemSuccess(learnItemToSave);

        // act
        const newState = listReducer(initialState, action);

        // assert

        //
        let maxPageNumber = Math.floor(newState.activeList.learnItems.totalCount/newState.activeList.learnItems.pageSize);
        let page = newState.activeList.learnItems.pages[maxPageNumber];

        expect(page[page.length-1]).toEqual(learnItemToSave);

    });

    it('should not do anything on SAVE_LEARNITEM_SUCCESS if the last page of learnItems is not loaded yet', () => {

        // arrange

        const initialState = {
            activeList: {
                learnItems: {
                    totalCount: 42,
                    pageSize: 10,
                    activePage:0,
                    pages: {0:[],
                        1:[{},{}]
                    }
                }
            }
        };

        const learnItemToSave = {"id":1000,"text":"newLearnItem","translations":["exampletranslation"],"priority":null,"pictureReference":null,"helperItem":null};
        const action = learnItemActions.saveLearnItemSuccess(learnItemToSave);

        // act
        const newState = listReducer(initialState, action);

        // assert

        //
        let maxPageNumber = Math.floor(newState.activeList.learnItems.totalCount/newState.activeList.learnItems.pageSize);
        let page = newState.activeList.learnItems.pages[maxPageNumber];

        expect(newState).toEqual(initialState);
    });

});