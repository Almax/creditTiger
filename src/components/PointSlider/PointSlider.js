import React, {Component, PropTypes} from 'react';
import Slider from 'react-toolbox/lib/slider';
import {sliderValueChange} from 'redux/modules/filter';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const MULTIPLE_FACTOR = 100;

@connect(
  null,
  dispatch => bindActionCreators({sliderValueChange}, dispatch)
)

export default class PointSlider extends Component {
  static propTypes = {
    sliderValueChange: PropTypes.func.isRequired
  }

  state = {
    slider1: 1
  }

  handleChange = (slider, value) => {
    const {sliderValueChange} = this.props; // eslint-disable-line no-shadow

    const newState = {};
    newState[slider] = value;
    this.setState(newState);

    const multipleValue = MULTIPLE_FACTOR * value;
    sliderValueChange(multipleValue);
  }

  render() {
    return (
      <Slider pinned snaps min={1} max={10} step={1} value={this.state.slider1} onChange={this.handleChange.bind(this, 'slider1')} />
    );
  }
}

