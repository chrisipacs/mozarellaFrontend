/**
 * Created by krisztian on 2016. 11. 28..
 */
import host from './host';
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
                    return response.json();
                })
                .then(function(result){
                    resolve(JSON.parse(result))
                })
                .catch(function(error) {
                    console.log('request failed', error);
                    reject();
                })
        });
    }

    static signUp(student) {
        console.log('signup real api');
        return new Promise((resolve, reject) => {
            console.log('signup real api '+JSON.stringify(student));

            let data = JSON.stringify(student);

            fetch(host+'/api/students',{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
                })
                .then(function(response) {
                    return response.text();
                })
                .then(function(text){
                    console.log('response: '+text);
                })
                .catch(function(error) {
                    console.log('request failed', error);
                    reject();
                })
        });
    }
}

export default SignupApi;