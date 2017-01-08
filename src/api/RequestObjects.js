/**
 * Created by krisztian on 2016. 12. 11..
 */
import host from './host';
import 'whatwg-fetch';

//abstraction for the fetch logic to avoid repetition when querying objects
//only for the /api methods

export default (path,method)=>{

    return new Promise((resolve, reject) => {
        let token = localStorage.getItem('token');

        fetch(host+path,{
            method: method,
            headers: {
                'Authorization' : 'Bearer '+token
            }
        })
        .then(function(response) {

            if(response.status==401){
                reject('invalid credentials');
            }

            return response.json();
        })
        .then(function(responseObject) { //TODO this part doesn't belong here!
            console.log('response: '+JSON.stringify(responseObject));
            resolve(responseObject);
        })
        .catch(function(error) {
                console.log('rejecting... '+JSON.stringify(error));
            reject(error);
        })
    });


}

