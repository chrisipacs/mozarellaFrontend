/**
 * Created by krisztian on 2017. 02. 04..
 */

import expect from 'expect';
import * as listActions from './../src/actions/listActions';
import * as types from './../src/actions/actionTypes';

import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock'
import nock from 'nock';

import configureMockStore from 'redux-mock-store';
import host from '../src/api/host';

// Test a sync action
describe('Login Actions', () => {
    describe('login', () => {
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

            //act
            const action = listActions.loadList(listId);

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
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);