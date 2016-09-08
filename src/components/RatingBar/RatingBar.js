import React, {Component, PropTypes} from 'react';
import ProgressBar from 'react-toolbox/lib/progress_bar';
import themeLow from '../../theme/RatingBarLow.scss';
import themeMedium from '../../theme/RatingBarMedium.scss';
import themeHigh from '../../theme/RatingBarHigh.scss';

export default class RatingBar extends Component {
  static propTypes = {
    value: PropTypes.number
  }


  render() {
    const { value } = this.props;
    let modValue = value;

    let valueTheme = '';

    if (modValue < 33) {
      valueTheme = themeLow;
    } else if (modValue > 66) {
      valueTheme = themeHigh;
    } else {
      valueTheme = themeMedium;
    }

    if (modValue < 5) {
      modValue = 5;
    }

    return (
      <ProgressBar type="linear" mode="determinate" theme={ valueTheme } value={ modValue } />
    );
  }
}

