/**
 * Created by krisztian on 28/09/16.
 */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";

class LearnItemPage extends Component {
    constructor(props) {
        super();
        this.state = {
            activePage: 15
        };
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    handlePageChange(pageNumber) {
        this.setState({activePage: pageNumber});
    }

    render() {
        return (
            <div>
                <Pagination
                    activePage={this.state.activePage}
                    itemsCountPerPage={10}
                    totalItemsCount={450}
                    pageRangeDisplayed={5}
                    onChange={this.handlePageChange}
                    />
            </div>
        );
    }
}

export default LearnItemPage;