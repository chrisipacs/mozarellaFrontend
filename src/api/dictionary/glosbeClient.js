/**
 * Created by krisztian on 2017. 04. 23..
 */

import requestObjects from './RequestObjectsJsonp';
import glosbeParser from './glosbeParser';

let uri = "https://glosbe.com/gapi/translate?from={toLanguage}&dest={fromLanguage}&format=json&phrase={toTranslate}&pretty=true";

let getTranslation = (fromLanguage,toLanguage,toTranslate) => {
    let correctUri = uri.replace('\{fromLanguage\}',fromLanguage).replace('\{toLanguage\}',toLanguage).replace('\{toTranslate\}',toTranslate);

    return new Promise((resolve, reject) => {
        requestObjects(correctUri).then((translations)=>{
            resolve(glosbeParser(translations.objects));
        }).catch((err)=>{
            reject(err);
        });

    });

};

export default getTranslation;