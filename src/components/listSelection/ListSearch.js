/**
 * Created by krisztian on 2017. 04. 29..
 */

import React, {PropTypes}  from 'react';
import ReactDOM from 'react-dom';
import TextInput from '../reusable/TextInput';
import ISOLangs from '../../ISOLangs';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import update from 'react-addons-update';

class ListSearch extends React.Component {
    constructor(props, context) {
        super(props, context);

        //props should contain a method for search

        this.state = {
            fromLanguage: '',
            toLanguage: '',
            name: ''
        };

        this.updateName = this.updateName.bind(this);
        this.updateFromLanguage = this.updateFromLanguage.bind(this);
        this.updateToLanguage = this.updateToLanguage.bind(this);
    }

    updateFromLanguage(newLanguage){
        let nextState = JSON.parse(JSON.stringify(this.state));
        nextState['fromLanguage'] = newLanguage;
        return this.setState(nextState,()=>{

        });
    }

    updateToLanguage(newLanguage){
        let nextState = JSON.parse(JSON.stringify(this.state));
        nextState['toLanguage'] = newLanguage;
        return this.setState(nextState,()=>{

        });
    }

    resetState(){
        this.setState({
            fromLanguage: '',
            toLanguage: '',
            name: ''
        });
    }

    updateName(event){
        if(event.target!=undefined && event.target!=null && event.target.name=='name'){
            console.log('name');
            event.persist();
            let nextState = JSON.parse(JSON.stringify(this.state));
            nextState['name'] = event.target.value;
            return this.setState(nextState,()=>{ //ACTIONS!

            });
        }
    }

    render(){
        return (
            <div>
                <TextInput value={this.state.name} name='name' label='List name' onChange={this.updateName}/>
                <Dropdown options={ISOLangs} name='fromLanguage' onChange={this.updateFromLanguage} value={this.state.fromLanguage} placeholder="The language you know" /><br/>
                <Dropdown options={ISOLangs} name='toLanguage' onChange={this.updateToLanguage} value={this.state.toLanguage} placeholder="The language you learn" /><br/>
                <input
                    type="submit"
                    disabled={false}
                    value="Clear"
                    className="btn btn-warning"
                    onClick={()=>this.resetState()}/>
                <input
                    type="submit"
                    disabled={false}
                    value="Search"
                    className="btn btn-primary"
                    onClick={()=>this.props.onSearch(this.state)}/>
            </div>
        )}
}

export default ListSearch;