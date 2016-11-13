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
                    console.log('will be resolved');
                    resolve(Object.assign({}, student));
                } else {
                    console.log('will be rejected');
                    reject();
                }
            }, delay);
        });
    }
}

export default LoginApi;