import React, { Component } from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

class Ngwords extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <h1>NG words.</h1>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>NG words</TableCell>
                <TableCell>ON/OFF</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>

              {/* TODO: variable view */}
              <TableRow>
                {/* word */}
                <TableCell></TableCell>
                {/* ON/OFF */}
                <TableCell></TableCell>
                {/* Delete button */}
                <TableCell></TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default Ngwords;