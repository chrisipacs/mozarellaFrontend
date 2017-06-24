/**
 * Created by krisztian on 2016. 10. 30..
 */

import React from 'react';
import {render} from 'react-dom';
import {browserHistory, Link} from 'react-router';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as logoutActions from '../../actions/logoutActions';

class LoginComponent extends React.Component {

        constructor(props, context) {
            super(props, context);
        }

        componentWillMount(){
            this.props.actions.logout().then(()=>{
                console.log('THEN');
                if(this.props.student != undefined && this.props.student.id!=undefined){
                    browserHistory.push('/');
                }
            });
        }

        render() {
            return null;
            }
        }

function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(logoutActions, dispatch)
    };
}


function mapStateToProps(state, ownProps) {
    return {
        student: state.studentContext.student
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);