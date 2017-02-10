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

    static studentWithName(name){
        return requestObjects('/api/students?name='+name,'GET').then((students)=>{
            return students.objects;
        })
    }

    static checkStatus(response) {
        if (response.status >= 200 && response.status < 300) {
            return response
        } else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error
        }
    }

    static login(username,password) {
        let that = this;

        return new Promise((resolve, reject) => {
            fetch(host+'/login',{
                method: "POST",
                headers: {
                    'Authorization' : 'Basic'+btoa(username+':'+password)
                }
                })
                .then(that.checkStatus)
                .then(function(response) {
                    return response.text();
                })
                .then(function(token){
                    if(window.localStorage){
                        window.localStorage.setItem('token',token);
                    }
                    return that.studentWithName(username);
                }).then(function(students){
                    resolve(Object.assign({}, students[0]));
                })
                .catch(function(error) {
                    reject(error);
                })
        });
    }
}

export default LoginApi;