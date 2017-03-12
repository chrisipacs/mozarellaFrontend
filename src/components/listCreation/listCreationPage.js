/**
 * Created by krisztian on 24/09/16.
 */
import React, {PropTypes}  from 'react';
import '../../../node_modules/fixed-data-table/dist/fixed-data-table.css';
import TextInput from '../reusable/TextInput';
import ISOLangs from '../../ISOLangs';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const ListCreationPage = ({list, onSave, onChange, onFromLanguageChange, onToLanguageChange, fromLanguage, toLanguage, saving, errors}) => {

    let languages = ISOLangs;

    return (
            <div><br/>
                <TextInput value={list.name} name='name' label='List name' onChange={onChange}/>
                <Dropdown options={languages} onChange={onFromLanguageChange} value={fromLanguage} placeholder="The language you know" /><br/>
                <Dropdown options={languages} onChange={onToLanguageChange} value={toLanguage} placeholder="The language you learn" /><br/>
                <TextInput value={list.description} name='description' label='Description' onChange={onChange}/>
                <br/><br/>
                <input
                    type="submit"
                    disabled={false}
                    value='Create list'
                    className="btn btn-primary"
                    onClick={onSave}/>

            </div>
        )};



export default ListCreationPage;