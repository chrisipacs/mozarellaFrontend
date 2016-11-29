/**
 * Created by krisztian on 2016. 11. 28..
 */
let host='localhost:8280/api';

if(process.env.NODE_ENV == 'prod'){
    let host='mysterious-cove-92631.herokuapp.com/api';
}

export default host;