import React, {PropTypes}  from 'react';
import TextInput from '../reusable/TextInput';
import {connect} from 'react-redux';
import update from '../../../node_modules/react-addons-update';
import {bindActionCreators} from 'redux';
import * as listActions from '../../actions/listActions';
import * as learnItemActions from '../../actions/learnItemActions';
import DictionaryTranslationList from './dictionaryTranslationList';
import GlosbeClient from '../../api/dictionary/glosbeClient';

class NewLearnItem extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            learnItem: {text: '', translations: [], translationsFromDictionary: []}
        };

        this.modifyText = this.modifyText.bind(this);
        this.modifyTranslations = this.modifyTranslations.bind(this);
        this.reset = this.reset.bind(this);
        this.getTranslationsFromDictionary = this.getTranslationsFromDictionary.bind(this);
        this.onDictionaryTranslationSelection = this.onDictionaryTranslationSelection.bind(this);
    }

    getTranslationsFromDictionary(expression){ //TODO maybe not the most accurate name
        // in the example above, assign the result
        if(this.timeoutHandle!=undefined){
            // in your click function, call clearTimeout
            window.clearTimeout(this.timeoutHandle);
        }

        // then call setTimeout again to reset the timer
        this.timeoutHandle = window.setTimeout(()=>{
            GlosbeClient(this.props.fromLanguage,this.props.toLanguage,expression).then((translations)=>{
                this.setState((previousState) => update(previousState, {
                    translationsFromDictionary: {$set: [...translations]}
                }));
            });
        },1000);

    }

    modifyText(event){
        event.persist();
        this.setState((previousState) => update(previousState, {
            learnItem: {text: {$set: event.target.value}}
        }));

        this.getTranslationsFromDictionary(event.target.value);
    }

    modifyTranslations(event){
        event.persist();
        this.setState((previousState) => update(previousState, {
            learnItem: {translations: {$set: event.target.value.split(",")}}
        }));
    }

    reset(){
        this.setState((previousState) => update(previousState, {
            learnItem: {text: {$set: ''}, translations: {$set: ''}}
        }));
    }

    onDictionaryTranslationSelection(e){
        this.setState((previousState) => update(previousState,
            {learnItem: {translations: {$set: [...(this.state.learnItem.translations),e]}}
            }));
    }

    render(){
        return (
            <div>
                <br/><br/>
                <div className="panel panel-success">
                    <div className="panel-heading">
                        <h3 className="panel-title">{this.state.learnItem.text}</h3>
                    </div>
                    <div className="panel-body">
                        Learnitem
                        <TextInput name='text' value={this.state.learnItem.text} onChange={this.modifyText}/>
                        <DictionaryTranslationList translations={this.state.translationsFromDictionary} onClick={this.onDictionaryTranslationSelection} />
                        Translations (separated by comma)
                        <TextInput name='translations' value={this.state.learnItem.translations} onChange={this.modifyTranslations}/>
                        <br/>
                        <div style={{float: 'right'}}><button type="button" className="btn btn-success" onClick={()=>{this.props.actions.saveLearnItem(this.state.learnItem, this.props.listId); this.reset()}}>Add</button></div>
                    </div>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state, ownProps) {
    return {
        listId: state.listsContext.activeList.id,
        fromLanguage: state.listsContext.activeList.fromLanguageCode,
        toLanguage: state.listsContext.activeList.toLanguageCode
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(learnItemActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewLearnItem);