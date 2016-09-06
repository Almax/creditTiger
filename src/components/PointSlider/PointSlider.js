import React, {Component, PropTypes} from 'react';
import Slider from 'react-toolbox/lib/slider';
import {sliderValueChange} from 'redux/modules/filter';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

// @connectMultireducer(
//   (key, state) => ({value: state.multireducer[key].value}),
//   {sliderValueChange}
// )

@connect(
  null,
  dispatch => bindActionCreators({sliderValueChange}, dispatch)
)

export default class PointSlider extends Component {
  static propTypes = {
    sliderValueChange: PropTypes.func.isRequired
  }

  state = {
    value: 0
  }

  handleChange = (slider, value) => {
    const {sliderValueChange} = this.props; // eslint-disable-line no-shadow

    const newState = {};
    newState[slider] = value;
    this.setState(newState);
    sliderValueChange(value);
  }

  render() {
    return (
      <Slider min={0} max={100000} value={this.state.slider1} onChange={this.handleChange.bind(this, 'slider1')} />
    );
  }
}

// this.handleChange.bind(this, 'slider1')
// <Slider value={this.state.value} onChange={sliderValueChange} />
