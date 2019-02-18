import React, { Component } from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

const styles = {
  paper: {
    marginLeft: '20px',
    marginRight: '20px'
  }
};

class Ngwords extends Component {
  constructor(props){
    super(props);
  }

  render(){
    return(
      <div>
        <h1>NG words.</h1>
        <Paper style={styles.paper}>
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
                <TableCell>word</TableCell>
                {/* ON/OFF */}
                <TableCell>on</TableCell>
                {/* Delete button */}
                <TableCell>del</TableCell>
              </TableRow>

            </TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

export default Ngwords;