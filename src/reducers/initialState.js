export default {
  courses: [],
  ajaxCallsInProgress: 0,
  student: {},
  listsContext: {lists:[],
                  browseLists: false,
                  listUnderEdit: {
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
