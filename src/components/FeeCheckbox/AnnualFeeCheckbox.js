import React, {Component, PropTypes} from 'react';
import Checkbox from 'react-toolbox/lib/checkbox';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { annualFeeChange } from 'redux/modules/filter';

@connect(
  null,
  dispatch => bindActionCreators({ annualFeeChange }, dispatch)
)

export default class AnnualFeeCheckbox extends Component {
  static propTypes = {
    annualFeeChange: PropTypes.func.isRequired,
    label: PropTypes.string
  }

  state = {
    check2: false
  };

  handleChange = (field, bool) => {
    const { annualFeeChange } = this.props; // eslint-disable-line no-shadow

    this.setState({[field]: bool});
    annualFeeChange(bool);
  };

  render() {
    return (
      <Checkbox
        checked={this.state.check2}
        label="Waived or No Annual Fee"
        onChange={this.handleChange.bind(this, 'check2')}
      />
    );
  }
}

