/**
 * Created by krisztian on 2016. 10. 09..
 */
//for showing a number of learn items, and a new one at the end of the list

import React, { Component } from "react";
import LearnItem from './learnItem';

    const LearnItemTableView = ({learnItems,deleteFunction}) => {
        return (
            <div>{learnItems.map((learnItem)=>{return (<LearnItem  value={learnItem} isNew={false} key={learnItem.id} deleteFunction={deleteFunction} />)})}</div>
        );
    };

//this.state.learnItems.map(({learnItem})=>{<LearnItem value={learnItem.text} isNew={true}/>})

export default LearnItemTableView;