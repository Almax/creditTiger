import React, {Component, PropTypes} from 'react';
import Checkbox from 'react-toolbox/lib/checkbox';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { annualFeeWaivedChange, annualFeeLess100Change, annualFee100MoreChange } from 'redux/modules/filter';

const WAIVED = 'WAIVED';
const LESS_100 = 'LESS_100';
const MORE_100 = 'MORE_100';

@connect(
  state => ({filter: state.filter}),
  dispatch => bindActionCreators({ annualFeeWaivedChange, annualFeeLess100Change, annualFee100MoreChange }, dispatch)
)

export default class AnnualFeeCheckbox extends Component {
  static propTypes = {
    filter: PropTypes.object,
    annualFeeWaivedChange: PropTypes.func.isRequired,
    annualFeeLess100Change: PropTypes.func.isRequired,
    annualFee100MoreChange: PropTypes.func.isRequired
  }

  handleChange = (field, bool) => {
    console.log('handing change', field, bool);

    const { annualFeeWaivedChange, annualFeeLess100Change, annualFee100MoreChange } = this.props; // eslint-disable-line no-shadow

    if (field === WAIVED) {
      annualFeeWaivedChange(bool);
    }

    if (field === LESS_100) {
      annualFeeLess100Change(bool);
    }

    if (field === MORE_100) {
      annualFee100MoreChange(bool);
    }
  };

  render() {
    const { filter } = this.props;

    return (
      <div>
        <Checkbox
          checked={filter.annualFeeWaivedOnly}
          label="Waived or None"
          onChange={this.handleChange.bind(this, WAIVED)}
        />
        <Checkbox
          checked={filter.annualFeeLess100Only}
          label="Less than $100"
          onChange={this.handleChange.bind(this, LESS_100)}
        />
        <Checkbox
          checked={filter.annualFee100MoreOnly}
          label="$100 or more"
          onChange={this.handleChange.bind(this, MORE_100)}
        />
      </div>
    );
  }
}

