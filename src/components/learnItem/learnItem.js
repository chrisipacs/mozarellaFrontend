/**
 * Created by krisztian on 28/09/16.
 */
import React, { Component } from 'react';
import TextInput from '../reusable/TextInput';
import ContentEditable from '../../../node_modules/react-contenteditable';

const LearnItem = ({value, isNew, error}) => {

    const translationListToString = (list) => {
        return '';
    };

    const stringToTranslationList = (list) => {
        return '';
    };

    return (<div><h4>learnitem</h4>
            {isNew ? <TextInput name="text" html={value.text}/>: <ContentEditable html={value.text}/>}
            {isNew ? <TextInput name="translations" html={translationListToString(value.translations)}/> : <ContentEditable html={translationListToString(value.translations)}/>}
            </div>);
};

export default LearnItem;