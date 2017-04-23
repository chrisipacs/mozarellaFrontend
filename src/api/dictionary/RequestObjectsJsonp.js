import fetch from 'fetch-jsonp';

//abstraction for the fetch logic to avoid repetition when querying objects
//only for the /api methods


export default (path)=>{
    let createNewResponse = function (response){ //TODO find a better name
        return response.json().then((objects)=>{
            return {objects:objects, headers:response.headers}});
    };

    return new Promise((resolve, reject) => {

        fetch(path,{
            method: 'GET'
        })
        .then(function(response) {
            if(response.status==401){
                reject('invalid credentials');
            }

            createNewResponse(response).then((resp)=>{
                resolve(resp);
            }).catch((err)=>{
                reject(err);
            });
        });

    });
}