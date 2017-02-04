/**
 * Created by krisztian on 2017. 02. 03..
 */

import expect from 'expect';
import nock from 'nock';
import host from '../src/api/host';
import requestObjects from './../src/api/RequestObjects'

// Test a sync action
describe('Request Objects', () => {

    it('should call the url with the right http method', (done) => {

        afterEach(() => {
            nock.cleanAll();
        });

        //arrange
        nock(host)
            .get('/someexamplemockaddress')
            .reply(200,[]);

        //act
        requestObjects('/someexamplemockaddress','GET').then(()=>{

            //assert
            expect(nock.isDone()).toBe(true);
            done();
        });
    });

    it('should use the specified http method', (done) => {

        afterEach(() => {
            nock.cleanAll();
        });

        nock(host)
            .post('/someexamplemockaddress')
            .reply(200,[]);

        //act
        requestObjects('/someexamplemockaddress','POST').then((response)=>{
            //assert
            expect(nock.isDone()).toBe(true);
            done();
        });
    });

    it('should return the content as an array', (done) => {

        afterEach(() => {
            nock.cleanAll();
        });


        //arrange
        nock(host)
            .get('/someexamplemockaddress')
            .reply(200,[{},{}]);

        //act
        requestObjects('/someexamplemockaddress','GET').then((response)=>{

            //assert
            expect(Array.isArray(response.objects)).toBe(true);
            expect(response.objects.length).toBe(2);

            done();
        });
    });

    it('should return the header map', (done) => {

        afterEach(() => {
            nock.cleanAll();
        });

        //arrange
        nock(host)
            .get('/someexamplemockaddress')
            .reply(200,[],{
            'X-My-Headers': 'Header value'
        });

        //act
        requestObjects('/someexamplemockaddress','GET').then((response)=>{

            //assert
            expect(response.headers.get('X-My-Headers')).toBe('Header value');
            done();
        });
    });

});