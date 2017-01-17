import React, {Component, PropTypes} from 'react';
import Checkbox from 'react-toolbox/lib/checkbox';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fteBoxChange } from 'redux/modules/filter';
import { theme } from './FreeBox.scss';

@connect(
  null,
  dispatch => bindActionCreators({ fteBoxChange }, dispatch)
)

export default class FteCheckbox extends Component {
  static propTypes = {
    fteBoxChange: PropTypes.func.isRequired,
    label: PropTypes.string
  }

  state = {
    check2: false
  };

  handleChange = (field, bool) => {
    const { fteBoxChange } = this.props; // eslint-disable-line no-shadow

    this.setState({[field]: bool});
    fteBoxChange(bool);
  };

  render() {
    return (
      <Checkbox
        theme={theme}
        checked={this.state.check2}
        label="None"
        onChange={this.handleChange.bind(this, 'check2')}
      />
    );
  }
}

