import _R from 'ramda';
import React, { Component, PropTypes } from 'react';
import { FilterMenu } from 'components';
import { connect } from 'react-redux';
import { RecBox } from 'components';
import { bindActionCreators } from 'redux';
import { sortCountry } from 'redux/modules/sort';
import Helmet from 'react-helmet';

const getVisibleCards = (cards, filters, country, routes) => {
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

  const curAwardRoutes = routes.countryAwardRoutes[country];
  const curCashRoutes = routes.countryCashRoutes[country];

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

  cardsToShow.forEach((ca, ind) => { ca.curRank = ind + 1; });

  return cardsToShow;
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

export default class Credit extends Component {
  static propTypes = {
    cards: PropTypes.object,
    filter: PropTypes.object,
    sort: PropTypes.object,
    routes: PropTypes.object,
    params: PropTypes.object,
    sortCountry: PropTypes.func,
    view: PropTypes.object
  };

  state = {
    currentCountry: ''
  };

  componentWillMount() {
    const { sortCountry } = this.props; // eslint-disable-line no-shadow
    this.setState({
      currentCountry: this.props.params.countryName
    });
    sortCountry(this.state.currentCountry, true);
  }

  render() {
    const { all } = this.props.cards;
    const { filter, routes, sort, view } = this.props;
    const possibleCards = getVisibleCards(all, filter, this.state.currentCountry, routes);

    sort.currentNumCards = possibleCards.length;
    const visibleCards = possibleCards.slice(0, 3);

    const styles = require('./CardComparison.scss');
    const pencil = require('./pencil.png');

    const addnFilterClass = view.showFilterMenu ? '' : ' hide';
    const addnResultsClass = view.showFilterMenu ? ' hide' : '';

    return (
      <div>
        <Helmet title={'Best Card for Free Flights to ' + this.state.currentCountry}/>
        <div className={styles.card_comparison + ' container-fluid'}>
          <div className="row">
            <div className={styles.filter_menu + addnFilterClass + ' col-xs-12 col-md-2'}>
              <FilterMenu />
            </div>
            <div className={styles.card_results + addnResultsClass + ' col-xs-12 col-md-10'}>
              <div className={styles.cardListHowTo + ' text-center'}>
                <span>How does this work?</span>
              </div>
              <div className={styles.separatorTab}></div>
              <div className={styles.cardListMainHeader}>
                <div className={styles.cardListHeading}>
                  <h4>
                    <span>Best Cards for Free Flights to </span>
                    <span className={styles.countryNameInline}>
                      {this.state.currentCountry}
                      <img className={styles.pencilInline} src={pencil} height="9px" />
                    </span>
                  </h4>
                </div>
                <div className={styles.meta + ' row'}>
                  <div className={styles.showing + ' col-md-6'}>
                    Showing 3 of {sort.currentNumCards} cards
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
          </div>
        </div>
      </div>
    );
  }
}
