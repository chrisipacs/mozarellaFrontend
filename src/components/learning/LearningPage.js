/**
 * Created by krisztian on 10/09/16.
 */
import React from 'react';
import * as learnItemActions from '../../actions/learnItemActions';
import * as learnActions from '../../actions/learnActions';
import ProgressBar from './progressBar';
import update from 'react-addons-update';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as listActions from '../../actions/listActions';
import * as studentActions from '../../actions/studentActions';
import TextInput from '../reusable/TextInput';
import LearningStatusInfo from './LearningStatusInfo';
import Sound from 'react-sound';
import StudentApi from '../../api/StudentApi';
import LearnItemQuestion from './LearnItemQuestion';

class LearningPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.totalTimeInit = 20;

        let that = this;

        this.state = {
            totalTime : that.totalTimeInit,
            usedUpTime: 0,
            points: 0,
            soundPlaying:Sound.status.STOPPED,
            typedSolution: '',
            showSolution: false
        };

        let pathElements = this.props.location.pathname.split('/');
        let listId = pathElements[pathElements.length-1];

        this.getNextLearnItem = this.getNextLearnItem.bind(this);
        this.countdown = this.countdown.bind(this);
        this.checkSolution = this.checkSolution.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.updateStateOnType = this.updateStateOnType.bind(this);
        this.updateStateOnKeyPress = this.updateStateOnKeyPress.bind(this);
        this.createResult = this.createResult.bind(this);
        this.itemReplacedAfterCorrectAnswer = this.itemReplacedAfterCorrectAnswer.bind(this);
        this.shouldLoadFirstLearnItem = this.shouldLoadFirstLearnItem.bind(this);
    }

    startTimer(){
        let that = this;

        if(this.timer){
            clearTimeout(this.timer);
        }

        if(!(this.state.currentLearnItem && this.state.currentLearnItem.alreadyPracticed)){
            return;
        }

        this.timer = setTimeout(function () {
            that.setState((previousState) => update(previousState, {
                usedUpTime: {$set: that.state.usedUpTime + 0.01}
            }), that.countdown);
        }, 10);
    }

    countdown(){
        if(this.state.usedUpTime>this.state.totalTime) {
            this.setState({showSolution:true});
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

    getNextLearnItem(calledRecursively=false){
        if(this.props.learnItems.length<5 && this.props.canLoadMore && !this.props.loadingInProgress) {

            let pathElements = this.props.location.pathname.split('/');
            let listId = pathElements[pathElements.length-1];

            this.props.studentActions.loadLearnItemsToLearn(this.props.student.id,listId);
        }

        this.props.studentActions.removeLearnableLearnItem(0);
    }

    updateStateOnType(event) {
        let solution = event.target.value;
        this.setState({typedSolution: solution},()=>{
            this.checkSolution(solution);
        });
    }

    updateStateOnKeyPress(event) {
        let key = event.key;

        if(key=='Enter'){
            this.checkSolution('', true);
        }
    }

    checkSolution(solution,forced=false){
        let pathElements = this.props.location.pathname.split('/');
        let listId = pathElements[pathElements.length-1];

        if(solution==this.state.currentLearnItem.text) {
            let playing = this.state.showSolution ? Sound.status.STOPPED : Sound.status.PLAYING;
            let pointValue = this.state.currentLearnItem.pointValue!=undefined ? this.state.currentLearnItem.pointValue: 100;
            let points = this.state.showSolution ? 0 : pointValue;

            this.props.learnActions.addSuccessfullyAnsweredLearnitemId(this.state.currentLearnItem.id);
            StudentApi.sendNewResult(this.props.student,this.state.currentLearnItem,listId,this.createResult(true));

            this.setState({
                points: this.state.points+=points,
                soundPlaying:playing,
                typedSolution: ''
            },function(){
                this.getNextLearnItem();
            });
        } else if(forced){
            StudentApi.sendNewResult(this.props.student,this.state.currentLearnItem,listId,this.createResult(false));
            this.setState({showSolution:true});
        }
    }

    componentWillMount(){
        console.log('willmount');
        this.props.learnActions.resetLearnContext();

        let pathElements = this.props.location.pathname.split('/');
        let listId = pathElements[pathElements.length-1];
        this.props.studentActions.loadLearnItemsToLearn(this.props.student.id,listId);
    }

    componentWillUnmount(){
        if(this.timer){
            clearTimeout(this.timer);
        }
    }

    itemReplacedAfterCorrectAnswer(nextProps) {
        return nextProps.learnItems && nextProps.learnItems.length > 0 && nextProps.learnItems.length == this.props.learnItems.length-1;
    }

    shouldLoadFirstLearnItem(nextProps) {
        return nextProps.learnItems && nextProps.learnItems.length > 0 && this.props.learnItems.length==0 && this.props.successfullyAnsweredIds && this.props.successfullyAnsweredIds.length==0;
    }


    componentWillReceiveProps(nextProps) {
        console.log('willreceive');
        let that = this;

        if (this.shouldLoadFirstLearnItem(nextProps) || this.itemReplacedAfterCorrectAnswer(nextProps)) {
            this.setState((previousState) => update(previousState, {
                currentLearnItem: {$set: nextProps.learnItems[0]},
                showSolution: {$set: false}
            }), this.resetCountDown);
        }
    }

    createResult(wasSuccessful){
        return {wasSuccessful:wasSuccessful, student:this.props.student,learnItem:this.state.currentLearnItem}
    }

    render() {
        const that = this;
        return (
        <div>
            {this.state.currentLearnItem && !this.props.ranOutOfLearnItems && /*new 0108*/ !(this.props.loadingInProgress && this.props.learnItems.length==0) &&
                <div>
                    <LearningStatusInfo pointsCollected={this.state.points}/>
                    <LearnItemQuestion learnItem={this.state.currentLearnItem} showSolution={this.state.showSolution}/>
                    <TextInput ref1={input => input && input.focus()} onChange={this.updateStateOnType} onKeyPress={this.updateStateOnKeyPress} value={this.state.typedSolution}/>
                    <ProgressBar totalTime={this.state.totalTime} usedUpTime={this.state.usedUpTime} isVisible={this.state.currentLearnItem && this.state.currentLearnItem.alreadyPracticed}/>
                </div>}
            {!this.state.showSolution && <Sound
                url="../resources/success.wav"
                playStatus={this.state.soundPlaying}
                playFromPosition={1000 /* in milliseconds */}
                onFinishedPlaying={() => this.setState({soundPlaying: Sound.status.STOPPED})} />}
            {this.props.loadingInProgress && this.props.learnItems.length==0 && <h4>Loading...</h4>}
            {this.props.ranOutOfLearnItems && <h1>No more items to practice at this time</h1>}
        </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    //console.log('mapstatetoprops: '+JSON.stringify(state));
    return {
        student: state.studentContext.student,
        learnItems: state.learnContext.learnItems,
        list: state.activeList, //TODO: remove?
        canLoadMore: state.learnContext.canLoadMore,
        loadingInProgress: state.learnContext.loadingInProgress,
        ranOutOfLearnItems: state.learnContext.learnItems.length==0 && !state.learnContext.canLoadMore,
        successfullyAnsweredIds: state.learnContext.successfullyAnsweredIds
    };
}

function mapDispatchToProps(dispatch) {
    return {
        learnItemActions: bindActionCreators(learnItemActions, dispatch),
        listActions: bindActionCreators(listActions, dispatch),
        studentActions: bindActionCreators(studentActions, dispatch),
        learnActions: bindActionCreators(learnActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LearningPage);