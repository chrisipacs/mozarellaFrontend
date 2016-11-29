/**
 * Created by krisztian on 2016. 11. 28..
 */
/**
 * Created by krisztian on 2016. 10. 30..
 */

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

        });
    }
}

export default LoginApi;