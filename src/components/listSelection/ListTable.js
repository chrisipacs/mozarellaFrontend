/**
 * Created by krisztian on 24/09/16.
 */
import React, {PropTypes}  from 'react';
import ReactDOM from 'react-dom';
import {Table, Column, Cell} from 'fixed-data-table';
import '../../../node_modules/fixed-data-table/dist/fixed-data-table.css';
import {browserHistory} from 'react-router';
import Pagination from 'react-js-pagination';
import * as constants from './listTableConstants';

    class ListTable extends React.Component {
        constructor(props, context) {
            super(props, context);

            let  sumCallback = ( pre, cur ) => {return pre+cur};

        }

        render(){
            return (
        <div>
            <Table
                rowHeight={constants.rowHeight}
                rowsCount={this.props.lists == undefined ? 0 : this.props.lists.length}
                width={970}
                height={this.props.lists == undefined ? 0 : (this.props.lists.length*constants.rowHeight+constants.headerHeight)+3}
                headerHeight={constants.headerHeight}>
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
                         {this.props.lists!=undefined && this.props.lists[rowIndex].fromLanguageCode}
                        </Cell>)}
                    width={60}
                    />
                <Column
                    header={<Cell>To</Cell>}
                    cell={({rowIndex, ...props}) => (
                        <Cell {...props}>
                         {this.props.lists!=undefined && this.props.lists[rowIndex].toLanguageCode}
                        </Cell>)}
                    width={60}
                    />
                <Column
                    header={<Cell>Description</Cell>}
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
                width={100}
                />
                {this.props.column6 && <Column
                    header={<Cell></Cell>}
                    cell={({rowIndex, ...props}) => (<Cell>
                         {React.cloneElement(this.props.column6,{rowIndex,list:this.props.lists[rowIndex]})}
                        </Cell>)}
                    width={150}
                    />}
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