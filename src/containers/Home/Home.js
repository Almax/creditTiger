import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import { CardBox, IssuerCheckbox, PointSlider } from 'components';
import { AnnualFeeCheckbox, FteCheckbox } from 'components';

const getVisibleCards = (cards, filters) => {
  let cardsToShow = cards;
  let onlyIssuerKeysToFilter = {}; // eslint-disable-line prefer-const

  const { pointMinimumFilter, onlyShowIssuer, hiddenCardKeys} = filters;

  if (Object.keys(hiddenCardKeys).length) {
    cardsToShow = cardsToShow.filter(ca => !hiddenCardKeys.hasOwnProperty(ca.cardKey));
  }

  if (pointMinimumFilter > 0) {
    cardsToShow = cardsToShow.filter(ca => ca.currentBonus >= pointMinimumFilter);
  }

  if (filters.noFteOnly === true) {
    cardsToShow = cardsToShow.filter(ca => ca.fte === 0.0);
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
    cardsToShow = cardsToShow.filter(ca => onlyIssuerKeysToFilter[ca.issuer] === true);
  }

  return cardsToShow;
};

@connect(
  state => (
    {
      cards: state.cards,
      filter: state.filter
    }
  )
)

export default class Credit extends Component {
  static propTypes = {
    cards: PropTypes.object,
    filter: PropTypes.object
  };

  render() {
    const { all, issuers } = this.props.cards;
    const { filter } = this.props;
    const visibleCards = getVisibleCards(all, filter);

    return (
      <div className="container">
        <div className="col-md-2">
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
          <h3>Rewards</h3>
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
