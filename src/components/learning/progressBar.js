/**
 * Created by krisztian on 2016. 11. 14..
 */
import React from 'react';

const progressBar = ({totalTime,usedUpTime}) => {


    return (<div className="progress">
        <div className="progress-bar progress-bar-info" role="progressbar" aria-valuenow={Math.ceil((totalTime-usedUpTime)/totalTime*100)} aria-valuemin="0" aria-valuemax="100">
            <span className="sr-only">{Math.ceil((totalTime-usedUpTime)/totalTime*100)}% complete</span>
        </div>
    </div>);
};

//style="width: 20%"

export default progressBar;