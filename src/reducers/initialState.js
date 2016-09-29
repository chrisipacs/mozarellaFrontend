export default {
  courses: [],
  ajaxCallsInProgress: 0,
  listsContext: {lists:[],
                  browseLists: false,
                  listUnderEdit: {
                    name: '',
                    isPublic: true,
                    fromLanguage: '',
                    toLanguage: '',
                    description: '',
                    learnItemContext: {
                      numberOfLearnItems: 0,
                      pageSize: 10,
                      learnItems: []
                    }}
  }
};
