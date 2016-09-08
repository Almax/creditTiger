import React, {Component, PropTypes} from 'react';
import config from '../../config';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import { CardBox, FteCheckbox, IssuerCheckbox, PointSlider } from 'components';

const getVisibleCards = (cards, filters) => {
  let cardsToShow = cards;
  let onlyIssuerKeysToFilter = {}; // eslint-disable-line prefer-const
  const pointMinimumFilter = filters.pointMinimumFilter;
  const onlyShowIssuer = filters.onlyShowIssuer;

  if (pointMinimumFilter > 0) {
    cardsToShow = cardsToShow.filter(ca => ca.currentBonus >= pointMinimumFilter);
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
