/**
 * Created by krisztian on 2017. 03. 05..
 */

import requestObjects from './RequestObjects';
import sendObject from './SendObject';

class StudentApi {
    static signUpStudentToList(student,list) {
        return new Promise((resolve, reject) => {
            sendObject('/api/students/'+student.id+'/learnitemlists','POST',list)
                .then(function(result){
                    resolve(list);
                }).catch(function(error) {
                    reject(error);
                });
        });
    }

    static deregisterStudentFromList(student,list) {
        return new Promise((resolve, reject) => {
            sendObject('/api/students/'+student.id+'/learnitemlists/'+list.id,'DELETE')
                .then(function(result){
                    resolve(list);
                }).catch(function(error) {
                    reject(error);
                });
        });
    }
}

export default StudentApi;