export default {
    courses: [],
    ajaxCallsInProgress: 0,
    student: {
        listsContext: { //the lists the student is associated with
            totalCount: 0,
            pageSize: 10,
            activePage:0
        }
    },
    listsContext: { //ALL lists that are shown to the user when looking for courses to subscribe to
        lists:[],
        browseLists: false,
        totalCount: 0,
        activeList: {
            name: '',
            isPublic: true,
            fromLanguage: '',
            toLanguage: '',
            description: '',
            learnItems: { //for editing/deleting learnItems
                totalCount: 0,
                pageSize: 10,
                activePage:0,
                pages: {} //cache for learnItemList pages
            }
        }
    },
    learnContext: { //the upcoming learnItems
        learnItems: []
    }
};
