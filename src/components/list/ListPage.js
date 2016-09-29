/**
 * Created by krisztian on 28/09/16.
 */
import React, {PropTypes}  from 'react';
import LearnItemPage from '../learnItem/LearnItemPage';
import {connect} from 'react-redux';
import * as listActions from '../../actions/listActions';
import {bindActionCreators} from 'redux';
import ContentEditable from '../../../node_modules/react-contenteditable';

//list.learnItemContext is always populated
//list.learnItemContext.pageSize
//list.learnItemContext.pageNumber
//list.learnItemContext.learnItems

class ListPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.state = {
            enableEditing:true,
            html:'aglast'
        };

        console.log(this.props.location.pathname); //TODO

        this.props.actions.loadList(1);

        this.enableEditing = this.enableEditing.bind(this);
        this.updateListState = this.updateListState.bind(this);
    }

    updateListState() {
        //const field = event.target.name;
        //console.log(this);
        //let listUnderEdit = this.state.listsContext.listUnderEdit;
        //listUnderEdit[field] = event.target.value;
        //return this.setState({listsContext: {listUnderEdit: listUnderEdit}});
    }

    enableEditing(enableEditing) {
        this.setState({enableEditing:enableEditing});
    }

    render() {
        const that = this;

        return (
            <div>
                <ContentEditable
                    html={this.state.html} // innerHTML of the editable div
                    disabled={false}       // use true to disable edition
                    onChange={this.updateListState} // handle innerHTML change
                />
                <button onClick={()=>{this.enableEditing(!this.state.editing)}}>
                    Enable Editing
                </button>
            </div>
        );
    }
}

ListPage.propTypes = {
    //list: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        //listsContext: state.listsContext,
        list:state.listsContext.listUnderEdit
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(listActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);