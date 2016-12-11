/**
 * Created by krisztian on 2016. 11. 28..
 */
/**
 * Created by krisztian on 2016. 10. 30..
 */
import host from './host';
import 'whatwg-fetch';

class LoginApi {

    constructor(){

    }

    static studentWithName(name){
        return new Promise((resolve, reject) => {
            let token = localStorage.getItem('token');

            fetch(host+'/api/students?name='+name,{
                method: "GET",
                headers: {
                    'Authorization' : 'Bearer '+token
                }
                })
                .then(function(response) {
                    console.log('response1: '+response);
                    if(response.status==401){
                        reject('invalid credentials');
                    }
                    return response.json();
                })
                .then(function(studentsJSON) {
                    resolve(Object.assign({}, studentsJSON[0]));
                })
                .catch(function(error) {
                    reject(error);
                })
        });
    }

    static saveToken(jwt){

    }

    static login(username,password) {
        console.log('real login');
        let that = this;

        return new Promise((resolve, reject) => {
            fetch(host+'/login',{
                method: "POST",
                headers: {
                    //'Content-Type': 'application/json'
                    'Authorization' : 'Basic'+btoa(username+':'+password)
                }
                })
                .then(function(response) {
                    console.log('response1: '+response);
                    return response.text();
                })
                .then(function(token){
                    console.log('token obtained: '+token);
                    localStorage.setItem('token',token);

                    return that.studentWithName(username);
                }).then(function(student){
                    resolve(Object.assign({}, student));
                })
                .catch(function(error) {
                    console.log('login failed', error);
                    reject(error);
                })
        });
    }
}

export default LoginApi;