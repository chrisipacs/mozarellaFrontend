/**
 * Created by krisztian on 2016. 11. 28..
 */
let host='http://localhost:8280';

if(process.env.NODE_ENV == 'production'){
    host='https://mysterious-cove-92631.herokuapp.com';
}

export default host;