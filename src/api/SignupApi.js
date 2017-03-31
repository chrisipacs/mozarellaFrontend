/**
 * Created by krisztian on 2016. 11. 28..
 */
import host from './host';
import 'whatwg-fetch';

class SignupApi {

    static isUsernameFree(name){
        return new Promise((resolve, reject) => {
            fetch(host+'/usernameavailable?name='+name,
                {
                    method: "GET"
                })
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
        return new Promise((resolve, reject) => {

            let data = JSON.stringify(student);

            fetch(host+'/api/students',{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data
                })
                .then(function(response){ //studentId
                    return response.text();
                })
                .then(function(response){
                    resolve(response);
                })
                .catch(function(error) {
                    console.log('request failed', error);
                    reject();
                })
        });
    }
}

export default SignupApi;