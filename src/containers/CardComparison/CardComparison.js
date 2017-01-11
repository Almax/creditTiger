import _R from 'ramda';
import React, { Component, PropTypes } from 'react';
import { FilterMenu } from 'components';
import { connect } from 'react-redux';
import { RecBox } from 'components';
import { bindActionCreators } from 'redux';
import { sortCountry } from 'redux/modules/sort';
import Helmet from 'react-helmet';

const getVisibleCards = (cards, filters, sort, routes) => {
  let cardsToShow = cards;
  let onlyIssuerKeysToFilter = {}; // eslint-disable-line prefer-const

  const { onlyShowIssuer, hiddenCardKeys} = filters;

  if (Object.keys(hiddenCardKeys).length) {
    cardsToShow = cardsToShow.filter(ca => !hiddenCardKeys.hasOwnProperty(ca.cardKey));
  }

  if (filters.noFteOnly === true) {
    cardsToShow = cardsToShow.filter(ca => ca.ftf === 0.0);
  }

  const allNotSame = filters.annualFeeWaivedOnly !== filters.annualFeeLess100Only || filters.annualFeeLess100Only !== filters.annualFee100MoreOnly;

  if (allNotSame) {
    cardsToShow = cardsToShow.filter((ca) => {
      let showCard = false;

      if (filters.annualFeeWaivedOnly && (ca.annualFeeWaived === true || ca.annualFee === 0)) {
        showCard = true;
      }

      if (filters.annualFeeLess100Only && ca.annualFee < 100) {
        showCard = true;
      }

      if (filters.annualFee100MoreOnly && ca.annualFee >= 100) {
        showCard = true;
      }

      return showCard;
    });
  }

  for (let key in onlyShowIssuer) {  // eslint-disable-line prefer-const
    if (onlyShowIssuer[key] === true) {
      onlyIssuerKeysToFilter[key] = true;
    }
  }

  if (Object.keys(onlyIssuerKeysToFilter).length > 0) {
    cardsToShow = cardsToShow.filter(ca => onlyIssuerKeysToFilter[ca.issuerName] === true);
  }

  if (sort.sortType === 'SET_COUNTRY') {
    const curAwardRoutes = routes.countryAwardRoutes[sort.currentCountryName];
    const curCashRoutes = routes.countryCashRoutes[sort.currentCountryName];

    const plus = (aa, bb) => aa + bb;
    const numPointsFn = ro => ro.numberOfPointsReq;
    const cashFn = ro => ro.cashReq;

    cardsToShow.forEach((ca) => {
      const rewardProviver = ca.rewardProvider;
      ca.awardRedeemPerc = 0;
      ca.cashRedeemPerc = 0;
      ca.bestRedeemPerc = 0;

      ca.awardRoutesForSort = curAwardRoutes[rewardProviver] || [];

      if (ca.canConvToCash) {
        const cashRouteList = _R.map(cashFn, curCashRoutes);
        const averageCash = _R.reduce(plus, 0, cashRouteList) / curCashRoutes.length;

        ca.cashRedeemPerc = (ca.curBonusPts * ca.travelConvRate) / averageCash;
        ca.cashRoutesForSort = curCashRoutes;
      }

      if (ca.awardRoutesForSort.length) {
        const numPointsRouteList = _R.map(numPointsFn, ca.awardRoutesForSort);
        const averageNumPoints = _R.reduce(plus, 0, numPointsRouteList) / ca.awardRoutesForSort.length;
        ca.awardRedeemPerc = ca.curBonusPts / averageNumPoints;
      }

      ca.bestRedeemPerc = ca.awardRedeemPerc > ca.cashRedeemPerc ? ca.awardRedeemPerc : ca.cashRedeemPerc;
    });

    const hasNoRoutes = ca => !ca.awardRoutesForSort.length && !ca.canConvToCash;
    cardsToShow = _R.reject(hasNoRoutes, cardsToShow);

    cardsToShow.sort((ca, cb) => { return (cb.bestRedeemPerc - ca.bestRedeemPerc);});
  } else {
    cardsToShow.sort((ca, cb) => { return (cb.overallRank - ca.overallRank);});
  }

  cardsToShow.forEach((ca, ind) => { ca.curRank = ind + 1; });

  return cardsToShow;
};

const browserSelector = ({browser}) => {
  return { browser };
};

@connect(
  state => (
    {
      cards: state.cards,
      filter: state.filter,
      sort: state.sort,
      routes: state.routes,
      view: state.view
    }
  ),
  dispatch => bindActionCreators({ sortCountry }, dispatch)
)

@connect(browserSelector)

export default class Credit extends Component {
  static propTypes = {
    cards: PropTypes.object,
    filter: PropTypes.object,
    sort: PropTypes.object,
    routes: PropTypes.object,
    params: PropTypes.object,
    sortCountry: PropTypes.func,
    browser: PropTypes.object,
    view: PropTypes.object
  };

  state = {
    largeScreen: true
  };

  componentDidMount() {
    const { browser, sortCountry } = this.props; // eslint-disable-line no-shadow
    this.state.largeScreen = browser.greaterThan.medium;

    // FIX THIS. Properly add the helper functions.
    // _S.countryNameToKey(this.props.params.countryName);

    sortCountry(this.props.params.countryName, true);
  }

  render() {
    const { all } = this.props.cards;
    const { filter, sort, routes, view } = this.props;

    const possibleCards = getVisibleCards(all, filter, sort, routes);
    sort.currentNumCards = possibleCards.length;
    const visibleCards = possibleCards.slice(0, 3);
    const styles = require('./CardComparison.scss');

    return (
      <div>
        <Helmet title={'Best Card for Free Flights to ' + this.props.params.countryName}/>
        <div className={styles.card_comparison + ' container-fluid'}>
          <div className="row">
            {(this.state.largeScreen || view.showFilterMenu) &&
              <FilterMenu />
            }
            {(this.state.largeScreen || !view.showFilterMenu) &&
              <div className="col-xs-12 col-md-10">
                <div className={styles.cardListSubHeader}>
                  <div className="row">
                    <div className="col-md-6">
                      <h3>Best Cards for Free Flights to {sort.currentCountryName}</h3>
                    </div>
                  </div>
                  <div className={styles.meta + ' row'}>
                    <div className="col-md-6">
                      Showing 3 of {sort.currentNumCards} cards
                    </div>
                    <div className={styles.view + ' col-md-6'}>
                      View: <b>Basic</b> | Detailed
                    </div>
                  </div>
                </div>
                {visibleCards && visibleCards.length &&
                  <div>
                    {visibleCards.map((card) => {
                      return (
                        <RecBox card={card} />
                      );
                    })}
                  </div>
                }
              </div>
            }
          </div>
        </div>
      </div>
    );
  }
}
