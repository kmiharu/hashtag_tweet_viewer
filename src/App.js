import React, { Component } from 'react';
import './App.css';
import ClassNames from 'classnames';

import Fade from './components/Fade.js';
//import Ngwords from './components/Ngwords.js';

import { Card, CardContent, Typography, FormControlLabel, Switch } from '@material-ui/core';
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
      change_color_mode_button_text: 'Light mode',

      max_length: 100,
      interval_time: 5000,

      fadeflag: false,
      execflag: false,
      colorflag: true,
      viewflag: 0,

      twitterlogocolor: '#666666',
      card_background_color: '#ffffff',
      card_text_color: '#000000'
    };

    this.handleHashtagChange = this.handleHashtagChange.bind(this);
    this.handleMaxLengthChange = this.handleMaxLengthChange.bind(this);
    this.handleExecCheck = this.handleExecCheck.bind(this);
    this.handleIntervalTime = this.handleIntervalTime.bind(this);
    this.handleChangeColorMode = this.handleChangeColorMode.bind(this);
    this.handleRenderView = this.handleRenderView.bind(this);
    // this.handleChangeRenderView = this.handleChangeRenderView.bind(this);

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
      this.setState({
        execflag: false,
        twitterlogocolor: '#666666',
        run_button_text: 'To run / 実行する'
      });

      clearInterval(timerNum);
    // start
    } else {
      this.setState({
        execflag: true,
        twitterlogocolor: '#00aced',
        run_button_text: 'Running / 実行中'
      });

      // When first push to run button, wait time. Modified.
      this.setState({ fadeflag: false });
      ipcRenderer.send('Hashtag', this.state.hashtag);

      timerNum = setInterval(() => {
        this.setState({ fadeflag: false });
        ipcRenderer.send('Hashtag', this.state.hashtag);
      }, this.state.interval_time);
    }
  };

  handleChangeColorMode(event) {
    if(this.state.colorflag) {
      // to Dark
      this.setState({
        card_background_color: '#141d26',
        card_text_color: '#ffffff',
        change_color_mode_button_text: 'Dark mode',
        colorflag: false
      });
    } else {
      // to light
      this.setState({
        card_background_color: '#ffffff',
        card_text_color: '#000000',
        change_color_mode_button_text: 'Light mode',
        colorflag: true
      });
    }
  };

  // handleChangeRenderView(flag) {
  //   this.setState({ viewflag: flag });
  // }

  // flag is Int
  handleRenderView(flag) {
    // start/stop button classNames
    const run_button_class = ClassNames({
      "running-button": this.state.execflag === true,
      "to-run-button": this.state.execflag === false
    });
    switch (flag) {
      // Main View
      case 0:
        return(
          <div>
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
                <li>
                <FormControlLabel
                  control={
                    <Switch
                      color="primary"
                      onClick={this.handleChangeColorMode}
                    />
                  }
                  label={this.state.change_color_mode_button_text}
                />
                {/* If you want to pass arg to method, use the bind function. */}
                {/* <button onClick={this.handleChangeRenderView.bind(this, 1)}>hoge</button> */}

                <button onClick={() => {
                  let data = [
                    { data: 'hoge' },
                    { data: 'fuga' }
                  ];
                  ipcRenderer.send('testData', JSON.stringify(data, null, '  '));
                }}>
                  hoge
                </button>

                </li>
              </ul>
            </div>
            <Card className="Card" style={{ backgroundColor: this.state.card_background_color }}>
              <CardContent>
                <Typography variant="h3" style={{ color: this.state.card_text_color }}>
                  <FontAwesomeIcon icon={['fab', 'twitter']} color={this.state.twitterlogocolor}/> &#35;&nbsp;{this.state.hashtag}
                </Typography>
                <Typography variant="h4" style={{ color: this.state.card_text_color, fontWeight: 'bold' }}>
                  <Fade in={ this.state.fadeflag } text={ this.state.screen_name } />
                </Typography>
                <Typography variant="h5" style={{ color: this.state.card_text_color }}>
                  <Fade in={ this.state.fadeflag } text={ this.state.text } />
                </Typography>
              </CardContent>
            </Card>
          </div>
        );

      // NG word config viwe
      case 1:
        // return(
        //   <Ngwords />
        // );
        break;
      default:
        break;
    }
  }

  render() {
    return(
      <div>
        {/* Content view */}
        { this.handleRenderView(this.state.viewflag) }
      </div>
    );
  }
}

export default App;
