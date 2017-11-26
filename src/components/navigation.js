/**
 * Created by krisztian on 10/09/16.
 */
import React, {PropTypes} from 'react';
import { Link, IndexLink } from 'react-router';
import LoadingDots from './loadingDots';
import '../../public/custom.css';

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
                    <p className="alignleft">
                        <IndexLink to="/lists" activeClassName="active">Home</IndexLink>
                        <Link to="/lists" activeClassName="active">Courses</Link>
                        {" | "}
                        <Link to="/learn" activeClassName="active">Learn</Link>
                        {loading && <LoadingDots interval={100} dots={20}/>}
                    </p>
                    <p className="alignright">
                        <Link to="/settings" activeClassName="active">Settings</Link>
                        {" | "}
                        <Link to="/logout" activeClassName="active">Log out</Link>
                    </p>
            </div>
        </nav>
    );
};

export default NavigationPage;