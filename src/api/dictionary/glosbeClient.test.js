/**
 * Created by krisztian on 2017. 04. 23..
 */

import expect from 'expect';
import nock from 'nock';
import glosbeClient from './glosbeClient';

describe('Send Object', () => {

    /* not testable at the moment due to limitations in nock

    it('should call the glosbe url with the http GET method with a jsonp request', (done) => {


        let fromLanguage = 'en';
        let toLanguage = 'hu';
        let expression = 'dog';

        afterEach(() => {
            nock.cleanAll();
        });

        glosbeClient(fromLanguage,toLanguage,expression);

        //https://glosbe.com/gapi/translate?from={fromLanguage}&dest={toLanguage}&format=json&phrase={toTranslate}&pretty=true
        //arrange

        nock('https://glosbe.com',{
        })
        .get('/gapi/translate?from=en&dest=hu&format=json&phrase=dog&pretty=true')
        .reply(200,{});

        console.log('BEFORE!!!!!!');

        //act
        glosbeClient(fromLanguage,toLanguage,expression).then(()=>{
            console.log('THEN!!!!!!');
            //assert
            expect(nock.isDone()).toBe(true);
            done();
        }).catch((err)=>{
            //we accept this because nock is not able to mock jsonp requests at the moment
            done();
        });

    }); */

});