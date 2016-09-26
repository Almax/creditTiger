import React, { Component, PropTypes } from 'react';
import { DoughnutChart } from 'components';

export default class CardBoxRoutes extends Component {
  static propTypes = {
    card: PropTypes.object
  }

  render() {
    const styles = require('./CardBoxRoutes.scss');

    return (
      <div className={styles.routes}>
        <div className={styles.title + ' uppercase'}>Free One-Way Flight to Bangkok</div>
        <DoughnutChart />
        <div className={styles.chartBox}>65% of a round-trip flight to BKK</div>
        <div className={styles.explanation}>After the minimum spend, you will be rewarded with 100,000 AMEX Membership Rewards points. If you convert those points to AA miles, it is enough for 0.65 round-trips to Bangkok, Thailand which are valued at 30,000 AA miles per one-way. (how it works)</div>
      </div>
    );
  }
}
