/**
 * Created by krisztian on 28/09/16.
 */
import React, { Component } from 'react';
import TextInput from '../reusable/TextInput';
import ContentEditable from '../../../node_modules/react-contenteditable';

const LearnItem = ({value, isNew, deleteFunction, error}) => {

    const translationListToString = (list) => {
        return list.reduce((pre,cur)=>{return pre+','+cur;});
    };

    const stringToTranslationList = (list) => {
        return '';
    };

    return (<div className="panel panel-info">
                <div className="panel-heading">
                    <h3 className="panel-title">{value.text}</h3>
                    <div><img src={require('../../../public/delete.png')} onClick={()=>deleteFunction(value.id)} alt="delete learnItem" className="img-responsive"/><span></span></div>
                </div>
                <div className="panel-body">
                    {isNew ? <TextInput name="text" html={value.text}/>: <ContentEditable html={value.text} disabled={true} onChange={()=>{}} />}
                    Acceptable solutions: {isNew ? <TextInput name="translations" html={translationListToString(value.translations)}/> : <ContentEditable html={translationListToString(value.translations)}/>}
                </div>
            </div>);
};

export default LearnItem;