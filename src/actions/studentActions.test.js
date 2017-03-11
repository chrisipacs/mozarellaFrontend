/**
 * Created by krisztian on 2017. 03. 11..
 */


import expect from 'expect';
import * as studentActions from './studentActions';
import * as types from './actionTypes';

import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock'
import nock from 'nock';

import configureMockStore from 'redux-mock-store';
import host from '../api/host';


//loadLearnItemsToLearn
//saveLearnItem

// Test a sync action
describe('Learnitem Actions', () => {

    describe('loadLearnItemsToLearn', () => {
        it('should create a BEGIN_AJAX_CALL, and a LOAD_LEARNABLE_LEARNITEMS action', (done) => {

            afterEach(() => {
                nock.cleanAll();
            });

            //arrange
            const listId = 1;
            const numberToLoad = 10;
            const studentId = 42;
            let learnItemsToLoad = [{},{},{},{},{},{},{},{},{},{}];

            const expectedActions = [{type: types.BEGIN_AJAX_CALL},{
                type: types.LOAD_LEARNABLE_LEARNITEMS_SUCCESS,
                learnItems: learnItemsToLoad
            }];

            nock(host)
                .get('/api/students/'+studentId+'/learnitemlists/'+listId+'/learnitems')
                .query({count:'10'})
                .reply(200, learnItemsToLoad);


            const action = studentActions.loadLearnItemsToLearn(studentId,listId,numberToLoad);


            //act
            const store = mockStore({}, expectedActions);
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