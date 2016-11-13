/**
 * Created by krisztian on 2016. 10. 30..
 */


import React from 'react';
import {render} from 'react-dom';
import {browserHistory} from 'react-router';
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
                password: ''
            }
        }

        updateUserName(event){
            event.persist();
            console.log(event.target.value);
            this.setState((previousState) => update(previousState, {
                username: {$set: event.target.value}
            }));
        }

        updatePassword(event){
            event.persist();
            console.log(event.target.value);
            this.setState((previousState) => update(previousState, {
                password: {$set: event.target.value}
            }));
        }

        handleSubmit(event) {
            event.preventDefault();
            this.props.actions.login(this.state.username,this.state.password);
        }

        componentWillReceiveProps(nextProps){
            if(nextProps.student!=undefined && nextProps.student.name!=undefined && nextProps.location.state.nextPathname!=null){
                browserHistory.push(nextProps.location.state.nextPathname);
            }
        }

        render() {
            return (<div className="container">
                    <form className="form-signin">
                        <h2 className="form-signin-heading">Please sign in</h2>
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
                    Not a member? <a href="/signup">Sign up</a>
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
        student: state.student
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);