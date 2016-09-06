import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
import { PointSlider } from 'components';

const getVisibleCards = (cards, value) => {
  switch (value) {
    case 0:
      return cards;
    default:
      return cards.filter(ca => ca.currentBonus > value);
  }
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
    const {cards} = this.props;
    const {pointMinimumFilter} = this.props.filter;
    const visibleCards = getVisibleCards(cards, pointMinimumFilter);
    return (
      <div className="container">
        <h1>Top Credit Cards</h1>
        <Helmet title="Top Credit Cards Helmet"/>
        <PointSlider multireducerKey="pointMinimumFilter1"/>
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
