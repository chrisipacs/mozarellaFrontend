/**
 * Created by krisztian on 2016. 10. 30..
 */
import delay from './delay';
import token from './token';
import students from './students';

class LoginApi {

    constructor(){

    }

    static studentWithName(name){
        return function(student){
            return student.name==name;
        }
    }

    static login(username,password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let student = students.find(LoginApi.studentWithName(username));
                if(student && student.password==password){
                    resolve(Object.assign({}, student));
                } else {
                    reject();
                }
            }, delay);
        });
    }
}

export default LoginApi;