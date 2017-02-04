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
        nock(host,{
            reqheaders: {
                'Authorization': 'Bearer ',
                'Content-Type': 'application/json'
            }
        })
        .post('/someexamplemockaddress')
        .reply(201,{});

        //act
        sendObject('/someexamplemockaddress','POST').then(()=>{

            //assert
            expect(nock.isDone()).toBe(true);
            done();
        });
    });

    it('should send the object', (done) => {

        afterEach(() => {
            nock.cleanAll();
        });

        //arrange
        let toSend = {
            field1 : 'value1'
        };


        nock(host)
            .post('/someexamplemockaddress',toSend)
            .reply(201,{});

        //act
        sendObject('/someexamplemockaddress','POST',toSend).then(()=>{

            //assert
            expect(nock.isDone()).toBe(true);
            done();
        });
    });

    it('should return the http status code', (done) => {

        afterEach(() => {
            nock.cleanAll();
        });

        //arrange
        let toSend = {
            field1 : 'value1'
        };


        nock(host)
            .post('/someexamplemockaddress',toSend)
            .reply(201,{});

        //act
        sendObject('/someexamplemockaddress','POST',toSend).then((response)=>{

            //assert
            expect(response.status).toBe(201);
            done();
        });
    });

});