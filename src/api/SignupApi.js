/**
 * Created by krisztian on 2016. 11. 28..
 */
import host from './host';
//import fetch from 'whatwg-fetch';
import 'whatwg-fetch';

class SignupApi {

    static studentWithName(name){
        return function(student){
            return student.name==name;
        }
    }

    static isUsernameFree(name){
        console.log('real isusernamefree');
        return new Promise((resolve, reject) => {
            fetch(host+'/usernameavailable?name='+name)
                .then(function(response) {
                    //console.log('request succeeded with JSON response', response.text());
                    return response.text();
                })
                .then(function(text){
                    console.log(text)
                    if(text.isArray && text.length>0){
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                })
                .catch(function(error) {
                    console.log('request failed', error);
                    reject();
                })
        });
    }

    static signUp(student) {
        return new Promise((resolve, reject) => {

        });
    }
}

export default SignupApi;