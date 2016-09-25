/**
 * Created by krisztian on 17/09/16.
 */
import delay from './delay';

const lists = [
    {
        id: 1,
        name: 'German words',
        isPublic: true,
        fromLanguage: 'ENG',
        toLanguage: 'GER',
        description: 'The 1000 most common english words'
    },
    {
        id: 2,
        name: 'Angol szavak',
        isPublic: true,
        fromLanguage: 'HUN',
        toLanguage: 'ENG',
        description: 'otszaz angol szo'
    },
    {
        id: 3,
        name: 'French words',
        isPublic: true,
        fromLanguage: 'ENG',
        toLanguage: 'FRA',
        description: 'blablabla'
    }
];

class ListApi {
    static getAllLists() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign([], lists));
            }, delay);
        });
    }

    static addList(list) {
        console.log('addList called');
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                lists.push(list);
                list.id=lists.length+1;
                resolve(Object.assign({},list));
            }, delay);
        });
    }
}

export default ListApi;