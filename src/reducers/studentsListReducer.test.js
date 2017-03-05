/**
 * Created by krisztian on 2017. 03. 05..
 */

import expect from 'expect';
import studentsListReducer from './studentsListReducer';
import * as actions from '../actions/listActions';
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

        const action = actions.loadStudentListsSuccess(listsToLoad,totalCount);

        //act
        const newState = studentsListReducer(initialState, action);

        //assert
        expect(newState.lists[0].name).toEqual(listsToLoad[0].name);
        expect(newState.totalCount).toEqual(totalCount);
    });

});