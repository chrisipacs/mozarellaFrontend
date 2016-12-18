/**
 * Created by krisztian on 2016. 12. 15..
 */
import host from './host';
import 'whatwg-fetch';

//abstraction for the fetch logic to avoid repetition when querying objects
//only for the /api methods

export default (path,method,toSend)=>{

    return new Promise((resolve, reject) => {
        let token = localStorage.getItem('token');
        console.log(path+'token: '+token);

        fetch(host+path,{
            method: method,
            headers: {
                'Authorization' : 'Bearer '+token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(toSend)
        })
        .then(function(response) {
            if(response.status==401){
                reject('invalid credentials');
            }
            resolve(response.status);
        })
        .catch(function(error) {
            reject(error);
        })
    });
}