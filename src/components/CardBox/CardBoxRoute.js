import _R from 'ramda';
import React, { Component, PropTypes } from 'react';
import numeral from 'numeral';

const styles = require('./CardBoxRoute.scss');

export default class CardBoxRoute extends Component {
  static propTypes = {
    card: PropTypes.object
  }

  state = {
    routeNum: 0
  }

  updateRoutes = () => {
    const { card } = this.props;

    card.awardRoutesForSort = _R.clone(card.awardRoutesForSort);
    card.awardRoutesForSort.forEach((ro) => {
      ro.cashRedeemPerc = 0;
      ro.awardRedeemPerc = card.curBonusPts / ro.numberOfPointsReq;
    });
    card.allRoutesForSort = card.awardRoutesForSort;

    if (card.canConvToCash) {
      card.cashRoutesForSort = _R.clone(card.cashRoutesForSort);
      card.cashRoutesForSort.forEach((ro) => {
        ro.awardRedeemPerc = 0;
        ro.cashRedeemPerc = (card.curBonusPts * card.travelConvRate) / ro.cashReq;
      });

      card.allRoutesForSort = _R.concat(card.awardRoutesForSort, card.cashRoutesForSort);

      card.allRoutesForSort.forEach((ro) => {
        ro.bestRedeemPerc = ro.awardRedeemPerc > ro.cashRedeemPerc ? ro.awardRedeemPerc : ro.cashRedeemPerc;
      });

      card.allRoutesForSort.sort((ca, cb) => { return (cb.bestRedeemPerc - ca.bestRedeemPerc);});
    }
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

  planeChart = (numTrips) => {
    const floorTrips = Math.floor(numTrips);
    const hasHalf = numTrips - floorTrips >= 0.5;
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
    const hasNextRoute = !!this.props.card.allRoutesForSort[nextRoute];
    nextRoute = hasNextRoute ? nextRoute : 0;

    this.setState({routeNum: nextRoute});
  }

  render() {
    const { card } = this.props;

    // FIX this!
    this.updateRoutes();
    const route = card.allRoutesForSort[this.state.routeNum];
    const onewayRedeemPerc = route.isCashRoute ? route.cashRedeemPerc : route.awardRedeemPerc;
    const floorNumRoundTrips = Math.floor(onewayRedeemPerc * 10 / 5 / 2) * 0.5;
    const routeMilesStr = numeral(route.originalPointType).format('(0,0)');

    return (
      <div className={styles.routes}>
        <div className={styles.title + ' uppercase'}>{route.arrivingAirportDetails.cityName}</div>
        <div className={styles.subheader}>
          {this.subtitle(floorNumRoundTrips)}
          {this.planeChart(floorNumRoundTrips)}
        </div>
        <div className={styles.explanation}>After the minimum spend ({numeral(card.minSpendVal).format('($0,0)')} in {card.minSpendMonths} months), you will be rewarded with <b>{numeral(card.curBonusPts).format('(0,0)')} {card.rewardProvider} points</b>.</div>
        <br />
        {!route.isCashRoute &&
          <div>If you convert those points to {routeMilesStr} miles, it is enough for <b>{floorNumRoundTrips} roundtrips to {route.arrivingAirportDetails.cityName}, {route.arrivingAirportDetails.countryName}</b> which are valued at {route.numberOfPointsReq * 2} {routeMilesStr} miles per roundtrip. (how it works)</div>
        }
        {route.isCashRoute &&
          <div>The {card.cardName} allows you to convert to travel credit at ${card.travelConvRate} per point. You could therefore transfer all your points to {numeral(card.travelConvRate * card.curBonusPts).format('($0,0)')} in travel credit, which is enough for <b>{floorNumRoundTrips} roundtrips to {route.arrivingAirportDetails.cityName}, {route.arrivingAirportDetails.countryName}</b> which are valued at {numeral(route.cashReq * 2).format('($0,0)')} per roundtrip. (how it works)</div>
        }
        <button className={styles.nextRoute + ' btn btn-default'} onClick={this.handleNextRouteClick.bind(this)}>More flights</button>
      </div>
    );
  }
}
