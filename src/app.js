/**
 * Created by krisztian on 01/09/16.
 */

/*eslint-disable import/default */
import 'babel-polyfill';
import React,{PropTypes}  from 'react';
import { render } from 'react-dom';
import configureStore from './store/configureStore';
import {Provider, connect} from 'react-redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
//import {loadCourses} from './actions/courseActions';
//import {loadAuthors} from './actions/authorActions';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/toastr/build/toastr.min.css';

//import {PropTypes} from 'react';
//import {connect} from 'react-redux';

import Header from './components/navigation';

class App extends React.Component {
    render() {
        return (
            <div className="container-fluid">
                <Header/>
                {this.props.children}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
    return {
        loading: state.ajaxCallsInProgress > 0
    };
}

export default connect(mapStateToProps)(App);