import _R from 'ramda';
import React, { Component, PropTypes } from 'react';
// import numeral from 'numeral';
import { connect } from 'react-redux';

@connect(
  state => ({points: state.points}),
  null
)

export default class CardBoxRoute extends Component {
  static propTypes = {
    card: PropTypes.object,
    points: PropTypes.object
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

    card.routesUniqAirport = [];
    const uniqAirports = {};

    card.allRoutesForSort.forEach((ro) => {
      const arrAirport = ro.arrivingAirportTicker;
      if (!uniqAirports[arrAirport]) {
        uniqAirports[arrAirport] = true;
        card.routesUniqAirport.push(ro);
      }
    });
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

  handleNextRouteClick = () => {
    let nextRoute = this.state.routeNum + 1;
    const hasNextRoute = !!this.props.card.routesUniqAirport[nextRoute];
    nextRoute = hasNextRoute ? nextRoute : 0;

    this.setState({routeNum: nextRoute});
  }

  render() {
    const { card } = this.props;
    const { pointPrograms } = this.props.points;

    // FIX this!
    this.updateRoutes();
    const route = card.routesUniqAirport[this.state.routeNum];
    const onewayRedeemPerc = route.isCashRoute ? route.cashRedeemPerc : route.awardRedeemPerc;
    const floorNumRoundTrips = Math.floor(onewayRedeemPerc * 10 / 5 / 2) * 0.5;
    const pointConv = route.pointConversion;
    let convRate = 1;
    const pointOriginalMeta = pointPrograms[card.rewardProvider];
    const pointTransferToMeta = pointPrograms[route.originalPointType];

    if (pointConv) {
      convRate = pointConv.rate;
    }

    return (
      <div></div>
    );
  }
}
