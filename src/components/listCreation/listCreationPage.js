/**
 * Created by krisztian on 24/09/16.
 */
import React, {PropTypes}  from 'react';
import '../../../node_modules/fixed-data-table/dist/fixed-data-table.css';
import TextInput from '../reusable/TextInput';

const ListCreationPage = ({list, onSave, onChange, saving, errors}) => {
    return (
            <div><br/>
                <TextInput value={list.name} name='name' label='List name' onChange={onChange}/>
                <TextInput value={list.fromLanguage} name='fromLanguage' label='Your language' onChange={onChange}/>
                <TextInput value={list.toLanguage} name='toLanguage' label='The language you learn' onChange={onChange}/>
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