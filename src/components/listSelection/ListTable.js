/**
 * Created by krisztian on 24/09/16.
 */
import React, {PropTypes}  from 'react';
import ReactDOM from 'react-dom';
import {Table, Column, Cell} from 'fixed-data-table';
import '../../../node_modules/fixed-data-table/dist/fixed-data-table.css';
import {browserHistory} from 'react-router';
import Pagination from "../../../node_modules/react-js-pagination";

    class ListTable extends React.Component {
        constructor(props, context) {
            super(props, context);
            console.log('props at listTable: '+JSON.stringify(props));
        }

        render(){return (
        <div>
            <Table
                rowHeight={50}
                rowsCount={this.props.lists.length}
                width={1000}
                height={this.props.lists.length*50+50}
                headerHeight={50}>
                <Column
                    header={<Cell>Course name</Cell>}
                    cell={({rowIndex, ...props}) => (
                        <Cell {...props}>
                        {this.props.lists!=undefined && this.props.lists[rowIndex].name}
                        </Cell>
      )}
                    width={300}
                    />
                <Column
                    header={<Cell>From</Cell>}
                    cell={({rowIndex, ...props}) => (
                        <Cell {...props}>
                         {this.props.lists!=undefined && this.props.lists[rowIndex].fromLanguage}
                        </Cell>)}
                    width={60}
                    />
                <Column
                    header={<Cell>To</Cell>}
                    cell={({rowIndex, ...props}) => (
                        <Cell {...props}>
                         {this.props.lists!=undefined && this.props.lists[rowIndex].toLanguage}
                        </Cell>)}
                    width={60}
                    />
                <Column
                    header={<Cell>To</Cell>}
                    cell={({rowIndex, ...props}) => (
                        <Cell {...props}>
                         {this.props.lists!=undefined && this.props.lists[rowIndex].description}
                        </Cell>)}
                    width={300}
                    />
                <Column
                    header={<Cell></Cell>}
                    cell={({rowIndex, ...props}) => (<Cell>
                         <input
                            type='submit'
                            disabled={false}
                            value={this.props.nameOfAction}
                            className='btn btn-primary'
                            onClick={()=>{browserHistory.push('/'+this.props.pagePrefix+'/'+this.props.lists[rowIndex].id);}}/>
                        </Cell>)}
                    width={300}
                    />
            </Table>
            <Pagination
                activePage={this.props.activePage}
                itemsCountPerPage={this.props.itemsCountPerPage}
                totalItemsCount={this.props.totalCount}
                pageRangeDisplayed={5}
                onChange={this.props.onChange}
            />
            </div>
            )}

}

export default ListTable;