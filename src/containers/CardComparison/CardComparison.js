import _R from 'ramda';
import React, { Component, PropTypes } from 'react';
import { FilterMenu } from 'components';
import { connect } from 'react-redux';
import { RecBox } from 'components';
import { bindActionCreators } from 'redux';
import { sortCountry } from 'redux/modules/sort';
import Helmet from 'react-helmet';
import { countryNameToKey, urlNameToCountryName } from '../../helpers/Format';
import { homeUrl, flightsToUrl, howToSignUpBonus } from '../../helpers/Url';
import { Link } from 'react-router';

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
    const properCountryName = urlNameToCountryName(this.props.params.countryName);
    this.setState({
      currentCountry: properCountryName
    });
    sortCountry(this.state.currentCountry, true);
  }

  helmetTags = (countryName) => {
    const title = 'Best Travel Cards for Free Flights to ' + countryName;
    const countryKey = countryNameToKey(countryName);

    return {
      title: title,
      meta: [
        {property: 'og:image', content: `${homeUrl}/share/country/${countryKey}.jpg`},
        {property: 'og:url', content: `${homeUrl}${flightsToUrl(countryName)}`},
        {property: 'og:title', content: title},
        {property: 'og:image:width', content: '1200'},
        {property: 'og:image:height', content: '630'}
      ]
    };
  }

  render() {
    const { all } = this.props.cards;
    const { filter, routes, sort, view } = this.props;
    const possibleCards = getVisibleCards(all, filter, this.state.currentCountry, routes);

    sort.currentNumCards = possibleCards.length;
    const numCardsToShow = 5;
    const visibleCards = possibleCards.slice(0, numCardsToShow);

    const styles = require('./CardComparison.scss');
    const pencil = require('./pencil.png');

    const addnFilterClass = view.showFilterMenu ? '' : ' ' + styles.hide_col;
    const addnResultsClass = view.showFilterMenu ? ' ' + styles.hide_col : '';

    return (
      <div>
        <Helmet {...this.helmetTags(this.state.currentCountry)}/>
        <div className={styles.card_comparison + ' container-fluid'}>
          <div className="row">
            <div className={styles.filter_menu + addnFilterClass + ' col-xs-12 col-sm-3 col-md-2'}>
              <FilterMenu country={this.state.currentCountry}/>
            </div>
            <div className={styles.card_results + addnResultsClass + ' col-xs-12 col-sm-9 col-md-10'}>
              <div className={styles.cardListHelper + ' text-center'}>
                <span>Here are the best combinations of credits cards, flight routes, and redemption methods to get you to your destination.</span>
              </div>
              <div className={styles.cardListHowTo + ' text-center'}>
                <Link to={howToSignUpBonus()}>
                  <span>How do Sign-Up Bonuses work?</span>
                </Link>
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
                    Showing {numCardsToShow} of {sort.currentNumCards} cards
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
