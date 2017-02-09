/**
 * Created by krisztian on 2017. 01. 30..
 */

import expect from 'expect';
import * as listActions from './listActions';
import * as types from './actionTypes';

import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock'
import nock from 'nock';

import configureMockStore from 'redux-mock-store';
import host from '../api/host';

// Test a sync action
describe('List Actions', () => {
    describe('loadList', () => {
        it('should create a LOAD_LIST_SUCCESS action', (done) => {

            afterEach(() => {
                nock.cleanAll();
            });

            //arrange
            const listId = 1;
            let listToLoad = {"id":listId,"contributors":[],"isPublic":null,"name":"learnItemListNEW","description":"c","numberOfLearnItemsInList":0};

            const expectedActions = [{
                type: types.LOAD_LIST_SUCCESS,
                list: listToLoad
            }];

            nock(host)
               .get('/api/learnitemlists/'+listId)
               .reply(200, [{"id":listId,"contributors":[],"isPublic":null,"name":"learnItemListNEW","description":"c","numberOfLearnItemsInList":0}]);


            const action = listActions.loadList(listId);

            //act
            const store = mockStore({courses: []}, expectedActions);
            store.dispatch(listActions.loadList(listId)).then(() => {

                //assert
                const actions = store.getActions();
                expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
                expect(actions[1].type).toEqual(types.LOAD_LIST_SUCCESS);
                expect(actions[1]).toEqual(expectedActions[0]);
                done();
            });

        });
    });

    describe('saveList', () => {
        it('should create a BEGIN_AJAX_CALL and a LOAD_LIST_SUCCESS action', (done) => {

            afterEach(() => {
                nock.cleanAll();
            });

            //arrange
            let listToSave = {"id":1,"contributors":[],"isPublic":null,"name":"learnItemListNEW","description":"c","numberOfLearnItemsInList":0};

            const expectedActions = [{type: types.BEGIN_AJAX_CALL},{
                type: types.SAVE_LIST_SUCCESS,
                list: listToSave
            }];

            nock(host)
                .post('/api/learnitemlists')
                .reply(201, [listToSave]);

            //act
            const action = listActions.saveList(listToSave);

            const store = mockStore({courses: []}, expectedActions);
            store.dispatch(action).then(() => {
                //assert

                const actions = store.getActions();
                expect(actions[0]).toEqual(expectedActions[0]);
                expect(actions[1]).toEqual(expectedActions[1]);
                done();
            });

        });
    });

    //loadLists(pageNumber,pageSize)
    describe('loadlists', () => {
        it('should create a BEGIN_AJAX_CALL and a LOAD_LISTS_SUCCESS action', (done) => {

            afterEach(() => {
                nock.cleanAll();
            });

            //arrange
            const pagenumber = 0;
            const pagesize = 10;

            const listsToLoad = [{},{},{},{},{},{},{},{},{},{}];

            const expectedActions = [{type: types.BEGIN_AJAX_CALL},{
                type: types.LOAD_LISTS_SUCCESS,
                totalCount: 0,
                lists: listsToLoad
            }];

            nock(host)
                .get('/api/learnitemlists')
                .query({pagenumber,pagesize})
                .reply(200, listsToLoad);

            //act
            const action = listActions.loadLists(pagenumber,pagesize);

            const store = mockStore({courses: []}, expectedActions);
            store.dispatch(action).then(() => {
                //assert

                const actions = store.getActions();
                expect(actions[0]).toEqual(expectedActions[0]);
                expect(actions[1]).toEqual(expectedActions[1]);
                done();
            });

        });
    });

});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);