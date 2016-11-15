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

class LearningPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            totalTime : 60,
            usedUpTime: 0
        };

        this.getNextLearnItem = this.getNextLearnItem.bind(this);
    }

    getNextLearnItem(){
        if(this.state.upcomingLearnItems.length>0){
            this.setState((previousState) => update(previousState, {
                learnItemToAdd: {$set: this.state.upcomingLearnItems.splice(0)},
                upcomingLearnItems: {$set: this.state.upcomingLearnItems.splice(1,this.state.upcomingLearnItems.splice.length()-1)}
            }));
        } else {
            //load new learnItems
            this.props.actions.loadLearnItemsToLearn(this.props.list.id);
        }
    }

    componentWillMount(){
        let pathElements = this.props.location.pathname.split('/');
        let listId = pathElements[pathElements.length-1];

        listActions.loadList();
    }

    componentWillReceiveProps(nextProps){
        //TODO: new learnitems into the state
        if(nextProps.learnItems){
            this.setState((previousState) => update(previousState, {
                upcomingLearnItems: {$set: nextProps.learnItems}
            }));
        }
    }

    render() {
        const that = this;
        return (
            <div>
                <h1>{this.state.currentLearnItem}</h1>
                <ProgressBar totalTime={this.state.totalTime} usedUpTime={this.state.usedUpTime}/>
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
        actions: bindActionCreators(LearnItemActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LearningPage);