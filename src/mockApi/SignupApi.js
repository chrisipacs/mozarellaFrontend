/**
 * Created by krisztian on 2016. 10. 31..
 */
import delay from './delay';

class SignupApi {
    static signUp(student) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(student);
            }, delay);
        });
    }
}

export default SignupApi;