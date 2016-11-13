/**
 * Created by krisztian on 2016. 11. 12..
 */
import React from 'react';
import {Field, reduxForm} from 'redux-form';

const signUpField = ({ input, label, type, meta: { asyncValidating,touched, error, warning } }) => (

    <div className={"form-group"+((touched && error)? " has-error" : touched? " has-success" : "")+" has-feedback"}>
        <label className="control-label">{label}</label>
        <input {...input} type={type} className="form-control" id={label} aria-describedby="inputSuccess2Status"/>
        {touched && !error && <span className="glyphicon glyphicon-ok form-control-feedback" aria-hidden="true"></span>}
        <span id="inputSuccess2Status" className="sr-only">(success)</span>
        {touched && ((error && <span className="help-block">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>

);

export default signUpField;