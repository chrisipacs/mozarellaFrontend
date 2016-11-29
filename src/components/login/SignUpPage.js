/**
 * Created by krisztian on 2016. 10. 31..
 */

import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
import {Field, reduxForm} from 'redux-form';
import TextInput from '../reusable/TextInput';
import {connect} from 'react-redux';
import update from '../../../node_modules/react-addons-update';
import {bindActionCreators} from 'redux';
import * as signupActions from '../../actions/signupActions';
import renderField from './SignUpField';
import {signupApi} from '../../middleware/middleware'; //TODO: change for real Api when integrating with backend

const validate = values => {
    const errors = {};
    if (!values.username) {
        errors.username = 'Required'
    } else if (values.username.length > 15) {
        errors.username = 'Must be 15 characters or less'
    }
    if (!values.password) {
        errors.password = 'Required'
    } else if(values.password.length<8){
        errors.password = 'Must be at least 8 characters';
    }
    if (!values.password2) {
        errors.password2 = 'Required'
    } else if(values.password2!=values.password){
        errors.password2 = 'The passwords don\'t match';
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    return errors
};

const asyncValidate = (values) => {
    return signupApi.isUsernameFree(values.username)
        .then((isFree) => {
            if (!isFree) {
                throw { username: 'That username is taken' }
            }
        });

    /*return sleep(1000) // simulate server latency
        .then(() => {
            if ([ 'john', 'paul', 'george', 'ringo' ].includes(values.username)) {
                throw { username: 'That username is taken' }
            }
        })*/
};

class SignUpPage extends React.Component {

    constructor(props, context) {
        super(props, context);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        if(!this.props.invalid) {
            this.props.actions.signUp(this.props.username, this.props.password);
            this.setState((previousState) => update(previousState, {
                isSuccessful: {$set: true}
            }));
        }
    }

    componentWillReceiveProps(nextProps){
    }

    render() {
        return (<div className="container">
            {!(this.state && this.state.isSuccessful) &&
            <form className="form-signin">
                <h2 className="form-signin-heading">Sign up</h2>
                <label className="sr-only">User name</label>
                <Field component={renderField} type="text" label="Your name" name="username" placeholder="Username" required=""
                           onChange={this.updateUserName}/><br/>
                <label className="sr-only">Password</label>
                <Field component={renderField} type="password" label="Password" name="password" placeholder="Password"
                           required="" onChange={this.updatePassword}/><br/>
                <label className="sr-only">Password</label>
                <Field component={renderField} type="password" label="Password repeated" name="password2" placeholder="Password2"
                           required="" onChange={this.checkPassword}/><br/>
                <label className="sr-only">Email address</label>
                <Field component={renderField} label="Email" type="email" name="email" placeholder="Email"
                           /><br/>

                <button className= {"btn btn-lg btn-primary btn-block" + (this.props.invalid ? " disabled" : "")} type="submit" onClick={this.handleSubmit}>Sign up</button>
            </form>}

            {(this.state && this.state.isSuccessful) &&

            <blockquote>
                <p>Thanks for signing up! Please check your emails and verify your account.</p>
            </blockquote>
            }
        </div>);
    }
}

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(signupActions, dispatch)
    };
}


function mapStateToProps(state, ownProps) {
    if(state.form.signUp && state.form.signUp.values){
        return {
            username: state.form.signUp.values.username,
            password: state.form.signUp.values.password
        };
    } else {
        return {};
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(reduxForm({
    form: 'signUp',  // a unique identifier for this form
    validate,                // <--- validation function given to redux-form
    asyncValidate
})(SignUpPage));