/**
 * Created by krisztian on 10/09/16.
 */
import React from 'react';
import * as LearnItemActions from '../../actions/learnItemActions';
import ProgressBar from './progressBar';
import update from '../../../node_modules/react-addons-update';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as listActions from '../../actions/listActions';
import TextInput from '../reusable/TextInput';

class LearningPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            totalTime : 60,
            usedUpTime: 0
        };

        let pathElements = this.props.location.pathname.split('/');
        let listId = pathElements[pathElements.length-1];

        this.getNextLearnItem = this.getNextLearnItem.bind(this);
        this.getNextLearnItem();
    }

    getNextLearnItem(){
        if(this.state.upcomingLearnItems && this.state.upcomingLearnItems.length>0){
            this.setState((previousState) => update(previousState, {
                currentLearnItem: {$set: this.state.upcomingLearnItems[0]},
                upcomingLearnItems: {$set: this.state.upcomingLearnItems.splice(1,this.state.upcomingLearnItems.length-1)}
            }));
        } else {
            this.props.learnItemActions.loadLearnItemsToLearn(this.listId);
        }
    }

    componentWillMount(){

    }

    componentWillUpdate(){

    }

    componentWillReceiveProps(nextProps){
        //TODO: new learnitems into the state
        if(nextProps.learnItems){
            this.setState((previousState) => update(previousState, {
                upcomingLearnItems: {$set: nextProps.learnItems}
            }),function(){
                this.getNextLearnItem();
            });
        }
    }

    render() {
        const that = this;
        return (
        <div>
            {
                this.state.currentLearnItem &&
                <div>
                    <h1>{this.state.currentLearnItem.text}</h1>
                    <TextInput/>
                    <ProgressBar totalTime={this.state.totalTime} usedUpTime={this.state.usedUpTime}/>
                </div>
            }
        </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        learnItems: state.learnItems,
        list: state.listUnderEdit
    };
}

function mapDispatchToProps(dispatch) {
    return {
        learnItemActions: bindActionCreators(LearnItemActions, dispatch),
        listActions: bindActionCreators(listActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LearningPage);