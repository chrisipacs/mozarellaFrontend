/**
 * Created by krisztian on 10/09/16.
 */
import React, {PropTypes} from 'react';

class App extends React.Component {
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