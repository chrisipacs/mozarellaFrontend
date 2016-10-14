/**
 * Created by krisztian on 24/09/16.
 */
import delay from './delay';
import pageSize from '../constants';

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

{   id:1,
    text:'cat',
    translations:['macska']
},{ id:2,text:'dog',
    translations:['kutya','eb']
},{   id:3,
            text:'cat',
            translations:['macska']
        },{ id:4,text:'dog',
            translations:['kutya','eb']
        },{   id:5,
            text:'cat',
            translations:['macska']
        },{ id:6,text:'dog',
            translations:['kutya','eb']
        },{   id:7,
            text:'cat',
            translations:['macska']
        },{ id:8,text:'dog',
            translations:['kutya','eb']
        },{   id:9,
            text:'cat',
            translations:['macska']
        },{ id:10,text:'dog',
            translations:['kutya','eb']
        },{   id:11,
            text:'cat',
            translations:['macska']
        },{ id:12,text:'dog',
            translations:['kutya','eb']
        },{   id:13,
            text:'cat',
            translations:['macska']
        },{ id:14,text:'dog',
            translations:['kutya','eb']
        },{   id:15,
            text:'cat',
            translations:['macska']
        },{ id:16,text:'dog',
            translations:['kutya','eb']
        },{   id:17,
            text:'cat',
            translations:['macska']
        },{ id:18,text:'dragon',
            translations:['sarkany']
        },{   id:19,
            text:'cat',
            translations:['macska']
        },{ id:20,text:'dog',
            translations:['kutya','eb']
        },{   id:21,
            text:'cat',
            translations:['macska']
        },{ id:22,text:'dog',
            translations:['kutya','eb']
        },{   id:23,
            text:'cat',
            translations:['macska']
        },{ id:24,text:'dog',
            translations:['kutya','eb']
        }
],
ger: [
    {id:1,
        text:'Katze',
        translations:['macska']}
]
};


class LearnItemApi {
    static getLearnItemsForList(listId,pageNumber) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                let toReturn = mockLearnItems.eng.slice(pageSize*pageNumber,pageSize*(pageNumber+1));

                resolve({totalCount: mockLearnItems.eng.length,learnItems:toReturn});
            }, delay);
        });
    }
}

export default LearnItemApi;