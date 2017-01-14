import _R from 'ramda';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { RedemptionDesc } from 'components';

// import { CardBoxRoute } from 'components';

@connect(
  state => ({
    sort: state.sort,
    points: state.points
  }),
  null
)

export default class RecBox extends Component {
  static propTypes = {
    sort: PropTypes.object,
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

  handleNextRouteClick = () => {
    let nextRoute = this.state.routeNum + 1;
    const hasNextRoute = !!this.props.card.routesUniqAirport[nextRoute];
    nextRoute = hasNextRoute ? nextRoute : 0;

    this.setState({routeNum: nextRoute});
  }

  render() {
    const styles = require('./RecBox.scss');

    const { cardKey, cardName, issuerName, curBonusVal, annualFee, annualFeeWaived, signupUrl } = this.props.card;
    const imgUrl = require('../../images/' + cardKey + '.jpg');
    const imgPlane = require('./plane_black.png');

    // FIX this!
    const { card } = this.props;
    this.updateRoutes();
    const route = card.routesUniqAirport[this.state.routeNum];
    const onewayRedeemPerc = route.isCashRoute ? route.cashRedeemPerc : route.awardRedeemPerc;
    const floorNumRoundTrips = Math.floor(onewayRedeemPerc * 10 / 5 / 2) * 0.5;

    const annualFeeStr = annualFeeWaived ? '*' : '';

    return (
      <div className={styles.rec_box}>
        <div className={styles.card}>
          <div className={styles.card_header + ' ' + styles.no_gutter + ' row'}>
            <div className="col-xs-4">
              <img className={styles.card_image} src={imgUrl} width="100px" />
            </div>
            <div className="col-xs-8">
              <div className={styles.card_heading_box}>
                <h4>{ cardName }</h4>
                <h5>{ issuerName }</h5>
              </div>
            </div>
          </div>
          <div className={styles.separatorLine}></div>
          <div className={styles.route_highlights + ' ' + styles.no_gutter + ' row'}>
            <div className="col-xs-4 text-center">
              <div className={styles.route_stat}>{ floorNumRoundTrips }x</div>
              <div className={styles.route_subtext}>Round Trips</div>
            </div>
            <div className="col-xs-4 text-center">
              <div className={styles.route_stat}>{numeral(curBonusVal).format('$(0,0)')}</div>
              <div className={styles.route_subtext}>Sign-up Bonus</div>
            </div>
            <div className="col-xs-4 text-center">
              <div className={styles.route_stat}>${ annualFee + annualFeeStr}</div>
              <div className={styles.route_subtext}>Annual Fee</div>
            </div>
          </div>
          <div className={styles.separatorTab}></div>
        </div>
        <div>
          <div className={styles.route}>
            <div className={styles.title + ' text-center'}>
              <img className={styles.planeInline} src={imgPlane} height="13px" />
              <h3>{route.arrivingAirportDetails.cityName}</h3>
            </div>
          </div>
          <RedemptionDesc route={route} card={card} floorTrips={floorNumRoundTrips}/>
          <button className={styles.nextRoute + ' btn btn-default'} onClick={this.handleNextRouteClick.bind(this)}>Other Airports</button>
        </div>
        <div className={styles.card_buttons + ' row'}>
          <div className="col-md-4 col-md-offset-4">
            <a href={signupUrl} target="_blank">
              <button className={styles.button + ' btn btn-success'}>Apply Now</button>
            </a>
          </div>
        </div>
      </div>
    );
  }
}
