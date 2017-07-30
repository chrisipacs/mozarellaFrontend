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
        it('should create a BEGIN_AJAX_CALL, a LOADING_LEARNABLE_LEARNITEMS_START, and a LOAD_LEARNABLE_LEARNITEMS action', (done) => {

            afterEach(() => {
                nock.cleanAll();
            });

            //arrange
            const listId = 1;
            const numberToLoad = 10;
            const studentId = 42;
            let learnItemsToLoad = [{},{},{},{},{},{},{},{},{},{}];

            const expectedActions = [{type: types.BEGIN_AJAX_CALL},{type: types.LOADING_LEARNABLE_LEARNITEMS_START},{
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
                expect(actions[2]).toEqual(expectedActions[2]);
                done();
            });

        });
    });

    describe('subscribeStudentToList', () => {
        it('should create a BEGIN_AJAX_CALL, and a SIGNUP_STUDENT_TO_LIST_SUCCESS action', (done) => {

            afterEach(() => {
                nock.cleanAll();
            });

            //arrange
            const listToSignUpTo = {
                id:11
            };

            const studentToSignUp = {
                id:42
            };

            const expectedActions = [{type: types.BEGIN_AJAX_CALL},{
                type: types.SIGNUP_STUDENT_TO_LIST_SUCCESS,
                list: listToSignUpTo
            }];

            nock(host)
                .post('/api/students/'+studentToSignUp.id+'/learnitemlists',listToSignUpTo)
                .reply(200);


            const action = studentActions.subscribeStudentToList(studentToSignUp,listToSignUpTo);

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

    describe('deregisterStudentFromList', () => {
        it('should create a BEGIN_AJAX_CALL, and a DEREGISTER_STUDENT_FROM_LIST_SUCCESS action', (done) => {

            afterEach(() => {
                nock.cleanAll();
            });

            //arrange
            const listToDeregisterFrom = {
                id:11
            };

            const studentToSignUp = {
                id:42
            };

            const expectedActions = [{type: types.BEGIN_AJAX_CALL},{
                type: types.DEREGISTER_STUDENT_FROM_LIST_SUCCESS,
                list: listToDeregisterFrom
            }];

            nock(host)
                .delete('/api/students/'+studentToSignUp.id+'/learnitemlists/'+listToDeregisterFrom.id)
                .reply(200);


            const action = studentActions.deregisterStudentFromList(studentToSignUp,listToDeregisterFrom);

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