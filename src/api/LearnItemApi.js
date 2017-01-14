/**
 * Created by krisztian on 2016. 11. 28..
 */

import requestObjects from './RequestObjects';
import sendObject from './SendObject';

class LearnItemApi {

    static getLearnItemsToLearn(listId, numberOfLearnItems){
        return new Promise((resolve, reject) => {
        });
    }

    static saveLearnItem(learnItem){
        //localStorage.setItem('token',token);
        return new Promise((resolve, reject) => {

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