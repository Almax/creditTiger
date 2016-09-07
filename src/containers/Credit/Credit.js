import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import { FteCheckbox, IssuerCheckbox, PointSlider } from 'components';

const getVisibleCards = (cards, filters) => {
  let cardsToShow = cards;
  let onlyIssuerKeysToFilter = {}; // eslint-disable-line prefer-const
  const pointMinimumFilter = filters.pointMinimumFilter;
  const onlyShowIssuer = filters.onlyShowIssuer;

  if (pointMinimumFilter > 0) {
    cardsToShow = cardsToShow.filter(ca => ca.currentBonus > pointMinimumFilter);
  }

  if (filters.noFteOnly === true) {
    cardsToShow = cardsToShow.filter(ca => ca.fte === 0.0);
  }

  for (let key in onlyShowIssuer) {  // eslint-disable-line prefer-const
    if (onlyShowIssuer[key] === true) {
      onlyIssuerKeysToFilter[key] = true;
    }
  }

  if (Object.keys(onlyIssuerKeysToFilter).length > 0) {
    cardsToShow = cardsToShow.filter(ca => onlyIssuerKeysToFilter[ca.issuer] === true);
    if (cardsToShow.length === 0) {
      cardsToShow = cards;
    }
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
        <h1>Top Credit Cards</h1>
        <Helmet title="Top Credit Cards Helmet"/>
        <h2>Filters</h2>
        <div><FteCheckbox /></div>
        {issuers && issuers.length &&
          <div>
          {issuers.map((issuer) => {
            return (
              <div><IssuerCheckbox issuerName={issuer} /></div>
            );
          })}
          </div>
        }
        <div><PointSlider multireducerKey="pointMinimumFilter1"/></div>
        {visibleCards && visibleCards.length &&
          <table className="table table-striped">
          <thead>
          <tr>
            <th>Issuer</th>
            <th>Card Name</th>
            <th>Current Bonus</th>
            <th>AF Waived</th>
          </tr>
          </thead>
          <tbody>
            {visibleCards.map((card) => {
              return (
                <tr>
                  <th>{card.issuer}</th>
                  <th>{card.cardName}</th>
                  <th>{card.currentBonus}</th>
                  <th>{card.AFWaived ? 'yes' : 'no'}</th>
                </tr>
              );
            })}
          </tbody>
        </table>}
      </div>
    );
  }
}
