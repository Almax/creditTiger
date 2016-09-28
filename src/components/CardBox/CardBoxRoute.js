import React, { Component, PropTypes } from 'react';
const styles = require('./CardBoxRoute.scss');

export default class CardBoxRoute extends Component {
  static propTypes = {
    card: PropTypes.object
  }

  state = {
    routeNum: 0
  }

  subtitle = (floorNumTrips) => {
    return (
      <div className={styles.subtitle + ' uppercase'}>
        <div>{floorNumTrips >= 1 ? floorNumTrips + ' ' : ''}Free</div>
        <div>{floorNumTrips >= 1 ? 'Roundtrip' : 'One-way'}</div>
        <div>Flight{floorNumTrips >= 1.5 ? 's ' : ' '}</div>
      </div>
    );
  }

  planeChart = (floorNumTrips) => {
    const floorTrips = Math.floor(floorNumTrips);
    const hasHalf = floorNumTrips - floorTrips >= 0.5;
    const planeGreen = require('./plane_green.png');
    const planeYellowHalf = require('./plane_yellow_half.png');

    return (
      <div className={styles.planeChart}>
        {[...Array(floorTrips)].map(() =>
          <div className={styles.planeGreen}>
            <img src={planeGreen} height="17px" />
          </div>
        )}
        {hasHalf &&
          <div className={styles.planeYellowHalf}>
            <img src={planeYellowHalf} height="17px" />
          </div>
        }
      </div>
    );
  }

  handleNextRouteClick = () => {
    let nextRoute = this.state.routeNum + 1;
    const hasNextRoute = !!this.props.card.routesForSort[nextRoute];
    nextRoute = hasNextRoute ? nextRoute : 0;

    this.setState({routeNum: nextRoute});
  }

  render() {
    const route = this.props.card.routesForSort[this.state.routeNum];
    const redeemPerc = route ? this.props.card.curBonusPts / (route.numberOfPointsReq * 2) : 0;
    const floorNumRoundTrips = Math.floor(redeemPerc * 10 / 5) * 0.5;
    const { card } = this.props;

    return (
      <div className={styles.routes}>
        <div className={styles.title + ' uppercase'}>{route.arrivingAirportDetails.cityName}</div>
        <div className={styles.subheader}>
          {this.subtitle(floorNumRoundTrips)}
          {this.planeChart(floorNumRoundTrips)}
        </div>
        <div className={styles.explanation}>After the minimum spend, you will be rewarded with <b>{card.curBonusPts} {card.rewardProvider} points</b>. If you convert those points to {route.originalPointType} miles, it is enough for <b>{floorNumRoundTrips} roundtrips to {route.arrivingAirportDetails.cityName}, {route.arrivingAirportDetails.countryName}</b> which are valued at {route.numberOfPointsReq * 2} {route.originalPointType} miles per roundtrip. (how it works)</div>
        <button className={styles.nextRoute} onClick={this.handleNextRouteClick.bind(this)}>More flights</button>
      </div>
    );
  }
}
