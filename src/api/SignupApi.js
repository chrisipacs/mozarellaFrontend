/**
 * Created by krisztian on 2016. 11. 28..
 */
import host from './host';
import request from 'request';

class SignupApi {

    static studentWithName(name){
        return function(student){
            return student.name==name;
        }
    }

    static isUsernameFree(name){
        return new Promise((resolve, reject) => {
            request
                .get(host+'/img.png')
                .on('response', function(response) {
                    if(response.isArray && response.length>0){
                        resolve(false);
                    } else {
                        resolve(true);
                    }
                })
                .pipe(request.put('http://mysite.com/img.png'))
        });
    }

    static signUp(student) {
        return new Promise((resolve, reject) => {

        });
    }
}

export default SignupApi;