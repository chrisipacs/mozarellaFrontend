/**
 * Created by krisztian on 24/09/16.
 */
import React, {PropTypes}  from 'react';
import ReactDOM from 'react-dom';
import {Table, Column, Cell} from 'fixed-data-table';
import '../../../node_modules/fixed-data-table/dist/fixed-data-table.css';

    class ListTable extends React.Component {
        constructor(props, context) {
            super(props, context);
        }

        render(){return (

            <Table
                rowHeight={50}
                rowsCount={this.props.lists.length}
                width={1000}
                height={5000}
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
                    cell={(<Cell>
                         <input
                            type="submit"
                            disabled={false}
                            value='View'
                            className="btn btn-primary"
                            onClick={this.props.actions.study}/>
                        </Cell>)}
                    width={300}
                    />
            </Table>)}

}

export default ListTable;