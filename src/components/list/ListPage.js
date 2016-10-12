/**
 * Created by krisztian on 28/09/16.
 */
import React, {PropTypes}  from 'react';
import update from '../../../node_modules/react-addons-update';
import LearnItemPage from '../learnItem/LearnItemPage';
import {connect} from 'react-redux';
import * as listActions from '../../actions/listActions';
import {bindActionCreators} from 'redux';
import ContentEditable from '../../../node_modules/react-contenteditable';
import striptags from '../../../node_modules/striptags';
import LearnItemTableView from '../learnItem/learnItemTableView';
import Pagination from "../../../node_modules/react-js-pagination";

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
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentWillMount(){

        let pathElements = this.props.location.pathname.split('/');
        let listId = pathElements[pathElements.length-1];

        this.props.actions.loadList(parseInt(listId));

        this.setState(Object.assign({}, {list: {}, learnItems:[]}));
        //this.setState({list:{name:this.props.list.name, description: this.props.list.description}});
    }

    componentWillReceiveProps(nextProps){
        console.log('willreceive'+JSON.stringify(nextProps.learnItems));
        this.setState((previousState) => update(previousState, {
            enableEditing: {$set: false},
              list: {$set: nextProps.list},
            learnItems: {$set: nextProps.learnItems}
        }));
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

    handlePageChange(page){
        let pathElements = this.props.location.pathname.split('/');
        let listId = pathElements[pathElements.length-1];

        this.setState((previousState) => update(previousState, {
            activePage: {$set: page}
        }));

        this.props.actions.loadLearnItems(parseInt(listId),page);
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
                <LearnItemTableView learnItems={this.state.learnItems}/>
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={450}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                    />
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    console.log(JSON.stringify(state));
    return {
        list:Object.assign({},state.listsContext.listUnderEdit),
        learnItems:state.listsContext.listUnderEdit.learnItems
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(listActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);