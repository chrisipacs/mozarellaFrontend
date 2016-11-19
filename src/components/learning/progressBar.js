/**
 * Created by krisztian on 2016. 11. 14..
 */
import React from 'react';

const progressBar = ({totalTime,usedUpTime}) => {

    let percent = Math.ceil((totalTime-usedUpTime)/totalTime*100);

    return (<div className="progress">
        <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow={totalTime-usedUpTime} aria-valuemin="0" aria-valuemax="100" style={{width: percent+"%"}}>
            <span className="sr-only">{percent}% complete</span>
            {Math.ceil(totalTime-usedUpTime)}
        </div>
    </div>);
};

//style="width: 20%"

export default progressBar;