/**
 * Created by krisztian on 2017. 04. 23..
 */

let parser =function(object){
            var meanings = new Array();

            object.tuc.forEach(function(data, a){
                if(data.phrase != undefined){
                    meanings.push(data.phrase.text);}
            });

            return meanings;
};

export default parser;