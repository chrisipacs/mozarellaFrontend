/**
 * Created by krisztian on 2017. 01. 27..
 */

import expect from 'expect';
import studentReducer from './studentReducer';
import * as actions from '../actions/loginActions';

describe('Student Reducer', () => {
    it('should load student into store when passed LOGIN_SUCCESS', () => {
        // arrange

        const initialState =
        {
            student: {}
        };

        const studentToLoad = {
            id: 42,
            name: 'Anakin Skywalker'
        };

        const action = actions.loginSuccess(studentToLoad);

        //act
        const newState = studentReducer(initialState, action);

        //assert
        expect(newState.name).toEqual('Anakin Skywalker');
    });
});