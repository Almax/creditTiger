import React, { Component, PropTypes } from 'react';
const styles = require('./CardBoxRoute.scss');

export default class CardBoxRoute extends Component {
  static propTypes = {
    card: PropTypes.object,
    routeNum: PropTypes.number
  }

  subtitle = (floorNumTrips) => {
    return (
      <div className={styles.subtitle + ' uppercase'}>
        <div>{floorNumTrips >= 1.5 ? floorNumTrips + ' ' : ''}Free</div>
        <div>{floorNumTrips === 0.5 ? 'One-way' : 'Roundtrip'}</div>
        <div>Flight{floorNumTrips >= 1.5 ? 's ' : ' '}</div>
      </div>
    );
  }

  planeChart = (floorNumTrips) => {
    const floorTrips = Math.floor(floorNumTrips);
    const hasHalf = floorNumTrips / floorTrips > 0;
    const planeGreen = require('./plane_green.png');
    const planeYellowHalf = require('./plane_yellow_half.png');

    return (
      <div className={styles.planeChart}>
        {[...Array(floorTrips)].map(() =>
          <div className={styles.planeGreen}>
            <img src={planeGreen} />
          </div>
        )}
        {hasHalf &&
          <div className={styles.planeYellowHalf}>
            <img src={planeYellowHalf} />
          </div>
        }
      </div>
    );
  }

  render() {
    const route = this.props.card.routesForSort[this.props.routeNum];
    const redeemPerc = route ? this.props.card.curBonusPts / route.numberOfPointsReq : 0;
    const floorNumTrips = Math.floor(redeemPerc * 10 / 5) * 0.5;

    return (
      <div className={styles.routes}>
        <div className={styles.title + ' uppercase'}>{route.arrivingAirportDetails.cityName}</div>
        <div className={styles.subheader}>
          {this.subtitle(floorNumTrips)}
          {this.planeChart(floorNumTrips)}
        </div>
        <div className={styles.chartBox}>65% of a round-trip flight to BKK</div>
        <div className={styles.explanation}>After the minimum spend, you will be rewarded with 100,000 AMEX Membership Rewards points. If you convert those points to AA miles, it is enough for 0.65 round-trips to Bangkok, Thailand which are valued at 30,000 AA miles per one-way. (how it works)</div>
      </div>
    );
  }
}

// <DoughnutChart redeemPerc={redeemPerc} />
