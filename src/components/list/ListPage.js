/**
 * Created by krisztian on 28/09/16.
 */
import React, {PropTypes}  from 'react';
import LearnItemPage from '../learnItem/LearnItemPage';
import {connect} from 'react-redux';
import * as listActions from '../../actions/listActions';
import {bindActionCreators} from 'redux';
import ContentEditable from '../../../node_modules/react-contenteditable';
import striptags from '../../../node_modules/striptags';
//list.learnItemContext is always populated
//list.learnItemContext.pageSize
//list.learnItemContext.pageNumber
//list.learnItemContext.learnItems

class ListPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.changeEditing = this.changeEditing.bind(this);
        this.updateListName = this.updateListName.bind(this);
        this.updateListDescription = this.updateListDescription.bind(this);
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
    }

    componentWillMount(){

        let pathElements = this.props.location.pathname.split('/');
        let listId = pathElements[pathElements.length-1];

        this.props.actions.loadList(parseInt(listId));

        this.setState(Object.assign({}, {list: {}}));
        //this.setState({list:{name:this.props.list.name, description: this.props.list.description}});
    }

    componentWillReceiveProps(nextProps){
        this.setState(Object.assign({}, this.state, {enableEditing: false, list: Object.assign({},nextProps.list)}));
    }

    updateListName(event) {
        const value = striptags(event.target.value);
        this.setState(Object.assign({},this.state,{list: Object.assign(this.state.list,{name:value}),changedSinceLastSave : true}));
    }

    updateListDescription(event) {
        const value = striptags(event.target.value);
        this.setState(Object.assign({},this.state,{list: Object.assign(this.state.list,{description:value}), changedSinceLastSave:true}));
    }

    changeEditing() {
        this.setState({enableEditing:!this.state.enableEditing});
    }

    save(){
        this.setState(Object.assign(this.state,{changedSinceLastSave:false}));
        this.props.actions.saveList(this.state.list);
    }

    cancel(){
        this.setState(Object.assign(this.state,{list: Object.assign({},this.props.list), enableEditing:false,changedSinceLastSave:false}));
    }

    render() {
        const that = this;

        return (
            <div>
                <h1>
                <ContentEditable
                    name="title"
                    html={that.state.list.name} // innerHTML of the editable div
                    disabled={!that.state.enableEditing}       // use true to disable edition
                    onChange={this.updateListName} // handle innerHTML change
                />
                    </h1>
                <ContentEditable
                    name="title"
                    html={that.state.list.description} // innerHTML of the editable div
                    disabled={!that.state.enableEditing}       // use true to disable edition
                    onChange={this.updateListDescription} // handle innerHTML change
                    />
                <br/>
                {!that.state.enableEditing && <button onClick={this.changeEditing} className="btn btn-primary">
                    Enable editing
                </button>}
                {this.state.enableEditing && <div>
                    <button onClick={this.save} className={this.state.changedSinceLastSave ? "btn btn-success" : "btn btn-secondary"}>
                        Save
                    </button>  <button onClick={this.cancel} className={this.state.changedSinceLastSave ? "btn btn-warning" : "btn btn-secondary"}>
                        Cancel changes
                    </button>
                </div>}
            </div>
        );
    }
}

ListPage.propTypes = {
    //list: PropTypes.object.isRequired,
    //actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        list:Object.assign({},state.listsContext.listUnderEdit)
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(listActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);