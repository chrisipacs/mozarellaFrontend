/**
 * Created by krisztian on 2017. 05. 09..
 */
import React from 'react';

//TODO: show all translations

const learnItemQuestion = ({learnItem, showSolution}) => {
    return (
    <div>
        <h1>{learnItem.text}</h1>
        {!learnItem.alreadyPracticed &&
            <div className="alert alert-success" role="alert">
                {learnItem.translations[0]}
            </div>
        }
        {showSolution &&
        <div className="alert alert-danger" role="alert">
                {learnItem.translations[0]}
        </div>}
    </div>);
};

export default learnItemQuestion;