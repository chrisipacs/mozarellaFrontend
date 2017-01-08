export default {
    courses: [],
    ajaxCallsInProgress: 0,
    student: {},
    listsContext: {
        lists:[],
        browseLists: false,
        totalCount: 0,
        listUnderEdit: { //TODO rename to loadedList or something
            name: '',
            isPublic: true,
            fromLanguage: '',
            toLanguage: '',
            description: '',
            totalCount: 0,
            learnItemContext: {
                pageSize: 10,
                learnItems: []
            },
            learnItems: []
        }
    }
};
