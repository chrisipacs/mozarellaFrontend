/**
 * Created by krisztian on 2016. 11. 28..
 */
/**
 * Created by krisztian on 17/09/16.
 */

import requestObjects from './RequestObjects';
import sendObject from './SendObject';

class ListApi {
    static getAllLists(pageNumber,pageSize) {
        return new Promise((resolve, reject) => {
            requestObjects('/api/learnitemlists?pagenumber='+pageNumber+'&&pagesize='+pageSize,'GET')
            .then(function(result){
                resolve({totalCount: Number(result.headers.get('X-total-count')),lists:result.objects});
            }).catch(function(error) {
                reject(error);
            });
        });
    }

    static getList(listId) {
        return new Promise((resolve, reject) => {
            requestObjects('/api/learnitemlists/'+listId,'GET').then((response)=>{
                resolve(response.objects[0]);
            }).catch(function(error) {
                reject(error);
            });
        })
    }

    static addList(list) { //TODO: rename to saveList
        return new Promise((resolve, reject) => {
            sendObject('/api/learnitemlists','POST',list).then((response)=>{
                resolve(response.objects[0]); //response doesn't contain the newly added list, we must resolve with the exact same thing that was sent in
            }).catch(function(error) {
                reject(error);
            });
        });
    }
}

export default ListApi;