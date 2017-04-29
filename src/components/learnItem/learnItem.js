/**
 * Created by krisztian on 28/09/16.
 */
import React, { Component } from 'react';
import TextInput from '../reusable/TextInput';
import ContentEditable from '../../../node_modules/react-contenteditable';
//import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const LearnItem = ({value, isNew, error}) => {

    const translationListToString = (list) => {
        return list.reduce((pre,cur)=>{return pre+','+cur;});
    };

    const stringToTranslationList = (list) => {
        return '';
    };

    return (<div className="panel panel-info">
                <div className="panel-heading">
                    <h3 className="panel-title">{value.text}</h3>
                    <div><img src={'https://img.clipartfest.com/c99d33d4d2a55ee730a9c03a55afa5f0_red-x-painting-illustration-clipart-showing-red-x_508-339.jpeg'} alt="boohoo" className="img-responsive"/><span>Hello {this.props.name}</span></div>
                </div>
                <div className="panel-body">
                    {isNew ? <TextInput name="text" html={value.text}/>: <ContentEditable html={value.text} disabled={true} onChange={()=>{}} />}
                    Acceptable solutions: {isNew ? <TextInput name="translations" html={translationListToString(value.translations)}/> : <ContentEditable html={translationListToString(value.translations)}/>}
                </div>
            </div>);
};

export default LearnItem;