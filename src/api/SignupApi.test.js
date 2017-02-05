/**
 * Created by krisztian on 2017. 02. 05..
 */
//isUsernameFree

import expect from 'expect';
import signupApi from './SignupApi';

import nock from 'nock';

import host from '../api/host';

// Test a sync action
describe('Signup Actions', () => {
    describe('isUsernameFree', () => {
        it('should return false for already existing student names', (done) => {

            afterEach(() => {
                nock.cleanAll();
            });

            //arrange
            let studentName = 'Anakin Skywalker';

            nock(host)
                .get('/usernameavailable')
                .query({name: studentName})
                .reply(200,[false]);

            //act
            signupApi.isUsernameFree(studentName).then(result=>{
                //assert
                expect(result).toEqual(false);
                done();
            });

        });
    });
});