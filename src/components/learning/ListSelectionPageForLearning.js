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

class ListSelectionPageForLearning extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                <ListTable lists={this.props.lists} actions={this.props.actions} nameOfAction='Study' pagePrefix='learn'/>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        lists: state.listsContext.lists
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(listActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListSelectionPageForLearning);