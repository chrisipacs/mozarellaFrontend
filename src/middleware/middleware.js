/**
 * Created by krisztian on 2016. 11. 28..
 */
import realLearnItemApi from '../api/LearnItemApi';
import realListApi from '../api/ListApi';
import realLoginApi from '../api/LoginApi';
import realSignupApi from '../api/SignupApi';
import realStudentApi from '../api/StudentApi';

//not used anymore:
//import mockLearnItemApi from '../mockApi/LearnItemApi';
//import mockListApi from '../mockApi/ListApi';
//import mockLoginApi from '../mockApi/LoginApi';
//import mockSignupApi from '../mockApi/SignupApi';

let learnItemApi, listApi, loginApi, signupApi, studentApi;

//if(process.env.NODE_ENV == 'prod'){
    learnItemApi = realLearnItemApi;
    listApi = realListApi;
    loginApi = realLoginApi;
    signupApi = realSignupApi;
    studentApi = realStudentApi;

//Mock api is not used anymore to avoid maintanence

//} else {
//    learnItemApi = mockLearnItemApi;
//    listApi = mockListApi;
//    loginApi = mockLoginApi;
//    signupApi = mockSignupApi;
//}

export {learnItemApi};
export {listApi};
export {loginApi};
export {signupApi};
export {studentApi};