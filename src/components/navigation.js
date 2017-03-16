/**
 * Created by krisztian on 10/09/16.
 */
import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './loadingDots';

const NavigationPage = ({loading}) => {
    return (
        <nav className="navbar navbar-default">
            <div className="container">

                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>

                </div>

                <IndexLink to="/" activeClassName="active">Pet</IndexLink>
                {" | "}
                <Link to="/lists" activeClassName="active">Courses</Link>
                {" | "}
                <Link to="/learn" activeClassName="active">Learn</Link>
                {" | "}
                <Link to="/settings" activeClassName="active">Settings</Link>
                {loading && <LoadingDots interval={100} dots={20}/>}
            </div>
        </nav>
    );
};

export default NavigationPage;