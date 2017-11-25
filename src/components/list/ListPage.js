/**
 * Created by krisztian on 28/09/16.
 */
import React, {PropTypes}  from 'react';
import update from '../../../node_modules/react-addons-update';
import LearnItemPage from '../learnItem/LearnItemPage';
import {connect} from 'react-redux';
import * as listActions from '../../actions/listActions';
import * as itemActions from '../../actions/learnItemActions';
import {bindActionCreators} from 'redux';
import ContentEditable from '../../../node_modules/react-contenteditable';
import striptags from '../../../node_modules/striptags';
import LearnItemTableView from '../learnItem/learnItemTableView';
import Pagination from 'react-js-pagination';
import pageSize from '../../constants';
import NewLearnItem from '../learnItem/newLearnItem';
import {isOwnerOfList} from '../../reducers/helperFunctions';

class ListPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.disableEditing = this.disableEditing.bind(this);
        this.changeEditingToTrue = this.changeEditingToTrue.bind(this);
        this.updateListName = this.updateListName.bind(this);
        this.updateListDescription = this.updateListDescription.bind(this);
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.loadNewLearnItemAddition = this.loadNewLearnItemAddition.bind(this);
        this.deleteLearnItem = this.deleteLearnItem.bind(this);

    }

    componentWillMount(){
        let pathElements = this.props.location.pathname.split('/');
        let listId = pathElements[pathElements.length-1];

        this.props.actions.clearActiveList();

        this.props.actions.loadList(parseInt(listId)).then(()=>{
            this.props.actions.loadLearnItems(parseInt(listId),0); //working by accident?
        });

        this.setState({list:{name:this.props.list.name, description: this.props.list.description}, activePage: 0});

        this.props.actions.disableEditing(); //new
    }

    componentWillReceiveProps(nextProps){
        this.setState((previousState) => update(previousState, {
            //enableEditing: {$set: false},
              list: {$set: nextProps.list},
            learnItems: {$set: nextProps.learnItems}
        }));
    }

    loadNewLearnItemAddition(){
        this.setState((previousState) => update(previousState, {
            learnItemToAdd: {$set: {text:'',translations:''}}
        }));
    }

    updateListName(event) {
        const value = striptags(event.target.value);

        this.setState((previousState) => update(previousState, {
            list: {name: {$set: value}},
            changedSinceLastSave: {$set: true}
        }));

    }

    updateListDescription(event) {
        const value = striptags(event.target.value);
        this.setState(Object.assign({},this.state,{list: Object.assign(this.state.list,{description:value}), changedSinceLastSave:true}));
    }

    disableEditing() {
        this.props.actions.disableEditing();
    }

    changeEditingToTrue() {
        this.props.actions.enableEditing();
    }

    save(){
        this.setState(Object.assign(this.state,{changedSinceLastSave:false})); //TODO maybe only set this after it was successfully saved?
        this.props.actions.saveList(this.state.list);
        this.props.actions.disableEditing();
    }

    cancel(){
        this.setState((previousState) => update(previousState, {
            //enableEditing: {$set: false},
            changedSinceLastSave: {$set: false},
            list: {$set: this.props.list}
        }));
        this.props.actions.disableEditing();
    }

    handlePageChange(page){
        let pathElements = this.props.location.pathname.split('/');
        let listId = pathElements[pathElements.length-1];

        if(this.props.learnItemPages[page-1]===undefined){
            this.props.actions.loadLearnItems(parseInt(listId),page-1);
        } else {
            this.props.actions.changePage(page-1);
        }
    }

    deleteLearnItem(learnItemId){
        this.props.itemActions.deleteLearnItem(learnItemId);
    }

    render() {
        const that = this;
        return (
            <div>
                <h1>
                    {this.props.enableEditing &&
                        <ContentEditable
                        name="title"
                        html={this.state.list.name} // innerHTML of the editable div
                        disabled={false}       // use true to disable edition
                        onChange={this.updateListName} // handle innerHTML change
                        />
                    }
                    {!this.props.enableEditing &&
                    <ContentEditable
                        name="title"
                        html={this.state.list.name} // innerHTML of the editable div
                        disabled={true}       // use true to disable edition
                        onChange={this.updateListName} // handle innerHTML change
                        />
                    }
                    </h1>
                    {this.props.enableEditing &&
                        <ContentEditable
                        name="description"
                        html={that.state.list.description} // innerHTML of the editable div
                        disabled={false}       // use true to disable edition
                        onChange={this.updateListDescription} // handle innerHTML change
                        />
                    }
                    {!this.props.enableEditing &&
                        <ContentEditable
                            name="description"
                            html={that.state.list.description} // innerHTML of the editable div
                            disabled={true}       // use true to disable edition
                            onChange={this.updateListDescription} // handle innerHTML change
                            />
                    }
                <br/>
                {this.props.hasPermissionToEdit && this.props.isOwnerOfList && !that.props.enableEditing && <div><button onClick={this.changeEditingToTrue} className={this.props.ajaxCallsInProgress? "btn btn-primary disabled" : "btn btn-primary"}>
                    Enable editing
                </button> </div>}
                {this.props.enableEditing &&
                    <div>
                        <button onClick={this.loadNewLearnItemAddition} className="btn btn-primary">
                                Add new learn Item
                        </button>
                        <br/><br/>
                        <div>
                            {this.state.changedSinceLastSave && <button onClick={this.save} className="btn btn-success">
                                Save
                            </button>}

                            {!this.state.changedSinceLastSave && <button onClick={this.save} className="btn btn-secondary">
                                Save
                            </button>}

                            <button onClick={this.cancel} className="btn btn-warning">
                                Cancel changes
                            </button>
                        </div>
                    </div>
                }
                {that.state.learnItemToAdd &&
                <div>
                    <NewLearnItem value={that.state.learnItemToAdd} list = {that.state}/>
                </div>}
                <br/><br/>
                <div>
                    {this.state.learnItems && <div><LearnItemTableView learnItems={this.state.learnItems} isDeletable={this.props.isOwnerOfList} deleteFunction={this.deleteLearnItem}/></div>}
                </div>
                <div>
                    <Pagination
                        activePage={this.state.activePage != undefined ? this.state.activePage : 0}
                        itemsCountPerPage={10}
                        totalItemsCount={this.props.totalCount != undefined ? this.props.totalCount : 100}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                        />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {

    if(state.listsContext.activeList.learnItems===undefined){ //learnItems not loaded yet
        return {
            list:Object.assign({},state.listsContext.activeList)
        };
    }
    //console.log('isOwnerOfList: '+isOwnerOfList(state));

    return {
        ajaxCallsInProgress: state.ajaxCallsInProgress,
        list:Object.assign({},state.listsContext.activeList),
        totalCount: state.listsContext.activeList.learnItems.totalCount,
        activePage: state.listsContext.activeList.learnItems.activePage,
        learnItemPages: state.listsContext.activeList.learnItems.pages,
        learnItems: state.listsContext.activeList.learnItems.pages[state.listsContext.activeList.learnItems.activePage],
        hasPermissionToEdit: state.listsContext.activeList.owner,
        isOwnerOfList: isOwnerOfList(state),
        enableEditing: state.listsContext.enableEditing
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(listActions, dispatch),
        itemActions: bindActionCreators(itemActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);