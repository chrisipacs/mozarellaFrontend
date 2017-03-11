/**
 * Created by krisztian on 2016. 11. 28..
 */

import requestObjects from './RequestObjects';
import sendObject from './SendObject';

class LearnItemApi {

    static saveLearnItem(learnItem,listId){
        return new Promise((resolve, reject) => {
            sendObject('/api/learnitemlists/'+listId+'/learnitems','POST',[learnItem])
                .then(function(result){
                    resolve(result.objects[0]);
                }).catch(function(error) {
                    reject(error);
                });
        });
    }

    static getLearnItemsForList(listId,pageNumber) {
        return new Promise((resolve, reject) => {
            requestObjects('/api/learnitemlists/'+listId+'/learnitems?pagenumber='+pageNumber+'&&pagesize='+10,'GET')
                .then(function(result){
                    resolve({totalCount: Number(result.headers.get('X-total-count')),learnItems:result.objects});
                }).catch(function(error) {
                    reject(error);
                });
        });
    }
}

export default LearnItemApi;