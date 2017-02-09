/**
 * Created by krisztian on 2017. 02. 04..
 */

import expect from 'expect';
import * as loginActions from './loginActions';
import * as types from './actionTypes';

import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock'
import nock from 'nock';

import configureMockStore from 'redux-mock-store';
import host from '../api/host';

// Test a sync action
function setNock(student) {
    nock(host, {
        reqheaders: {
            'Authorization': 'Basic' + btoa(student.name + ':' + student.password)
        }
    })
        .post('/login')
        .reply(200, [{name: 'someStudent'}]);

    nock(host)
        .get('/api/students?name=someStudent')
        .reply(200, [{name: 'someStudent', password:'somePassword'}]);
}

describe('Login Actions', () => {
    describe('login', () => {
        it('should send a basic auth header in username:password format', (done) => {
            afterEach(() => {
                nock.cleanAll();
            });

            //arrange
            let student = {name:'someStudent',password:'somePassword'};

            setNock(student);

            //act
            let action = loginActions.login(student.name,student.password);

            const store = mockStore({});
            store.dispatch(action).then(() => {
                //assert

                expect(nock.isDone()).toBe(true);
                done();
            });
        });

        it('should create a BEGIN_AJAX_CALL and a LOGIN_SUCCESS action', (done) => {
            afterEach(() => {
                nock.cleanAll();
            });

            //arrange
            let student = {name:'someStudent',password:'somePassword'};

            const expectedActions = [
                {
                    type: types.BEGIN_AJAX_CALL
                },{
                    type: types.LOGIN_SUCCESS,
                    student: student
                }
            ];

            setNock(student);
            //act
            let action = loginActions.login(student.name,student.password);

            const store = mockStore({});
            store.dispatch(action).then(() => {
                //assert
                const actions = store.getActions();

                expect(actions[0]).toEqual(expectedActions[0]);
                expect(actions[1]).toEqual(expectedActions[1]);

                done();
            });
        });

        it('should throw an exception when credentials are incorrect', (done) => {
            afterEach(() => {
                nock.cleanAll();
            });

            //arrange
            let invalidStudent = {name:'someStudent',password:'wrongPassword'};

                nock(host, {
                    reqheaders: {
                        'Authorization': 'Basic' + btoa(invalidStudent.name + ':' + invalidStudent.password)
                    }
                })
                .post('/login')
                .reply(401, {a:'nyad'});

            //act
            let action = loginActions.login(invalidStudent.name,invalidStudent.password);

            const store = mockStore({});

            store.dispatch(action).catch(error => {
                done();
            });
        });

    });
});



const middleware = [thunk];
const mockStore = configureMockStore(middleware);