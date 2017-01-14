/**
 * Created by krisztian on 2016. 11. 28..
 */
/**
 * Created by krisztian on 2016. 10. 30..
 */
import host from './host';
import 'whatwg-fetch';
import requestObjects from './RequestObjects';

class LoginApi {

    constructor(){

    }

    static studentWithName(name){
        return requestObjects('/api/students?name='+name,'GET').then((students)=>{
            return students.objects;
        })
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
                    return response.text();
                })
                .then(function(token){
                    localStorage.setItem('token',token);
                    return that.studentWithName(username);
                }).then(function(students){
                    //let a = Object.assign({}, students[0]);
                    console.log('after studentwithname'+JSON.stringify(students[0]));
                    resolve(Object.assign({}, students[0]));
                })
                .catch(function(error) {
                    console.log('login failed', error);
                    reject(error);
                })
        });
    }
}

export default LoginApi;