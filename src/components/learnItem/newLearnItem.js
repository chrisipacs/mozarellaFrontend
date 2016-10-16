import React, {PropTypes}  from 'react';
import TextInput from '../reusable/TextInput';
import * as learnItemActions from '../../actions/learnItemActions';
import {connect} from 'react-redux';
import update from '../../../node_modules/react-addons-update';
import {bindActionCreators} from 'redux';
import * as listActions from '../../actions/learnItemActions';

class NewLearnItem extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            learnItem: {text: ' ', translations: ''}
        };

        this.modifyText = this.modifyText.bind(this);
        this.modifyTranslations = this.modifyTranslations.bind(this);
    }

    modifyText(event){
        event.persist();
        this.setState((previousState) => update(previousState, {
            learnItem: {text: {$set: event.target.value}}
        }));
    }

    modifyTranslations(event){
        event.persist();
        this.setState((previousState) => update(previousState, {
            learnItem: {translations: {$set: event.target.value}}
        }));
    }

    render(){
        return (
            <div className="panel panel-success">
                <div className="panel-heading">
                    <h3 className="panel-title">{this.state.learnItem.text}</h3>
                </div>
                <div className="panel-body">
                    Learnitem
                    <TextInput name='text' value={this.state.learnItem.text} onChange={this.modifyText}/>
                    Learnitem translations separated by comma
                    <TextInput name='translations' value={this.state.learnItem.translations} onChange={this.modifyTranslations}/>
                </div>
                <div><button type="button" className="btn btn-success">Save</button></div>
            </div>
        );
    }

}

function mapStateToProps(state, ownProps) {
    return {

    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(listActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewLearnItem);