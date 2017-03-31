/**
 * Created by krisztian on 10/09/16.
 */
import React from 'react';
import * as LearnItemActions from '../../actions/learnItemActions';
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
            ranOutOfLearnItems: false,
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

    getNextLearnItem(){
        if(this.state.upcomingLearnItems && this.state.upcomingLearnItems.length>0){
            this.setState((previousState) => update(previousState, {
                currentLearnItem: {$set: this.state.upcomingLearnItems[0]},
                upcomingLearnItems: {$set: this.state.upcomingLearnItems.splice(1)},
                showSolution: {$set: false}
            }),this.resetCountDown);
        } else {
            //the action triggered by this will call getNextLearnItem again
            let pathElements = this.props.location.pathname.split('/');
            let listId = pathElements[pathElements.length-1];

            this.props.studentActions.loadLearnItemsToLearn(this.props.student.id,listId);
        }
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

        if(solution==this.state.currentLearnItem.translations[0]){ //TODO: implement a more generic solution for checking
            let playing = this.state.showSolution ? Sound.status.STOPPED : Sound.status.PLAYING;
            let pointValue = this.state.currentLearnItem.pointValue!=undefined ? this.state.currentLearnItem.pointValue: 100;
            let points = this.state.showSolution ? 0 : pointValue;

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
        this.getNextLearnItem();
    }

    componentWillUnmount(){
        if(this.timer){
            clearTimeout(this.timer);
        }
    }

    componentWillReceiveProps(nextProps) {
        let that = this;
        if (nextProps.learnItems && nextProps.learnItems.length>0) {
            this.setState((previousState) => update(previousState, {
                upcomingLearnItems: {$set: nextProps.learnItems}
            }), that.getNextLearnItem);
        } else {
            this.setState({ranOutOfLearnItems: true});
        }
    }

    createResult(wasSuccessful){
        return {wasSuccessful:wasSuccessful, student:this.props.student,learnItem:this.state.currentLearnItem}
    }

    render() {
        const that = this;
        return (
        <div>
            {this.state.currentLearnItem && !this.state.ranOutOfLearnItems &&
                <div>
                    <LearningStatusInfo pointsCollected={this.state.points}/>
                    <h1>{this.state.currentLearnItem.text}</h1>
                    {this.state.showSolution &&
                        <div className="alert alert-danger" role="alert">
                            {this.state.currentLearnItem.translations[0]}
                        </div>
                    }
                    <TextInput onChange={this.updateStateOnType} onKeyPress={this.updateStateOnKeyPress} value={this.state.typedSolution}/>
                    <ProgressBar totalTime={this.state.totalTime} usedUpTime={this.state.usedUpTime}/>
                </div>}
            {!this.state.showSolution && <Sound
                url="../resources/success.wav"
                playStatus={this.state.soundPlaying}
                playFromPosition={1000 /* in milliseconds */}
                onFinishedPlaying={() => this.setState({soundPlaying: Sound.status.STOPPED})} />}
            {this.state.ranOutOfLearnItems && <h1>No more items to practice at this time</h1>}
        </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        student: state.studentContext.student,
        learnItems: state.learnContext.learnItems,
        list: state.activeList //TODO: remove?
    };
}

function mapDispatchToProps(dispatch) {
    return {
        learnItemActions: bindActionCreators(LearnItemActions, dispatch),
        listActions: bindActionCreators(listActions, dispatch),
        studentActions: bindActionCreators(studentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LearningPage);