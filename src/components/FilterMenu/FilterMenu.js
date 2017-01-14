import React, {Component, PropTypes} from 'react';
import { AnnualFeeCheckboxes, FteCheckbox } from 'components';
import { Link } from 'react-toolbox/lib/link';
import {connect} from 'react-redux';

@connect(
  state => (
    {
      sort: state.sort
    }
  ),
  null
)

export default class FilterMenu extends Component {
  static propTypes = {
    sort: PropTypes.object
  }

  render() {
    const { sort } = this.props;
    const styles = require('./FilterMenu.scss');

    return (
      <div className={styles.filters}>
        <h3>Filter Cards</h3>
        <h5>Current Destination</h5>
        <div className={styles.destination}>
          {sort.currentCountryName}
        </div>
        <Link href="/" label="Change" />
        <h5>Annual Fees</h5>
        <div><AnnualFeeCheckboxes /></div>
        <h5>Transaction Fees</h5>
        <div><FteCheckbox /></div>
      </div>
    );
  }
}
