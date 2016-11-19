/**
 * Created by krisztian on 2016. 11. 13..
 */
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

let learnItems = {
    eng: [

        {   id:1,
            text:'cat',
            translations:['macska'],
            pointValue: 100
        },{ id:2,text:'dog',
            translations:['kutya','eb'],
            pointValue: 100
        },{   id:3,
            text:'cat',
            translations:['macska'],
            pointValue: 100
        },{ id:4,text:'dog',
            translations:['kutya','eb'],
            pointValue: 100
        },{   id:5,
            text:'cat',
            translations:['macska'],
            pointValue: 100
        },{ id:6,text:'dog',
            translations:['kutya','eb'],
            pointValue: 100
        },{   id:7,
            text:'cat',
            translations:['macska'],
            pointValue: 100
        },{ id:8,text:'dog',
            translations:['kutya','eb'],
            pointValue: 100
        },{   id:9,
            text:'cat',
            translations:['macska'],
            pointValue: 100
        },{ id:10,text:'dog',
            translations:['kutya','eb'],
            pointValue: 100
        },{   id:11,
            text:'cat',
            translations:['macska'],
            pointValue: 100
        },{ id:12,text:'dog',
            translations:['kutya','eb'],
            pointValue: 100
        },{   id:13,
            text:'cat',
            translations:['macska'],
            pointValue: 100
        },{ id:14,text:'dog',
            translations:['kutya','eb'],
            pointValue: 100
        },{   id:15,
            text:'cat',
            translations:['macska'],
            pointValue: 100
        },{ id:16,text:'dog',
            translations:['kutya','eb'],
            pointValue: 100
        },{   id:17,
            text:'cat',
            translations:['macska'],
            pointValue: 100
        },{ id:18,text:'dragon',
            translations:['sarkany'],
            pointValue: 100
        },{   id:19,
            text:'cat',
            translations:['macska'],
            pointValue: 100
        },{ id:20,text:'dog',
            translations:['kutya','eb'],
            pointValue: 100
        },{   id:21,
            text:'cat',
            translations:['macska'],
            pointValue: 100
        },{ id:22,text:'dog',
            translations:['kutya','eb'],
            pointValue: 100
        },{   id:23,
            text:'cat',
            translations:['macska'],
            pointValue: 100
        },{ id:24,text:'dog',
            translations:['kutya','eb'],
            pointValue: 100
        }
    ],
    ger: [
        {id:1,
            text:'Katze',
            translations:['macska'],
            pointValue: 100}
    ]
};

export default learnItems;