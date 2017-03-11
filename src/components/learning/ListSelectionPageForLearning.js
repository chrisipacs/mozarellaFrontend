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
import ListTable from '../listSelection/ListTable';
import ListCreationPage from '../listCreation/ListCreationPage';
import {browserHistory} from 'react-router';
import pageSize from './learnItemListPageSize';

class ListSelectionPageForLearning extends React.Component {

    constructor(props, context) {
        super(props, context);

        //this.props.actions.loadLists(0,pageSize).then(function(loadedLists){
        //    console.log('successfully loaded the following lists: '+loadedLists);
        //});

        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentWillMount(){
        this.state = {
            activePage: 0,
            totalCount: 0 //todo: move this to the store, and props
        };
    }

    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});
        this.props.actions.loadLists(pageNumber-1,pageSize);
    }

    render() {
        return (
            <div>
                <ListTable lists={this.props.lists}
                           actions={this.props.actions}
                           activePage={this.state.activePage}
                           itemsCountPerPage={this.pageSize}
                           totalCount={this.props.totalCount}
                           pageRangeDisplayed={10}
                           onChange={this.handlePageChange} actions={this.props.actions} nameOfAction='Study' pagePrefix='learn'

                    />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        lists: state.studentContext.listsContext.lists,
        totalCount: state.studentContext.listsContext.totalCount
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(listActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListSelectionPageForLearning);