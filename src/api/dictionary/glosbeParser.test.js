/**
 * Created by krisztian on 2017. 04. 23..
 */

import expect from 'expect';
import glosbeParser from './glosbeParser';

describe('Send Object', () => {

    it('should return the translations from a glosbe response', () => {

    let toParse = {
        "result" : "ok",
        "tuc" : [ {
            "phrase" : {
                "text" : "kutya",
                "language" : "hu"
            },
            "meanings" : [ {
                "language" : "en",
                "text" : "animal"
            }, {
                "language" : "en",
                "text" : "A common four-legged animal, especially kept by people as a pet or to hunt or guard things."
            } ],
            "meaningId" : 6963456550501831009,
            "authors" : [ 69425 ]
        }, {
            "phrase" : {
                "text" : "eb",
                "language" : "hu"
            },
            "meanings" : [ {
                "language" : "en",
                "text" : "animal"
            }, {
                "language" : "en",
                "text" : "A common four-legged animal, especially kept by people as a pet or to hunt or guard things."
            } ],
            "meaningId" : 1742619173585432496,
            "authors" : [ 16 ]
        }, {
            "phrase" : {
                "text" : "üldöz",
                "language" : "hu"
            },
            "meaningId" : 1553395407189977887,
            "authors" : [ 25018 ]
        }, {
            "phrase" : {
                "text" : "esztergaszíj",
                "language" : "hu"
            },
            "meaningId" : -1373579816897128170,
            "authors" : [ 20 ]
        }, {
            "phrase" : {
                "text" : "esztergaszív",
                "language" : "hu"
            },
            "meaningId" : 3004066968163083114,
            "authors" : [ 20 ]
        }, {
            "phrase" : {
                "text" : "fickó",
                "language" : "hu"
            },
            "meaningId" : -2086766112774024377,
            "authors" : [ 89651 ]
        }, {
            "phrase" : {
                "text" : "hím",
                "language" : "hu"
            },
            "meaningId" : 927086126740599142,
            "authors" : [ 20 ]
        }, {
            "phrase" : {
                "text" : "jártató",
                "language" : "hu"
            },
            "meaningId" : -6608458844071167373,
            "authors" : [ 20 ]
        }, {
            "phrase" : {
                "text" : "kampó",
                "language" : "hu"
            },
            "meaningId" : 8840366629913872785,
            "authors" : [ 25018 ]
        }, {
            "phrase" : {
                "text" : "kanfarkas",
                "language" : "hu"
            },
            "meaningId" : -3141677760460645212,
            "authors" : [ 20 ]
        }, {
            "phrase" : {
                "text" : "kankutya",
                "language" : "hu"
            },
            "meaningId" : 5578606393721146100,
            "authors" : [ 89651 ]
        }, {
            "phrase" : {
                "text" : "láb",
                "language" : "hu"
            },
            "meaningId" : 3728696831182344745,
            "authors" : [ 89651 ]
        }, {
            "phrase" : {
                "text" : "nyargaló",
                "language" : "hu"
            },
            "meaningId" : -1805133540107584510,
            "authors" : [ 20 ]
        }, {
            "phrase" : {
                "text" : "padszolga",
                "language" : "hu"
            },
            "meaningId" : 8878325090671656255,
            "authors" : [ 20 ]
        }, {
            "phrase" : {
                "text" : "szorító",
                "language" : "hu"
            },
            "meaningId" : -4593212628540781427,
            "authors" : [ 86934 ]
        }, {
            "phrase" : {
                "text" : "tuskóbak",
                "language" : "hu"
            },
            "meaningId" : 7251898105466359424,
            "authors" : [ 20 ]
        }, {
            "phrase" : {
                "text" : "vaskapocs",
                "language" : "hu"
            },
            "meaningId" : 112269270153883176,
            "authors" : [ 20 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "(poker slang) Underdog"
            } ],
            "meaningId" : null,
            "authors" : [ 1 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "informal term for a man; &quot;you lucky dog&quot;"
            } ],
            "meaningId" : null,
            "authors" : [ 93369 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "(transitive) To pursue with the intent to catch."
            } ],
            "meaningId" : null,
            "authors" : [ 1 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "A man (derived from definition 2)."
            } ],
            "meaningId" : null,
            "authors" : [ 91945 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "To fasten a hatch securely."
            } ],
            "meaningId" : null,
            "authors" : [ 91945 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "to spy after someone"
            } ],
            "meaningId" : null,
            "authors" : [ 90 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "A metal support for logs in a fireplace."
            } ],
            "meaningId" : null,
            "authors" : [ 1 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "dull, unattractive girl or woman"
            } ],
            "meaningId" : null,
            "authors" : [ 1 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "(slang, almost always in the plural) feet."
            } ],
            "meaningId" : null,
            "authors" : [ 1 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "Someone who is morally reprehensible."
            } ],
            "meaningId" : null,
            "authors" : [ 91945 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "(transitive, nautical) To fasten a hatch securely."
            } ],
            "meaningId" : null,
            "authors" : [ 1 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "A dull, unattractive girl or woman."
            } ],
            "meaningId" : null,
            "authors" : [ 91945 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "Foot."
            } ],
            "meaningId" : null,
            "authors" : [ 91945 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "(slang) A coward"
            } ],
            "meaningId" : null,
            "authors" : [ 1 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "(Can we clean up <sup>(+)</sup> this sense?)&lt;/span&gt; A click or pallet adapted to engage the teeth of a ratchet-wheel, to restrain the back action; a click or pawl. (See also: ratchet, windlass)"
            } ],
            "meaningId" : null,
            "authors" : [ 91945 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "&quot;A click or pallet adapted to engage the teeth of a ratchet-wheel, to restrain the back action; a click or pawl.&quot; (See also: ratchet, windlass)"
            } ],
            "meaningId" : null,
            "authors" : [ 1 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "a hinged catch that fits into a notch of a ratchet to move a wheel forward or prevent it from moving backward"
            } ],
            "meaningId" : null,
            "authors" : [ 93369 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "(slang) A man."
            } ],
            "meaningId" : null,
            "authors" : [ 1 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "To intentionally restrict one&#39;s productivity as employee; to work at the slowest rate that goes unpunished."
            } ],
            "meaningId" : null,
            "authors" : [ 91945 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "someone who is morally reprehensible; &quot;you dirty dog&quot;"
            } ],
            "meaningId" : null,
            "authors" : [ 93369 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "(a) dog"
            } ],
            "meaningId" : null,
            "authors" : [ 82038 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "A coward."
            } ],
            "meaningId" : null,
            "authors" : [ 91945 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "To pursue with the intent to catch."
            } ],
            "meaningId" : null,
            "authors" : [ 91945 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "Any of various mechanical devices for holding, gripping, or fastening something, particularly with a tooth-like projection."
            } ],
            "meaningId" : null,
            "authors" : [ 1 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "(transitive) To follow in an annoying way, to constantly be affected by."
            } ],
            "meaningId" : null,
            "authors" : [ 1 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "An animal, member of the genus Canis (probably descended from the common wolf) that has been domesticated for thousands of years; occurs in many breeds. Scientific name: Canis lupus familiaris."
            } ],
            "meaningId" : null,
            "authors" : [ 1 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "A male dog, wolf or fox, as opposed to a bitch (often attributive)."
            } ],
            "meaningId" : null,
            "authors" : [ 91945 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "(transitive, emerging usage in UK) To watch, or participate, in sexual activity in a public place, on the pretence of <i>walking the dog</i> ; see also dogging."
            } ],
            "meaningId" : null,
            "authors" : [ 1 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "A sexually aggressive man (cf. <i>horny</i>)."
            } ],
            "meaningId" : null,
            "authors" : [ 91945 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "go after with the intent to catch; &quot;The policeman chased the mugger down the alley&quot;; &quot;the dog chased the rabbit&quot;"
            } ],
            "meaningId" : null,
            "authors" : [ 93369 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "A hot dog."
            } ],
            "meaningId" : null,
            "authors" : [ 1 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "A male dog, wolf or fox, as opposed to a bitch (a female dog, wolf or fox.)"
            } ],
            "meaningId" : null,
            "authors" : [ 1 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "(derogatory) A dull, unattractive girl or woman."
            } ],
            "meaningId" : null,
            "authors" : [ 1 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "a dull unattractive unpleasant girl or woman; &quot;she got a reputation as a frump&quot;; &quot;she&#39;s a real dog&quot;"
            } ],
            "meaningId" : null,
            "authors" : [ 93369 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "morally reprehensible person, <i>See also scoundrel</i>"
            } ],
            "meaningId" : null,
            "authors" : [ 1 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "(humorous) Not god"
            } ],
            "meaningId" : null,
            "authors" : [ 1 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "Underdog."
            } ],
            "meaningId" : null,
            "authors" : [ 91945 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "(intransitive, with <i>up</i> ) To position oneself on all fours, after the manner of a dog - probably related to doggy style."
            } ],
            "meaningId" : null,
            "authors" : [ 1 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "A mammal, <i>Canis lupus familiaris</i>, that has been domesticated for thousands of years, of highly variable appearance due to human breeding."
            } ],
            "meaningId" : null,
            "authors" : [ 91945 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "a member of the genus Canis (probably descended from the common wolf) that has been domesticated by man since prehistoric times; occurs in many breeds; &quot;the dog barked all night&quot;"
            } ],
            "meaningId" : null,
            "authors" : [ 93369 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "a smooth-textured sausage of minced beef or pork usually smoked; often served on a bread roll"
            } ],
            "meaningId" : null,
            "authors" : [ 93369 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "male dog"
            } ],
            "meaningId" : null,
            "authors" : [ 1 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "(intransitive, transitive) To intentionally restrict one&#39;s productivity as employee; to work at the slowest rate that goes unpunished."
            } ],
            "meaningId" : null,
            "authors" : [ 1 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "metal supports for logs in a fireplace; &quot;the andirons were too hot to touch&quot;"
            } ],
            "meaningId" : null,
            "authors" : [ 93369 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "(derogatory) Someone who is morally reprehensible."
            } ],
            "meaningId" : null,
            "authors" : [ 1 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "To follow in an annoying way."
            } ],
            "meaningId" : null,
            "authors" : [ 91945 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "To watch, or participate, in sexual activity in a public place."
            } ],
            "meaningId" : null,
            "authors" : [ 91945 ]
        }, {
            "meanings" : [ {
                "language" : "en",
                "text" : "An iron for holding wood in a fireplace."
            } ],
            "meaningId" : null,
            "authors" : [ 35 ]
        } ],
        "phrase" : "dog",
        "from" : "en",
        "dest" : "hu",
        "authors" : {
            "69425" : {
                "U" : "",
                "id" : 69425,
                "N" : "plwiktionary.org",
                "url" : "https://glosbe.com/source/69425"
            },
            "16" : {
                "U" : "http://nl.wiktionary.org",
                "id" : 16,
                "N" : "nl.wiktionary.org",
                "url" : "https://glosbe.com/source/16"
            },
            "1" : {
                "U" : "http://en.wiktionary.org",
                "id" : 1,
                "N" : "en.wiktionary.org",
                "url" : "https://glosbe.com/source/1"
            },
            "89651" : {
                "U" : "",
                "id" : 89651,
                "N" : "GlosbeWordalignmentRnD",
                "url" : "https://glosbe.com/source/89651"
            },
            "35" : {
                "U" : "http://omegawiki.org",
                "id" : 35,
                "N" : "omegawiki.org",
                "url" : "https://glosbe.com/source/35"
            },
            "20" : {
                "U" : "http://www.slowniki.org.pl/",
                "id" : 20,
                "N" : "Jerzy Kazojc",
                "url" : "https://glosbe.com/source/20"
            },
            "86934" : {
                "U" : "",
                "id" : 86934,
                "N" : "Glosbe Research",
                "url" : "https://glosbe.com/source/86934"
            },
            "82038" : {
                "U" : "",
                "id" : 82038,
                "N" : "Mendocino Middle School Boontling Dictionary",
                "url" : "https://glosbe.com/source/82038"
            },
            "93369" : {
                "U" : "http://plwordnet.pwr.wroc.pl/wordnet/",
                "id" : 93369,
                "N" : "plwordnet-defs",
                "url" : "https://glosbe.com/source/93369"
            },
            "91945" : {
                "U" : "https://en.wiktionary.org",
                "id" : 91945,
                "N" : "en.wiktionary.2016",
                "url" : "https://glosbe.com/source/91945"
            },
            "25018" : {
                "U" : "http://glosbe.com",
                "id" : 25018,
                "N" : "GlosbeResearch",
                "url" : "https://glosbe.com/source/25018"
            },
            "90" : {
                "U" : "",
                "id" : 90,
                "N" : "Administratorus",
                "url" : "https://glosbe.com/source/90"
            }
        }
    };

        let result = glosbeParser(toParse);
        expect(result.length).toEqual(17);

     });

});