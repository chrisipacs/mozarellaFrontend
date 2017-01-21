export default {
    courses: [],
    ajaxCallsInProgress: 0,
    student: {},
    listsContext: {
        lists:[],
        browseLists: false,
        totalCount: 0,
        activeList: {
            name: '',
            isPublic: true,
            fromLanguage: '',
            toLanguage: '',
            description: '',
            learnItems: {
                totalCount: 0,
                pageSize: 10,
                activePage:0,
                pages: {}
            }
        }
    },
    learnContext: {
        learnItems: []
    }
};
