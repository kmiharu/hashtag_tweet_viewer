import React, { Component } from 'react';
import { Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

// When use app module on renderer process, Will use remote.app module.
const { remote, ipcRenderer } = window.require('electron');

let ngwords;

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

    this.readRequestNGwords = this.readRequestNGwords.bind();
    this.saveRequestNGwords = this.saveRequestNGwords.bind();

    //console.log(remote.app.getPath('userData') + SEP_PATH + 'hogefile');

    ipcRenderer.on('dataNGwords', (arg) => {
      ngwords = arg;
    });
  }

  // TODO:
  // NG words, Read request.
  readRequestNGwords(){
    ipcRenderer.send('readNGwords');
  };

  // TODO:
  // NG words, Save request.
  saveRequestNGwords(){
    ipcRenderer.send('saveNGwords');
  };

  render(){
    return(
      <div>
        <h1>NG words.</h1>
        <button onClick={this.readRequestNGwords}>read</button>
        <button onClick={this.saveRequestNGwords}>save</button>
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