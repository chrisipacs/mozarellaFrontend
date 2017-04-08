/**
 * Created by krisztian on 2016. 10. 30..
 */

import React from 'react';
import {render} from 'react-dom';
import {browserHistory, Link} from 'react-router';
import TextInput from '../reusable/TextInput';
import {connect} from 'react-redux';
import update from '../../../node_modules/react-addons-update';
import {bindActionCreators} from 'redux';
import * as loginActions from '../../actions/loginActions';

class LoginComponent extends React.Component {

        constructor(props, context) {
            super(props, context);

            this.updateUserName = this.updateUserName.bind(this);
            this.updatePassword = this.updatePassword.bind(this);
            this.handleSubmit = this.handleSubmit.bind(this);

            this.state = {
                username:'',
                password: '',
                loginError: false
            }
        }

        updateUserName(event){
            event.persist();
            this.setState((previousState) => update(previousState, {
                username: {$set: event.target.value}
            }));
        }

        updatePassword(event){
            event.persist();
            this.setState((previousState) => update(previousState, {
                password: {$set: event.target.value}
            }));
        }

        handleSubmit(event) {
            event.preventDefault();
            let that = this;
            this.props.actions.login(this.state.username,this.state.password)
                .then(function(){
                    //TODO trigger props update for student
                    console.log('logged in');
                })
                .catch(
                function(err){
                    console.log('Login error: '+JSON.stringify(err));
                    that.setState((previousState) => update(previousState, {
                        loginError: {$set: true}
                    }));
                })
        }

        componentWillMount(){
            if(this.props.student != undefined && this.props.student.id!=undefined){
                browserHistory.push('/');
            }
        }

        componentWillReceiveProps(nextProps){
            console.log('componentWillReceive');
            if(nextProps.student!=undefined && nextProps.student.id!=undefined &&
                nextProps.location!=undefined && nextProps.location.state!=undefined &&
                nextProps.location.state.nextPathname!=undefined){
                browserHistory.push(nextProps.location.state.nextPathname);
            } else if(nextProps.student!=undefined
                        && nextProps.student.id!=undefined){
                browserHistory.push('/');
            }
        }

        render() {
            return (<div className="container">
                    <form className="form-signin">
                        <h2 className="form-signin-heading">Please sign in</h2>
                        {this.state.loginError && <div className="alert alert-danger" role="alert">
                            <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                            <span className="sr-only">Error</span> Invalid credentials
                        </div>}
                        <label className="sr-only">User name</label>
                        <TextInput type="email" id="inputEmail" className="form-control" placeholder="Username" required=""
                               autofocus="" onChange={this.updateUserName}/>
                        <label className="sr-only">Password</label>
                        <TextInput type="password" id="inputPassword" className="form-control" placeholder="Password"
                               required="" onChange={this.updatePassword}/>

                        <div className="checkbox">
                            <label>
                                <input type="checkbox" value="remember-me"/> Remember me
                            </label>
                        </div>
                        <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.handleSubmit}>Sign in</button>
                    </form>
                    <div>
                        <Link to="/signup">Click to sign up</Link>
                    </div>
                </div>);
            }
        }

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(loginActions, dispatch)
    };
}


function mapStateToProps(state, ownProps) {
    return {
        student: state.studentContext.student
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);