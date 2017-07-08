/**
 * Created by krisztian on 2017. 05. 09..
 */
import React from 'react';

//TODO: show all translations

const learnItemQuestion = ({learnItem, showSolution}) => {
    return (
    <div>
        <h1>{learnItem.translations[0]}</h1>
        {!learnItem.alreadyPracticed &&
            <div className="alert alert-success" role="alert">
                {learnItem.text}
            </div>
        }
        {showSolution &&
        <div className="alert alert-danger" role="alert">
                {learnItem.text}
        </div>}
    </div>);
};

export default learnItemQuestion;