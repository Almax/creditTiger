import React, { Component, PropTypes } from 'react';
import Dialog from 'react-toolbox/lib/dialog';
import { LearnMoreForm } from 'components';
import ReactGA from 'react-ga';

export default class LearnMoreModal extends Component {
  static propTypes = {
    card: PropTypes.object,
    countryName: PropTypes.string
  }

  state = {
    active: false
  };

  handleToggle = () => {
    this.setState({active: !this.state.active});
  }

  handleClick = (cardKey, countryName) => {
    ReactGA.modalview(`/learn_more/${countryName}/${cardKey}`);
    ReactGA.event({
      category: 'card_comparison',
      action: 'learn_more_clicked',
      label: `${countryName}/${cardKey}`
    });
    this.handleToggle();
  }

  render() {
    const { card, countryName } = this.props;
    const cardKey = card.cardKey;

    return (
      <div>
        <button className={'btn btn-success full_width text-uppercase'} onClick={() => this.handleClick(cardKey, countryName)}>Learn More</button>
        <Dialog
          active={this.state.active}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
        >
          <div className="container-fluid">
            <LearnMoreForm card={card} countryName={countryName} />
          </div>
        </Dialog>
      </div>
    );
  }
}
