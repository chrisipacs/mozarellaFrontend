/**
 * Created by krisztian on 17/09/16.
 */
import delay from './delay';

const lists = [
    {
        name: 'German words',
        isPublic: true,
        fromLanguage: 'ENG',
        toLanguage: 'GER',
        description: 'The 1000 most common english words'
    },
    {
        name: 'Angol szavak',
        isPublic: true,
        fromLanguage: 'HUN',
        toLanguage: 'ENG',
        description: 'otszaz angol szo'
    },
    {
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
                console.log('api called');
                resolve(Object.assign([], lists));
            }, delay);
        });
    }
};

export default ListApi;