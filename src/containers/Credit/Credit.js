import React, {Component, PropTypes} from 'react';
import Helmet from 'react-helmet';
import {connect} from 'react-redux';
// import {connectMultireducer} from 'multireducer';
// import {afWaived} from 'redux/modules/filter';

// @connectMultireducer(
//   {afWaived}
// )

@connect(
  state => (
    {
      cards: state.cards
    }
  )
)

export default class Credit extends Component {
  static propTypes = {
    cards: PropTypes.array
  };

  // state = {
  //   seedTable: false
  // };

  // handleToggleKitten = () => this.setState({showKitten: !this.state.showKitten});
  // seedTable = (event) => this.setState({seedTable: true});

  // componentDidMount() {
  // };

  render() {
    const {cards} = this.props;
    return (
      <div className="container">
        <h1>Top Credit Cards</h1>
        <Helmet title="Top Credit Cards Helmet"/>
        {cards && cards.length &&
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
            {cards.map((card) => {
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
