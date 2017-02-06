/**
 * Created by krisztian on 2017. 02. 05..
 */

import expect from 'expect';
import * as signupActions from './signupActions';
import * as types from './actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';

import configureMockStore from 'redux-mock-store';
import host from '../api/host';

// Test a sync action
describe('Signup Actions', () => {
    describe('signup', () => {
        it('should create a BEGIN_AJAX_CALL and a SIGNUP_SUCCESS action', (done) => {

            afterEach(() => {
                nock.cleanAll();
            });

            //arrange
            let studentToSignUp = {
                "id":74,
                "name":"aglast5",
                "password":"12345",
                "salt":"abcd",
                "role":"user",
                "inputSanitizer":{},
                "authorities":[{"authority":"ROLE_STUDENT"}],
                "username":"aglast5",
                "enabled":false,
                "credentialsNonExpired":false,
                "accountNonLocked":false,
                "accountNonExpired":false
            };

            const expectedActions = [
                {
                    type: types.BEGIN_AJAX_CALL
                },{
                    type: types.SIGNUP_SUCCESS,
                    student: studentToSignUp
                }
            ];

            nock(host)
                .post('/api/students',studentToSignUp)
                .reply(201,studentToSignUp);

            //act
            const action = signupActions.signUp(studentToSignUp);

            const store = mockStore({});
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