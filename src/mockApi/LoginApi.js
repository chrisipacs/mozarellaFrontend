/**
 * Created by krisztian on 2016. 10. 30..
 */
import delay from './delay';
import token from './token';

let student = {
    name: 'testUser',
    token: token
};

class LoginApi {
    static login() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign({}, student));
            }, delay);
        });
    }
}

export default LoginApi;