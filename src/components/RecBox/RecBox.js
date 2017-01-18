import _R from 'ramda';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import { LearnMoreModal, RedemptionDesc } from 'components';

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

    const { cardKey, cardName, issuerName, curBonusVal, annualFee, annualFeeWaived } = this.props.card;
    const imgUrl = require('../../images/' + cardKey + '.jpg');
    const imgPlane = require('./plane_black.png');

    // FIX this!
    const { card } = this.props;
    this.updateRoutes();
    const route = card.routesUniqAirport[this.state.routeNum];
    const countryName = route.arrivingAirportDetails.countryName;
    const onewayRedeemPerc = route.isCashRoute ? route.cashRedeemPerc : route.awardRedeemPerc;
    const floorNumRoundTrips = Math.floor(onewayRedeemPerc * 10 / 5 / 2) * 0.5;

    const annualFeeStr = annualFeeWaived ? '*' : '';

    const moreOptions = 'More Options';

    return (
      <div className={styles.rec_box}>
        <div className={styles.card}>
          <div className={styles.card_header + ' row no_gutter'}>
            <div className="col-xs-4 col-sm-3 col-md-2">
              <div className={styles.card_image_box}>
                <img className={styles.card_image} src={imgUrl} width="100%" />
              </div>
            </div>
            <div className="col-xs-8 col-sm-9 col-md-7 col-lg-7">
              <div className={styles.card_heading_box}>
                <h4>{ cardName }</h4>
                <h5>{ issuerName }</h5>
              </div>
            </div>
            <div className="hidden-xs hidden-sm col-md-3 col-lg-3">
              <div className={styles.buttons_lg}>
                <div className={'btn btn-default full_width text-uppercase'} onClick={this.handleNextRouteClick.bind(this)}>{moreOptions}</div>
              </div>
            </div>
          </div>
          <div className={styles.separatorLine}></div>
          <div className={styles.route_highlights + ' row no_gutter'}>
            <div className="col-xs-4 col-sm-3 col-md-2 text-center">
              <div className={styles.route_stat}>{ floorNumRoundTrips }x</div>
              <div className={styles.route_subtext}>Round Trips</div>
            </div>
            <div className="col-xs-4 col-sm-3 col-md-2 text-center">
              <div className={styles.route_stat}>{numeral(curBonusVal).format('$(0,0)')}</div>
              <div className={styles.route_subtext}>Sign-up Bonus</div>
            </div>
            <div className="col-xs-4 col-sm-3 col-md-2 text-center">
              <div className={styles.route_stat}>${ annualFee + annualFeeStr}</div>
              <div className={styles.route_subtext}>Annual Fee</div>
            </div>
            <div className="col-xs-12 hidden-sm hidden-md hidden-lg">
              <div className={styles.separatorTab}></div>
            </div>
            <div className={styles.route + ' col-sm-3 text-center'}>
              <div className={styles.title + ' text-center'}>
                <img className={styles.planeInline} src={imgPlane} height="13px" />
                <h3>{route.arrivingAirportDetails.cityName}</h3>
              </div>
            </div>
            <div className={styles.redempSmall}>
              <RedemptionDesc route={route} card={card} floorTrips={floorNumRoundTrips}/>
            </div>
            <div className="hidden-xs hidden-sm col-md-3 col-lg-3">
              <div className={styles.buttons_lg}>
                <LearnMoreModal countryName={countryName} />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.card_buttons + ' row'}>
          <div className={styles.button_container + ' ' + styles.other + ' col-xs-12 col-sm-12 hidden-md hidden-lg'}>
            <div className={styles.nextRoute + ' btn btn-default full_width text-uppercase'} onClick={this.handleNextRouteClick.bind(this)}>{moreOptions}</div>
          </div>
          <div className={styles.button_container + ' col-xs-12 col-sm-12 hidden-md hidden-lg'}>
            <LearnMoreModal countryName={countryName} />
          </div>
          <div className="hidden-xs hidden-sm col-md-12 col-lg-12 ">
            <RedemptionDesc route={route} card={card} floorTrips={floorNumRoundTrips}/>
          </div>
        </div>
      </div>
    );
  }
}
