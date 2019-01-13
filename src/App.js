import React, { Component } from 'react';
import { Transition } from 'react-transition-group';
import './App.css';

import { Card, CardContent, Typography } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// use electron
// window はなんなんか後で調べる
const { ipcRenderer } = window.require('electron');

let timerNum;

// Fade component
const duration = 300;
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}
const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
};
const Fade = ({ in: inProp, text: inText }) => (
  <Transition in={inProp} timeout={duration}>
    {(state) => (
      <div style={{
        ...defaultStyle,
        ...transitionStyles[state]
      }}>
        {inText}
      </div>
    )}
  </Transition>
);

// App class
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hashtag: '',
      screen_name: '',
      text: '',
      max_length: 240,
      fadeflag: false,
      execflag: false,
      twitterlogocolor: '#666666',
    };

    this.handleHashtagChange = this.handleHashtagChange.bind(this);
    this.handleMaxLengthChange = this.handleMaxLengthChange.bind(this);
    this.handleExecCheck = this.handleExecCheck.bind(this);

    ipcRenderer.on('ScreenName', (event, arg) => {
      this.setState({ screen_name: arg });
      this.setState({ fadeflag: true });
    });
    ipcRenderer.on('Text', (event, arg) => {
      this.setState({ text: arg });
      this.setState({ fadeflag: true });
    });
  };

  handleHashtagChange(event) {
    this.setState({ hashtag: event.target.value });
  };
  handleMaxLengthChange(event) {
    this.setState({ max_length: event.target.value });
  };

  handleExecCheck(event) {
    if(this.state.execflag) {
      this.setState({ execflag: false });
      this.setState({ twitterlogocolor: '#666666'})

      clearInterval(timerNum);
    } else {
      this.setState({ execflag: true });
      this.setState({ twitterlogocolor: '#00aced' });

      timerNum = setInterval(() => {
        this.setState({ fadeflag: false });
        ipcRenderer.send('Hashtag', this.state.hashtag);
      }, 5000);
    }
  };

  render() {
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
                onChange={this.handleHashtagChange}
              />
              <button
                onClick={this.handleExecCheck}
              >
                start/stop
              </button>
            </li>
            <li>
              <label className="config-label">
                Max length:
              </label>
              <input
                onChange={this.handleMaxLengthChange}
              />
              <label>
                current value : {this.state.max_length}
              </label>
            </li>
          </ul>
        </div>

        <Card className="Card">
          <CardContent>
            <Typography variant="h3">
              <FontAwesomeIcon icon={['fab', 'twitter']} color={this.state.twitterlogocolor}/> &#35; {this.state.hashtag}
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
