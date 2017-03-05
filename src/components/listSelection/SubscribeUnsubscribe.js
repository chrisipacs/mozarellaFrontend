/**
 * Created by krisztian on 2017. 03. 05..
 */

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

const SubscribeUnsubscribe = ({isSubscribed,onSubscribeUnsubscribe,rowIndex}) => {

    return (
        <div>
            {isSubscribed(rowIndex) && <input
                type='submit'
                disabled={false}
                value='Unsubscribe'
                className='btn btn-warning'
                onClick={()=>{onSubscribeUnsubscribe(false)}}/>}

            {!isSubscribed(rowIndex) && <input
                type='submit'
                disabled={false}
                value='Subscribe'
                className='btn btn-success'
                onClick={()=>{onSubscribeUnsubscribe(true)}}/>}
        </div>
    );
};

export default SubscribeUnsubscribe;


