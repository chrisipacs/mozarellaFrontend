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

class CourseSelectionPage extends React.Component {

    constructor(props, context) {
        super(props, context);
    }

    render() {
        const that = this;

        return (
            <div>
                <h1>Create a new course</h1>
                <input
                    type="submit"
                    disabled={false}
                    value='Create new expression list'
                    className="btn btn-primary"
                    onClick={()=>{that.props.actions.browseLists(false)}}/>

                <h1>Select a list to study with your pet</h1>
                <input
                    type="submit"
                    disabled={false}
                    value='Show available lists'
                    className="btn btn-primary"
                    onClick={()=>{that.props.actions.browseLists(true)}}/>
                { this.props.browseLists ? <ListTable lists={this.props.lists} actions={this.props.actions}/> : null}
                </div>
        );
    }
}

CourseSelectionPage.propTypes = {
    lists: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired//,
    //browseLists: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        lists: state.listsContext.lists,
        browseLists: state.listsContext.browseLists
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(listActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CourseSelectionPage);