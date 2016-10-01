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
import ListCreationPage from '../listCreation/listCreationPage';
import {browserHistory} from 'react-router';

class ListSelectionPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            listsContext: Object.assign({}, this.props.listsContext),
            errors: {},
            saving: false
        };

        this.state.listsContext.listUnderEdit = Object.assign({},this.props.listsContext.listUnderEdit);

        this.updateListState = this.updateListState.bind(this);
    }

    updateListState(event) {
        const field = event.target.name;
        console.log(this);
        let listUnderEdit = this.state.listsContext.listUnderEdit;
        listUnderEdit[field] = event.target.value;
        return this.setState({listsContext: {listUnderEdit: listUnderEdit}});
    }

    redirectToListPage(listId) {
            browserHistory.push('/lists/'+listId);
    }

    componentWillReceiveProps(nextProps) {
        //console.log(this.props.lists[this.props.lists.length-1].id);
        //console.log(this.props.lists[this.props.lists.length-1].id);

        if (this.props.lists.length > 0 && this.props.lists[this.props.lists.length-1].id !=
            nextProps.lists[nextProps.lists.length-1].id) {
            this.redirectToListPage(nextProps.lists[nextProps.lists.length-1].id);
        }
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

                { this.props.browseLists ? <ListTable lists={this.props.lists} actions={this.props.actions}/>
                    : <ListCreationPage list={this.state.listsContext.listUnderEdit} onChange={this.updateListState}
                    onSave={()=>{this.props.actions.saveList(this.state.listsContext.listUnderEdit);}}/>}

                </div>
        );
    }
}

ListSelectionPage.propTypes = {
    lists: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        listsContext: state.listsContext,
        lists: state.listsContext.lists,
        browseLists: state.listsContext.browseLists
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(listActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListSelectionPage);