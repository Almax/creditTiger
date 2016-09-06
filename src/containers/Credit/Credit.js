import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import { FteCheckbox, PointSlider } from 'components';

const getVisibleCards = (cards, filters) => {
  var cardsToShow = cards;
  const pointMinimumFilter = filters.pointMinimumFilter;

  if (pointMinimumFilter > 0) {
    cardsToShow = cardsToShow.filter(ca => ca.currentBonus > pointMinimumFilter);
  }

  if (filters.noFteOnly === true) {
    cardsToShow = cardsToShow.filter(ca => ca.fte === 0.0);
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
    cards: PropTypes.array,
    filter: PropTypes.object
  };

  render() {
    const { cards, filter } = this.props;
    const visibleCards = getVisibleCards(cards, filter);

    return (
      <div className="container">
        <h1>Top Credit Cards</h1>
        <Helmet title="Top Credit Cards Helmet"/>
        <div><FteCheckbox /></div>
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
