import React, { Component, PropTypes } from 'react';

export default class CardBoxRoute extends Component {
  static propTypes = {
    card: PropTypes.object,
    routeNum: PropTypes.number
  }

  title = (numOfRoundtrips, cityName) => {
    const floorNumTrips = Math.floor(numOfRoundtrips * 10 / 5) * 0.5;
    let phrase;

    phrase += floorNumTrips >= 1.5 ? floorNumTrips + ' ' : '';
    phrase += 'Free ';
    phrase += floorNumTrips === 0.5 ? 'One-way ' : 'Roundtrip ';
    phrase += 'Flight';
    phrase += floorNumTrips >= 1.5 ? 's ' : ' ';
    phrase += 'to ' + cityName;

    return (
      phrase
    );
  }

  render() {
    const styles = require('./CardBoxRoute.scss');
    // console.log('route', route);
    const route = this.props.card.routesForSort[this.props.routeNum];
    const redeemPerc = route ? this.props.card.curBonusPts / route.numberOfPointsReq : 0;

    return (
      <div className={styles.routes}>
        <div className={styles.title + ' uppercase'}>{this.title(redeemPerc, route.arrivingAirportDetails.cityName)}</div>
        <div className={styles.chartBox}>65% of a round-trip flight to BKK</div>
        <div className={styles.explanation}>After the minimum spend, you will be rewarded with 100,000 AMEX Membership Rewards points. If you convert those points to AA miles, it is enough for 0.65 round-trips to Bangkok, Thailand which are valued at 30,000 AA miles per one-way. (how it works)</div>
      </div>
    );
  }
}

// <DoughnutChart redeemPerc={redeemPerc} />