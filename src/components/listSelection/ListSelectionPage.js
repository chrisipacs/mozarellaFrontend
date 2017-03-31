/**
 * Created by krisztian on 11/09/16.
 */
import React, {PropTypes}  from 'react';
import ReactDOM from 'react-dom';
import {Table, Column, Cell} from 'fixed-data-table';
import '../../../node_modules/fixed-data-table/dist/fixed-data-table.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as listActions from '../../actions/listActions';
import * as studentActions from '../../actions/studentActions';
import ListTable from './ListTable';
import ListCreationPage from '../listCreation/ListCreationPage';
import {browserHistory} from 'react-router';
import SubscribeUnsubscribe from './SubscribeUnsubscribe';
import pageSize from '../PageSize';
import update from 'react-addons-update';
import initialState from '../../reducers/initialState';

class ListSelectionPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            listsContext: Object.assign({}, JSON.parse(JSON.stringify(initialState.listsContext))),
            errors: {},
            saving: false,
            activePage: 0
        };

        this.updateListState = this.updateListState.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.saveList = this.saveList.bind(this);
        this.handleSubscribe = this.handleSubscribe.bind(this);
        this.handleUnsubscribe = this.handleUnsubscribe.bind(this);
        this.isSubscribed = this.isSubscribed.bind(this);
        this.updateFromLanguage = this.updateFromLanguage.bind(this);
        this.updateToLanguage = this.updateToLanguage.bind(this);
        this.processListBeforeSave = this.processListBeforeSave.bind(this);

        let pageSize = 10; //TODO to its own file
    }

    updateListState(event) {
        const field = event.target.name;
        console.log(this);
        let listUnderEdit = JSON.parse(JSON.stringify(this.state.listsContext.activeList));
        listUnderEdit[field] = event.target.value;
        //return this.setState({listsContext: {activeList: listUnderEdit}});

        this.setState((previousState) => update(previousState, {
            listsContext: {activeList: {$set:listUnderEdit}}
        }));
    }

    updateFromLanguage(newLanguage){
        let listUnderEdit = JSON.parse(JSON.stringify(this.state.listsContext.activeList));
        listUnderEdit['fromLanguage'] = newLanguage;
        return this.setState({listsContext: {activeList: listUnderEdit}},()=>{
            console.log('new state: '+JSON.stringify(this.state));
        });
    }

    updateToLanguage(newLanguage){
        let listUnderEdit = JSON.parse(JSON.stringify(this.state.listsContext.activeList));
        listUnderEdit['toLanguage'] = newLanguage;
        return this.setState({listsContext: {activeList: listUnderEdit}},()=>{
            console.log('new state: '+JSON.stringify(this.state));
        });
    }

    redirectToListPage(listId) {
            browserHistory.push('/lists/'+listId);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.newlyCreatedListId!=nextProps.newlyCreatedListId && nextProps.newlyCreatedListId!=undefined){
            this.redirectToListPage(nextProps.newlyCreatedListId);
        }
    }

    processListBeforeSave(list){ //only send the code to the backend
        list.fromLanguageCode = list.fromLanguage.value;
        list.toLanguageCode = list.toLanguage.value;

        return list;
    }

    saveList(){
        let listToSave = this.processListBeforeSave(this.state.listsContext.activeList);

        this.props.actions.saveList(this.state.listsContext.activeList).then(()=>{
            this.props.actions.loadLists(this.state.activePage,pageSize);
        });
    }


    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});
        this.props.actions.loadLists(pageNumber-1,pageSize);
    }

    handleSubscribe(listId){
        this.props.studentActions.subscribeStudentToList(this.props.student,listId);
    }

    handleUnsubscribe(listId){
        this.props.studentActions.deregisterStudentFromList(this.props.student,listId);
    }

    isSubscribed(listId){
        return this.props.subscribedListIds.indexOf(listId)>-1;
    }

    render() {
        const that = this;

        return (
            <div>
                <h1>Choose an action</h1>
                <input
                    type="submit"
                    disabled={false}
                    value='Create new expression list'
                    className={!this.props.browseLists ? "btn btn-primary" : ""}
                    onClick={()=>{that.props.actions.browseLists(false)}}/>

                <input
                    type="submit"
                    disabled={false}
                    value='Show available lists'
                    className={this.props.browseLists ? "btn btn-primary" : ""}
                    onClick={()=>{that.props.actions.browseLists(true)}}/>

                {this.props.browseLists ? <ListTable lists={this.props.lists}
                                            actions={this.props.actions}
                                            activePage={this.state.activePage}
                                            itemsCountPerPage={this.pageSize}
                                            totalCount={this.props.totalCount != undefined ? this.props.totalCount : 0}
                                            pageRangeDisplayed={10}
                                            onChange={this.handlePageChange}
                                            nameOfAction='View' pagePrefix='lists'
                                            column6 = {<SubscribeUnsubscribe isSubscribed={this.isSubscribed} onSubscribe={this.handleSubscribe} onUnsubscribe={this.handleUnsubscribe}/>}
                                            />
                    : <ListCreationPage list={this.state.listsContext.activeList} onChange={this.updateListState} onFromLanguageChange={this.updateFromLanguage} onToLanguageChange={this.updateToLanguage}
                    fromLanguage={this.state.listsContext.activeList.fromLanguage} toLanguage={this.state.listsContext.activeList.toLanguage} onSave={this.saveList}/>}

                </div>
        );
    }
}

function mapStateToProps(state, ownProps) {

    let subscribedListIds = [];

    if(state.studentContext.listsContext.lists!=undefined){
        subscribedListIds = state.studentContext.listsContext.lists.map((list)=>{
            return list.id;
        });
    }

    return {
        subscribedListIds,
        student: state.studentContext.student,
        listsContext: state.listsContext,
        lists: state.listsContext.lists,
        browseLists: state.listsContext.browseLists,
        totalCount: state.listsContext.totalCount,
        newlyCreatedListId: state.listsContext.activeList.id
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(listActions, dispatch),
        studentActions: bindActionCreators(studentActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListSelectionPage);