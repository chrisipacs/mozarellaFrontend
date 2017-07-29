/**
 * Created by krisztian on 2017. 07. 09..
 */

import expect from 'expect';
import learnReducer from './learnReducer';
import * as actions from '../actions/studentActions';

describe('LearnItem Reducer', () => {
    it('should remove the learnItem with the given index on REMOVE_LEARNABLE_LEARNITEM', () => {
        // arrange

        const initialState =
        {
            learnItems: [{id:0,text:'item1'},{id:1,text:'item2'}],
            successfullyAnsweredIds: []
        };

        const action = actions.removeLearnableLearnItem(0);

        //act
        const newState = learnReducer(initialState, action);

        //assert
        expect(newState.learnItems.length).toEqual(1);
    });

    it('should merge the new learnItems with the existing list on LOAD_LEARNITEM_SUCCESS', () => {
        // arrange

        const initialState =
        {
            learnItems: [{id:0,text:'item1'},{id:1,text:'item2'}],
            successfullyAnsweredIds: []
        };

        const newItems = [{id:0,text:'item1'},{id:1,text:'item2'},{id:2,text:'item3'}];
        const action = actions.loadLearnableLearnItemsSuccess(newItems);

        //act
        const newState = learnReducer(initialState, action);

        //assert
        expect(newState.learnItems.length).toEqual(3);
    });

});