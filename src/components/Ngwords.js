import React, { Component } from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

// When use app module on renderer process, Will use remote.app module.
const { remote, ipcRenderer } = window.require('electron');

// back slash or nomal slash.
// Swap synbols, After OS check.
let SEP_PATH;
if(remote.process.platform === 'win32'){
  SEP_PATH =  '\\';
} else {
  SEP_PATH = '/';
}

// static css
const styles = {
  paper: {
    marginLeft: '20px',
    marginRight: '20px'
  }
};

class Ngwords extends Component {
  constructor(props){
    super(props);

    console.log(remote.app.getPath('userData') + SEP_PATH + 'hogefile');

    // TODO:
    // listen NG words data. from Main process.
    // use ipcRenderer

    // TODO: load NG words file.
    // If file not found, Will create new file.
    // Send task to Main process.
  }

  // TODO: Reload NG words file function.
  // Use when on/off event.
  // Send task to Main process.

  // TODO: Delete a NG word function.
  // Delete a word in NG word file.
  // Send task to Main process.

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