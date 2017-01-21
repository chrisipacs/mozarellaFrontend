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
import Pagination from '../../../node_modules/react-js-pagination';
import pageSize from '../../constants';
import NewLearnItem from '../learnItem/newLearnItem';

class ListPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.changeEditing = this.changeEditing.bind(this);
        this.updateListName = this.updateListName.bind(this);
        this.updateListDescription = this.updateListDescription.bind(this);
        this.save = this.save.bind(this);
        this.cancel = this.cancel.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
        this.loadNewLearnItemAddition = this.loadNewLearnItemAddition.bind(this);
    }

    componentWillMount(){
        let pathElements = this.props.location.pathname.split('/');
        let listId = pathElements[pathElements.length-1];

        this.props.actions.loadList(parseInt(listId)).then(()=>{
            this.props.actions.loadLearnItems(parseInt(listId),0); //working by accident?
        });

        this.setState({list:{name:this.props.list.name, description: this.props.list.description}, activePage: 0});
    }

    componentWillReceiveProps(nextProps){
        this.setState((previousState) => update(previousState, {
            enableEditing: {$set: false},
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

    changeEditing() {
        this.setState({enableEditing:!this.state.enableEditing});
    }

    save(){
        this.setState(Object.assign(this.state,{changedSinceLastSave:false})); //TODO maybe only set this after it was successfully saved?
        this.props.actions.saveList(this.state.list);
    }

    cancel(){
        this.setState((previousState) => update(previousState, {
            enableEditing: {$set: false},
            changedSinceLastSave: {$set: false},
            list: {$set: this.props.list}
        }));
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
                    name="description"
                    html={that.state.list.description} // innerHTML of the editable div
                    disabled={!that.state.enableEditing}       // use true to disable edition
                    onChange={this.updateListDescription} // handle innerHTML change
                    />
                <br/>
                {!that.state.enableEditing && <div><button onClick={this.changeEditing} className="btn btn-primary">
                    Enable editing
                </button> </div>}
                {this.state.enableEditing &&
                    <div>
                        <button onClick={this.loadNewLearnItemAddition} className="btn btn-primary">
                                Add new learn Item
                        </button>
                        <br/><br/>
                        <div>
                            <button onClick={this.save} className={this.state.changedSinceLastSave ? "btn btn-success" : "btn btn-secondary"}>
                                Save
                            </button>  <button onClick={this.cancel} className={this.state.changedSinceLastSave ? "btn btn-warning" : "btn btn-secondary"}>
                                Cancel changes
                            </button>
                        </div>
                    </div>
                }
                {that.state.learnItemToAdd &&
                <div>
                    <NewLearnItem value={that.state.learnItemToAdd}/>
                </div>}
                <br/><br/>
                <div>
                    {this.state.learnItems && <div><LearnItemTableView learnItems={this.state.learnItems}/></div>}
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
    return {
        list:Object.assign({},state.listsContext.activeList),
        totalCount: state.listsContext.activeList.learnItems.totalCount,
        activePage: state.listsContext.activeList.learnItems.activePage,
        learnItemPages:state.listsContext.activeList.learnItems.pages,
        learnItems:state.listsContext.activeList.learnItems.pages[state.listsContext.activeList.learnItems.activePage]
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(listActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ListPage);