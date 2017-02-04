/**
 * Created by krisztian on 2016. 12. 15..
 */
import host from './host';
import 'whatwg-fetch';

//abstraction for the fetch logic to avoid repetition when querying objects
//only for the /api methods

export default (path,method,toSend)=>{

    let createNewResponse = function (response){ //TODO find a better name
        return response.json().then((objects)=>{
            return {objects:objects, headers:response.headers, status:response.status}});
    };

    return new Promise((resolve, reject) => {
        let token = '';

        if(window.localStorage){
            token = window.localStorage.getItem('token');
        }

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

            createNewResponse(response).then((resp)=>{
                resolve(resp);
            })
        })
        .catch(function(error) {
            reject(error);
        })
    });
}