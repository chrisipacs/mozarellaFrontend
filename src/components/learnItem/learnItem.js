/**
 * Created by krisztian on 28/09/16.
 */
import React, { Component } from 'react';
import TextInput from '../reusable/TextInput';
import ContentEditable from '../../../node_modules/react-contenteditable';
import '../../../public/custom.css';

const LearnItem = ({value, isNew, isDeletable, deleteFunction, error}) => {

    const translationListToString = (list) => {
        return list.reduce((pre,cur)=>{return pre+','+cur;});
    };

    const stringToTranslationList = (list) => {
        return '';
    };

    return (<div className="panel panel-info">
                <div className="panel-heading">
                    <div className="wrap"><div><h3 className="panel-title">{value.text}</h3></div>
                    <div>{isDeletable && <img src={require('../../../public/delete.png')} onClick={()=>deleteFunction(value.id)} alt="delete learnItem" height="15" width="15" className="img-responsive"/>}</div></div>


                </div>
                <div className="panel-body">
                    {isNew ? <TextInput name="text" html={value.text}/>: <ContentEditable html={value.text} disabled={true} onChange={()=>{}} />}
                    Acceptable solutions: {isNew ? <TextInput name="translations" html={translationListToString(value.translations)}/> : <ContentEditable html={translationListToString(value.translations)}/>}
                </div>
            </div>);
};

export default LearnItem;