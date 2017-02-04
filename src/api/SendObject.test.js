/**
 * Created by krisztian on 2017. 02. 04..
 */
/**
 * Created by krisztian on 2017. 02. 03..
 */

import expect from 'expect';
import nock from 'nock';
import host from '../api/host';
import sendObject from './SendObject'

// Test a sync action
describe('Send Object', () => {

    it('should call the url with the http POST method with a jwt token in the request headers', (done) => {

        afterEach(() => {
            nock.cleanAll();
        });

        //arrange
        nock(host)
            .get('/someexamplemockaddress',{
                reqheaders: {
                    'authorization': 'Basic Auth'
                }
            })
            .reply(200,[]);

        //act
        requestObjects('/someexamplemockaddress','POST').then(()=>{

            //assert
            expect(nock.isDone()).toBe(true);
            done();
        });
    });

});