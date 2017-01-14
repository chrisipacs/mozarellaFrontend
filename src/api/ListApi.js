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
                resolve({totalCount: Number(result.headers.get('X-total-count')),lists:result.objects.content});
            }).catch(function(error) {
                reject(error);
            });
        });
    }

    static getNumberOfLearnItems(){
        //TODO implement this on both the frontend and backend side
        return new Promise((resolve, reject) => {

        });
    }

    static getList(listId) {
        return new Promise((resolve, reject) => {

        });
    }

    static addList(list) {
        return new Promise((resolve, reject) => {
            return sendObject('/api/learnitemlists','POST',list);
        });
    }
}

export default ListApi;