/**
 * Created by krisztian on 2016. 11. 19..
 */
import React from 'react';

const learningStatusInfo = ({pointsCollected,remainingLearnItemsToReview}) => {

    return (<div className="alert alert-info" role="alert">
            Collected points: {pointsCollected}
            </div>);
};

export default learningStatusInfo;