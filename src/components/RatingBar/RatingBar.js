import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';

export default class RatingBar extends Component {
  static propTypes = {
    max: PropTypes.number,
    min: PropTypes.number,
    value: PropTypes.number
  }

  static defaultProps = {
    max: 100,
    min: 0,
    value: 0
  };

  calculateRatio(value) {
    let modValue = value;
    if (modValue < 5) {
      modValue = 5;
    }

    if (modValue < this.props.min) return 0;
    if (modValue > this.props.max) return 1;
    return (modValue - this.props.min) / (this.props.max - this.props.min);
  }

  linearStyle() {
    return {
      value: {transform: `scaleX(${this.calculateRatio(this.props.value)})`}
    };
  }

  render() {
    const styles = require('./RatingBar.scss');
    const { value } = this.linearStyle();
    const colorVal = this.props.value;

    let colorStyle = '';

    if (colorVal < 33) {
      colorStyle = styles.red;
    } else if (colorVal > 66) {
      colorStyle = styles.green;
    } else {
      colorStyle = styles.amber;
    }

    return (
      <div className={styles.linear}>
        <span ref="value" className={classNames(styles.value, colorStyle)} style={value}/>
      </div>
    );
  }
}

