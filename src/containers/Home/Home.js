import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { CardBox, IssuerCheckbox, PointSlider } from 'components';
import { ContinentSortCheckbox, AnnualFeeCheckbox, FteCheckbox } from 'components';

const getVisibleCards = (cards, filters, sort) => {
  let cardsToShow = cards;
  let onlyIssuerKeysToFilter = {}; // eslint-disable-line prefer-const

  const { pointMinimumFilter, onlyShowIssuer, hiddenCardKeys} = filters;

  if (Object.keys(hiddenCardKeys).length) {
    cardsToShow = cardsToShow.filter(ca => !hiddenCardKeys.hasOwnProperty(ca.cardKey));
  }

  if (pointMinimumFilter > 0) {
    cardsToShow = cardsToShow.filter(ca => ca.curBonusVal >= pointMinimumFilter);
  }

  if (filters.noFteOnly === true) {
    cardsToShow = cardsToShow.filter(ca => ca.ftf === 0.0);
  }

  if (filters.noAnnualFeeOnly === true) {
    cardsToShow = cardsToShow.filter(ca => ca.annualFee === 0.0 || ca.annualFeeWaived === true);
  }

  for (let key in onlyShowIssuer) {  // eslint-disable-line prefer-const
    if (onlyShowIssuer[key] === true) {
      onlyIssuerKeysToFilter[key] = true;
    }
  }

  if (Object.keys(onlyIssuerKeysToFilter).length > 0) {
    cardsToShow = cardsToShow.filter(ca => onlyIssuerKeysToFilter[ca.issuerName] === true);
  }

  console.log('sort', sort);

  console.log('sort.sortType', sort.sortType);

  if (sort.sortType === 'SET_CONTINENT') {
    cardsToShow.sort((ca, cb) => { return (ca.overallRank - cb.overallRank);});
  } else {
    cardsToShow.sort((ca, cb) => { return (cb.overallRank - ca.overallRank);});
  }

  cardsToShow.forEach((ca, ind) => { ca.curRank = ind + 1; });

  return cardsToShow;
};

@connect(
  state => (
    {
      cards: state.cards,
      filter: state.filter,
      sort: state.sort
    }
  )
)

export default class Credit extends Component {
  static propTypes = {
    cards: PropTypes.object,
    filter: PropTypes.object,
    sort: PropTypes.object
  };

  render() {
    const { all, issuers } = this.props.cards;
    const { filter } = this.props;
    const { sort } = this.props;
    const visibleCards = getVisibleCards(all, filter, sort);

    return (
      <div className="container-fluid">
        <div className="col-md-2">
          <h2>Sort</h2>
          <div>Overall</div>
          <div><ContinentSortCheckbox label="Best for Free Trips to Asia" continentName="Asia" /></div>
          <div>Best for Free Trips to Europe</div>
          <h2>Filters</h2>
          <h3>Fees</h3>
          <div><FteCheckbox /></div>
          <div><AnnualFeeCheckbox /></div>
          <h3>Issuers</h3>
          {issuers && issuers.length &&
            <div>
            {issuers.map((issuer) => {
              return (
                <div><IssuerCheckbox issuerName={issuer} /></div>
              );
            })}
            </div>
          }
          <h3>Reward Value</h3>
          <div><PointSlider multireducerKey="pointMinimumFilter1"/></div>
        </div>
        <div className="col-md-10">
          {visibleCards && visibleCards.length &&
            <div>
              {visibleCards.map((card) => {
                return (
                  <CardBox card={card} />
                );
              })}
            </div>
          }
        </div>
      </div>
    );
  }
}
