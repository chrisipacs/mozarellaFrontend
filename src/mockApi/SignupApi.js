/**
 * Created by krisztian on 2016. 10. 31..
 */
import delay from './delay';
import students from './students';

class SignupApi {

    static studentWithName(name){
        return function(student){
            return student.name==name;
        }
    }

    static isUsernameFree(name){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let student = students.find(SignupApi.studentWithName(name));
                if(student){
                    resolve(false);
                } else {
                    resolve(true);
                }

            }, delay);
        });
    }

    static signUp(student) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(student);
            }, delay);
        });
    }
}

export default SignupApi;