import React, { Component } from 'react';
import './App.css';
import ClassNames from 'classnames';

import Fade from './components/Fade.js';

import { Card, CardContent, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// use electron
const { ipcRenderer } = window.require('electron');

// interval time id
let timerNum;

// App class
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hashtag: '',
      screen_name: '',
      text: '',
      run_button_text: 'To run / 実行する',
      max_length: 240,
      interval_time: 5000,
      fadeflag: false,
      execflag: false,
      twitterlogocolor: '#666666',
    };

    this.handleHashtagChange = this.handleHashtagChange.bind(this);
    this.handleMaxLengthChange = this.handleMaxLengthChange.bind(this);
    this.handleExecCheck = this.handleExecCheck.bind(this);
    this.handleIntervalTime = this.handleIntervalTime.bind(this);

    // render screen name
    ipcRenderer.on('ScreenName', (event, arg) => {
      this.setState({ screen_name: arg });
      this.setState({ fadeflag: true });
    });

    // render tweet
    ipcRenderer.on('Text', (event, arg) => {
      let value = '';
      // tweet length > set max length 
      if(arg.length > parseInt(this.state.max_length)) {
        value = arg.substring(0, this.state.max_length) + '.....';
      } else {
        value = arg;
      }

      this.setState({ text: value });
      this.setState({ fadeflag: true });
    });
  };

  handleHashtagChange(event) {
    //this.setState({ hashtag: sanitaize.encode(event.target.value) });
    this.setState({ hashtag: event.target.value });
  };
  handleMaxLengthChange(event) {
    if(event.target.value.match(/^[0-9\b]+$/)){
      this.setState({ max_length: event.target.value });
    } else {
      this.setState({ max_length: 0 })
    }
  };
  handleIntervalTime(event) {
    if(event.target.value.match(/^[0-9\b]+$/)){
      this.setState({ interval_time: event.target.value });
    } else {
      this.setState({ interval_time: 0 })
    }
  };

  handleExecCheck(event) {
    // stop
    if(this.state.execflag) {
      this.setState({ execflag: false });
      this.setState({ twitterlogocolor: '#666666'});
      this.setState({ run_button_text: 'To run / 実行する' });

      clearInterval(timerNum);
    // start
    } else {
      this.setState({ execflag: true });
      this.setState({ twitterlogocolor: '#00aced' });
      this.setState({ run_button_text: 'Running / 実行中' });

      // interval time分、初回起動時に時間がかかる問題の修正
      this.setState({ fadeflag: false });
      ipcRenderer.send('Hashtag', this.state.hashtag);

      timerNum = setInterval(() => {
        this.setState({ fadeflag: false });
        ipcRenderer.send('Hashtag', this.state.hashtag);
      }, this.state.interval_time);
    }
  };

  render() {
    // start/stop button classNames
    const run_button_class = ClassNames({
      "running-button": this.state.execflag === true,
      "to-run-button": this.state.execflag === false
    });

    return(
      <div>
        {/* config view */}
        <div>
          <ul>
            <li>
              <label className="config-label">
                Hashtag:
              </label>
              <input
                onChange={this.handleHashtagChange} disabled={this.state.execflag}
              />
              <button
                className={run_button_class}
                onClick={this.handleExecCheck}
              >
                {this.state.run_button_text}
              </button>
            </li>
            <li>
              <label className="config-label">
                Max length:
              </label>
              <input
                onChange={this.handleMaxLengthChange} disabled={this.state.execflag}
              />
              <label>
                current value : {this.state.max_length}
              </label>
            </li>
            <li>
              <label className="config-label">
                Interval time:
              </label>
              <input
                onChange={this.handleIntervalTime} disabled={this.state.execflag}
              />
              <label>
                current value : {this.state.interval_time} millisecond
              </label>
            </li>
          </ul>
        </div>

        <Card className="Card">
          <CardContent>
            <Typography variant="h3">
              <FontAwesomeIcon icon={['fab', 'twitter']} color={this.state.twitterlogocolor}/> &#35;&nbsp;{this.state.hashtag}
            </Typography>
            <Typography variant="h4">
              <Fade in={ this.state.fadeflag } text={ this.state.screen_name } />
            </Typography>
            <Typography variant="h5">
              <Fade in={ this.state.fadeflag } text={ this.state.text } />
            </Typography>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default App;
