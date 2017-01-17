import React, {Component, PropTypes} from 'react';
import { AnnualFeeCheckboxes, FteCheckbox } from 'components';
import { IndexLink } from 'react-router';

export default class FilterMenu extends Component {
  static propTypes = {
    country: PropTypes.string
  }

  render() {
    const { country } = this.props;
    const styles = require('./FilterMenu.scss');
    const linkStyles = require('./LinkStyles.scss');

    return (
      <div className={styles.filters}>
        <h4>Filter Cards</h4>
        <div className={styles.filter_headers}>Current Destination</div>
        <div className={styles.destination}>
          <span className={styles.country}>
            {country}
          </span>
          <span className={styles.change}>
            <IndexLink theme={linkStyles} to="/">
              <span>Change</span>
            </IndexLink>
          </span>
        </div>
        <div className={styles.filter_headers}>Annual Fees</div>
        <div><AnnualFeeCheckboxes /></div>
        <div className={styles.filter_headers}>Foreign Transaction Fees</div>
        <div><FteCheckbox /></div>
      </div>
    );
  }
}
