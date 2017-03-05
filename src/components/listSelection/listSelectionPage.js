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
import ListTable from './ListTable';
import ListCreationPage from '../listCreation/ListCreationPage';
import {browserHistory} from 'react-router';

class ListSelectionPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            listsContext: Object.assign({}, this.props.listsContext),
            errors: {},
            saving: false,
            activePage: 0
        };

        this.state.listsContext.activeList = Object.assign({},this.props.listsContext.activeList);
        this.updateListState = this.updateListState.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.saveList = this.saveList.bind(this);

        let pageSize = 10; //TODO to its own file
    }

    updateListState(event) {
        const field = event.target.name;
        console.log(this);
        let listUnderEdit = this.state.listsContext.activeList;
        listUnderEdit[field] = event.target.value;
        return this.setState({listsContext: {activeList: listUnderEdit}});
    }

    redirectToListPage(listId) {
            browserHistory.push('/lists/'+listId);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.newlyCreatedListId!=nextProps.newlyCreatedListId && nextProps.newlyCreatedListId!=undefined){
            this.redirectToListPage(nextProps.newlyCreatedListId);
        }
    }

    saveList(){
        this.props.actions.saveList(this.state.listsContext.activeList);
    }

    handlePageChange(pageNumber) {
        let pageSize = 10;
        this.setState({activePage: pageNumber});
        this.props.actions.loadLists(pageNumber-1,pageSize);
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
                                                      nameOfAction='View' pagePrefix='lists'/>
                    : <ListCreationPage list={this.state.listsContext.activeList} onChange={this.updateListState}
                    onSave={this.saveList}/>}

                </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        listsContext: state.listsContext,
        lists: state.listsContext.lists,
        browseLists: state.listsContext.browseLists,
        totalCount: state.listsContext.totalCount,
        newlyCreatedListId: state.listsContext.activeList.id
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(listActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListSelectionPage);