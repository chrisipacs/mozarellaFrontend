/**
 * Created by krisztian on 2016. 11. 28..
 */
import realLearnItemApi from '../api/LearnItemApi';
import realListApi from '../api/ListApi';
import realLoginApi from '../api/LoginApi';
import realSignupApi from '../api/SignupApi';

import mockLearnItemApi from '../mockApi/LearnItemApi';
import mockListApi from '../mockApi/ListApi';
import mockLoginApi from '../mockApi/LoginApi';
import mockSignupApi from '../mockApi/SignupApi';

let learnItemApi, listApi, loginApi, signupApi;

if(process.env.NODE_ENV == 'prod'){
    learnItemApi = realLearnItemApi;
    listApi = realListApi;
    loginApi = realLoginApi;
    signupApi = realSignupApi;
} else {
    learnItemApi = mockLearnItemApi;
    listApi = mockListApi;
    loginApi = mockLoginApi;
    signupApi = mockSignupApi;
}

export {learnItemApi};
export {listApi};
export {loginApi};
export {signupApi};