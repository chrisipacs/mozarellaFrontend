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

        this.totalTimeInit = 20;

        let that = this;

        this.state = {
            totalTime : that.totalTimeInit,
            usedUpTime: 0
        };

        let pathElements = this.props.location.pathname.split('/');
        let listId = pathElements[pathElements.length-1];
        let frequency = 100;

        this.getNextLearnItem = this.getNextLearnItem.bind(this);
        this.countdown = this.countdown.bind(this);
        this.checkSolution = this.checkSolution.bind(this);
        this.startTimer = this.startTimer.bind(this);
    }

    startTimer(){
        let that = this;

        if(this.timer){
            clearTimeout(this.timer);
        }

        this.timer = setTimeout(function () {
            that.setState((previousState) => update(previousState, {
                usedUpTime: {$set: that.state.usedUpTime + 0.01}
            }), that.countdown);
        }, 10);
    }

    countdown(){
        if(this.state.usedUpTime>this.state.totalTime) {
            this.getNextLearnItem();
        } else {
            this.startTimer();
        }
    }

    resetCountDown(){
        let that = this;

        this.setState((previousState) => update(previousState, {
            totalTime : {$set: that.totalTimeInit},
            usedUpTime: {$set:0}
        }),that.countdown);
    }

    getNextLearnItem(){
        if(this.state.upcomingLearnItems && this.state.upcomingLearnItems.length>0){
            this.setState((previousState) => update(previousState, {
                currentLearnItem: {$set: this.state.upcomingLearnItems[0]},
                upcomingLearnItems: {$set: this.state.upcomingLearnItems.splice(1)}
            }),this.resetCountDown);
        } else {
            //the event triggered by this will call getNextLearnItem again
            this.props.learnItemActions.loadLearnItemsToLearn(this.listId);
        }
    }

    checkSolution(event){
        if(event.target.value==this.state.currentLearnItem.translations[0]){ //TODO: figure out the condition
            console.log('checksolution'+event.target.value);
        }
    }

    componentWillMount(){
        this.getNextLearnItem();
    }

    componentWillUnmount(){
        if(this.timer){
            clearTimeout(this.timer);
        }
    }

    setResult(){

    }

    componentWillUpdate(){

    }

    componentWillReceiveProps(nextProps){
        let that = this;
        if(nextProps.learnItems){
            this.setState((previousState) => update(previousState, {
                upcomingLearnItems: {$set: nextProps.learnItems}
            }),that.getNextLearnItem);
        }
    }

    render() {
        const that = this;
        return (
        <div>
            {this.state.currentLearnItem &&
                <div>
                    <h1>{this.state.currentLearnItem.text}</h1>
                    <TextInput onChange={this.checkSolution}/>
                    <ProgressBar totalTime={this.state.totalTime} usedUpTime={this.state.usedUpTime}/>
                </div>}
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