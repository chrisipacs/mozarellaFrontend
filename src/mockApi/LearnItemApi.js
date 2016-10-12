/**
 * Created by krisztian on 24/09/16.
 */
import delay from './delay';

//protected String idDescriptor;
//protected String text;
//protected String translations;
//protected Double priority;
//protected Integer strength;

//@RequestMapping(value="/api/learnitemlists/{id}/learnitems", method=RequestMethod.GET, produces=MediaType.APPLICATION_JSON_UTF8_VALUE)
//public ResponseEntity<List<LearnItem>> getItems(@PathVariable("id") Integer id, @RequestParam("pagenumber") Integer pageNumber, @RequestParam("pagesize") Integer pageSize)

//protected String idDescriptor;
//protected String text;
//protected String translations;
//protected Double priority;
//protected Integer strength;

    //this mock api doesn' simulate the real behavior of the api, it just gives back a few dummy learnitems to show on the page
let mockLearnItems = {
    eng: [
{   text:'cat',
    translations:['macska']
},{ text:'dog',
    translations:['kutya']
}
],
ger: [
    {text:'Katze',
        translations:['macska']}
]
};


class LearnItemApi {
    static getLearnItemsForList(listId,pageNumber) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(Object.assign({}, mockLearnItems.eng));
            }, delay);
        });
    }
}

export default LearnItemApi;