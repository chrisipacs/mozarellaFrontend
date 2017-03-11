/**
 * Created by krisztian on 2017. 03. 05..
 */

import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';

const SubscribeUnsubscribe = ({isSubscribed,onSubscribe, onUnsubscribe, rowIndex,list}) => {

    return (
        <div>
            {isSubscribed(list.id) && <input
                type='submit'
                disabled={false}
                value='Unsubscribe'
                className='btn btn-warning'
                onClick={()=>{onUnsubscribe(list)}}/>}

            {!isSubscribed(list.id) && <input
                type='submit'
                disabled={false}
                value='Subscribe'
                className='btn btn-success'
                onClick={()=>{onSubscribe(list)}}/>}
        </div>
    );
};

export default SubscribeUnsubscribe;


