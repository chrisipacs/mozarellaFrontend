import host from './host';
import 'isomorphic-fetch';

//abstraction for the fetch logic to avoid repetition when querying objects
//only for the /api methods


export default (path,method)=>{
    let createNewResponse = function (response){ //TODO find a better name
        return response.json().then((objects)=>{
            return {objects:objects, headers:response.headers}});
    };

    return new Promise((resolve, reject) => {

        let token = '';

        if(window.localStorage){
            token = window.localStorage.getItem('token');
        }


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

                createNewResponse(response).then((resp)=>{
                    resolve(resp);
                })
            });

    });
}