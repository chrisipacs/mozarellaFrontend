/**
 * Created by krisztian on 2017. 03. 05..
 */

import expect from 'expect';
import studentsListReducer from './studentsListReducer';
import * as actions from '../actions/studentActions';
import * as listActions from '../actions/listActions';
import * as learnItemActions from '../actions/learnItemActions';

describe('Student\'s list Reducer', () => {

    it('should load lists into student.listsContext when passed LOAD_STUDENT_LIST_SUCCESS', () => {
        // arrange

        const initialState =
        {
            totalCount: 0,
            pageSize: 10,
            activePage:0
        };

        const totalCount = 42;

        const listsToLoad = [{
            name: 'testList',
            isPublic: true,
            fromLanguage: '',
            toLanguage: '',
            description: ''
        }];

        //loadStudentListsSuccess(result.lists,result.totalCount)

        const action = listActions.loadStudentListsSuccess(listsToLoad,totalCount);

        //act
        const newState = studentsListReducer(initialState, action);

        //assert
        expect(newState.lists[0].name).toEqual(listsToLoad[0].name);
        expect(newState.totalCount).toEqual(totalCount);
    });


    it('should load list into student.listsContext when passed SIGNUP_STUDENT_TO_LIST_SUCCESS ', () => {
        // arrange

        const initialState =
        {
            totalCount: 0,
            pageSize: 10,
            activePage:0,
            lists:[]
        };

        const totalCount = 42;

        const listToSignupTo = {
            name: 'testList',
            isPublic: true,
            fromLanguage: '',
            toLanguage: '',
            description: ''
        };

        const action = actions.signupToListSuccess(listToSignupTo);

        //act
        const newState = studentsListReducer(initialState, action);

        //assert
        expect(newState.lists[0]).toEqual(listToSignupTo);
    });

    it('should remove list from student.listsContext when passed DEREGISTER_STUDENT_FROM_LIST_SUCCESS', () => {
        // arrange

        const listToUnsubscribeFrom = {
            id: 11,
            name: 'testList',
            isPublic: true,
            fromLanguage: '',
            toLanguage: '',
            description: ''
        };

        const initialState =
        {
            totalCount: 0,
            pageSize: 10,
            activePage:0,
            lists:[listToUnsubscribeFrom]
        };

        const totalCount = 42;

        const action = actions.deregisterFromListSuccess(listToUnsubscribeFrom);

        //act
        const newState = studentsListReducer(initialState, action);

        //assert
        expect(newState.lists[0]).toNotEqual(listToUnsubscribeFrom);
    });

});