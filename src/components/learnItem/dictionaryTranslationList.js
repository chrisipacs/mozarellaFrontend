/**
 * Created by krisztian on 2017. 04. 23..
 */

import React, { Component } from 'react';
import TextInput from '../reusable/TextInput';
import ContentEditable from '../../../node_modules/react-contenteditable';
import update from '../../../node_modules/react-addons-update';

const TranslationList = ({translations, onClick}) => {

    let formattedTranslations = [];
    let numberOfTranslationsToShow = 5;

    if(translations != undefined) {
        formattedTranslations = translations.map((translation, idx)=> {
            return (<span className="label label-info" onClick={()=>onClick(translation)} key={idx}>{translation} </span>)
        }).slice(0, numberOfTranslationsToShow);
    }

    return (translations!=undefined && translations.length > 0 &&
    <div>
        Recommendations (click to add) <br/>
        {formattedTranslations}
        <br/>
    </div>);
};

export default TranslationList;