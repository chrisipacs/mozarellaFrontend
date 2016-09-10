/**
 * Created by krisztian on 10/09/16.
 */
import React from 'react';

"use strict";

class LearningPage extends React.Component {

    getInitialState(){


    }

    render() {
        return (
            <div className="behind">
                <Header
                    loading={this.props.loading}
                    />
                {this.props.children}
            </div>
        );
    }
}