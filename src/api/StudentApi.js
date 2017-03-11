/**
 * Created by krisztian on 2017. 03. 05..
 */

import requestObjects from './RequestObjects';
import sendObject from './SendObject';

class StudentApi {

    static getLearnItemsToLearn(studentId, listId, numberOfLearnItems=10){
        return new Promise((resolve, reject) => {
            //TODO: introduce studentId to the path
            requestObjects('/api/students/'+studentId+'/learnitemlists/'+listId+'/learnitems?count='+numberOfLearnItems,'GET')
                .then(function(result){
                    resolve(result.objects);
                }).catch(function(error) {
                    reject(error);
                });
        });
    }

    static signUpStudentToList(student,list) {
        return new Promise((resolve, reject) => {
            sendObject('/api/students/'+student.id+'/learnitemlists','POST',list)
                .then(function(result){
                    console.log('SendObject callback signup');
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
                    console.log('SendObject callback deregister');
                    resolve(list);
                }).catch(function(error) {
                    reject(error);
                });
        });
    }

    static sendNewResult(student,learnitem,listId,result) { //TODO test
        console.log('STUDENT: '+JSON.stringify(student));
        return new Promise((resolve, reject) => {
            sendObject('/api/students/'+student.id+'/learnitemlists/'+listId+'/results','POST',result)
                .then(function(){
                    resolve();
                }).catch(function(error) {
                    reject(error);
                });
        });
    }

}

export default StudentApi;