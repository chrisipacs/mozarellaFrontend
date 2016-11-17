/**
 * Created by krisztian on 24/09/16.
 */
import delay from './delay';
import pageSize from '../constants';
import mockLearnItems from './learnItems';


class LearnItemApi {

    static getLearnItemsToLearn(listId, numberOfLearnItems){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                console.log('lets see');
                console.log(mockLearnItems.eng.splice(0, numberOfLearnItems));
                resolve(mockLearnItems.eng.splice(0, numberOfLearnItems));
            }, delay);
        });
    }

    static saveLearnItem(learnItem){
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                    let toReturn = mockLearnItems.eng.push(learnItem);
                    learnItem.id = mockLearnItems.eng.length;
                    learnItem.translations = learnItem.translations.split(",");

                    resolve(learnItem);
                }, delay);
            });
    }

    static getLearnItemsForList(listId,pageNumber) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let toReturn = mockLearnItems.eng.slice(pageSize*pageNumber,pageSize*(pageNumber+1));

                resolve({totalCount: mockLearnItems.eng.length,learnItems:toReturn});
            }, delay);
        });
    }
}

export default LearnItemApi;