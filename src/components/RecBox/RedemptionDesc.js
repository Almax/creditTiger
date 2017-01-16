import React, { Component, PropTypes } from 'react';
import numeral from 'numeral';
import { connect } from 'react-redux';

@connect(
  state => ({
    points: state.points
  }),
  null
)

export default class CardBoxRoute extends Component {
  static propTypes = {
    route: PropTypes.object,
    card: PropTypes.object,
    points: PropTypes.object,
    floorTrips: PropTypes.number
  }

  state = {
    hide: true
  }

  toggleShowDetails = () => {
    this.setState({
      hide: !this.state.hide
    });
  }

  render() {
    const styles = require('./RedemptionDesc.scss');

    const { route, card, floorTrips } = this.props;

    const pointConv = route.pointConversion;
    let convRate = 1;
    const { pointPrograms } = this.props.points;
    const pointOriginalMeta = pointPrograms[card.rewardProvider];
    const pointTransferToMeta = pointPrograms[route.originalPointType];

    if (pointConv) {
      convRate = pointConv.rate;
    }

    const addnShowDetailsCls = this.state.hide ? '' : ' hide';
    const addnDetailsCls = this.state.hide ? ' hide' : '';

    return (
      <div className={styles.redemption_desc}>
        <div className={styles.show_hide + ' ' + styles.route_show_details + addnShowDetailsCls + ' text-center'}>
          <button onClick={this.toggleShowDetails}>
            Show more details
          </button>
        </div>
        <div className={styles.route_desc + addnDetailsCls}>
          <div className={styles.explanation}>After the <i>minimum spend</i> ({numeral(card.minSpendVal).format('($0,0)')} in {card.minSpendMonths} months), you will be rewarded with <b>{numeral(card.curBonusPts).format('(0,0)')} {pointOriginalMeta.programName} {pointOriginalMeta.pointTerm}s ({pointOriginalMeta.mainAffiliate})</b>.</div>
          <br />
          {!route.isCashRoute &&
            <div>If you convert those points to {numeral(card.curBonusPts * convRate).format('(0,0)')} {pointTransferToMeta.programName} {pointTransferToMeta.pointTerm}s ({pointTransferToMeta.mainAffiliate}), it is enough for <b>{floorTrips} roundtrips to {route.arrivingAirportDetails.cityName}, {route.arrivingAirportDetails.countryName}</b> which are valued at {numeral(route.numberOfPointsReq * 2).format('(0,0)')} {route.originalPointType} miles per roundtrip.</div>
          }
          {route.isCashRoute &&
            <div>The {card.cardName} allows you to convert to travel credit at ${card.travelConvRate} per point. You could then transfer all the points to {numeral(card.travelConvRate * card.curBonusPts).format('($0,0)')} in travel credit, which is enough for <b>{floorTrips} roundtrips to {route.arrivingAirportDetails.cityName}, {route.arrivingAirportDetails.countryName}</b> which are valued at {numeral(route.cashReq * 2).format('($0,0)')} per roundtrip.</div>
          }
        </div>
        <div className={styles.show_hide + ' ' + styles.route_hide_details + addnDetailsCls + ' text-center'}>
          <button onClick={this.toggleShowDetails}>
            Show less details
          </button>
        </div>
      </div>
    );
  }
}

// <TooltipWrapper tooltip="Minimum spend is how much you need to spend to get the promotional points. You do NOT need to spend any more than you currently do. You just need to convert your current spending to the new card(s) instead of your old credit cards, debit cards, checks, and/or cash.">
