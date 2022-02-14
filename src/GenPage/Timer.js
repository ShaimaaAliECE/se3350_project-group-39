import React, { Component } from 'react';

// component to display the time the user takes on a level
export default class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      display: '00.00',
      start: new Date()
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      let sec = 1000;
      let min = 60 * sec;

      let milliseconds = (new Date().getTime() - this.state.start.getTime());

      let seconds = Math.floor((milliseconds / sec) % 60);
      seconds = seconds < 10 ? '0' + seconds : seconds

      let minutes = Math.floor(milliseconds / min);
      minutes = minutes < 10 ? '0' + minutes : minutes;

      let timer = minutes + '.' + seconds;

      this.setState({ display: timer });

    }, 1000);
  }

  componentWillUnmount() {
    this.props.handleTimeChange(parseFloat(this.state.display));
    clearInterval(this.interval);
  }

  render() {
    return (
      <div style={{ fontWeight: 'bold', fontSize: 20 }}>
        {this.state.display} MINUTES
      </div>
    )
  }
}
