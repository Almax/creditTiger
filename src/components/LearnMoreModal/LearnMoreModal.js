import React, { Component, PropTypes } from 'react';
import Dialog from 'react-toolbox/lib/dialog';
import { LearnMoreForm } from 'components';

export default class LearnMoreModal extends Component {
  static propTypes = {
    countryName: PropTypes.string
  }

  state = {
    active: false
  };

  handleToggle = () => {
    this.setState({active: !this.state.active});
  }

  render() {
    const { countryName } = this.props;

    return (
      <div>
        <button className={'btn btn-success full_width text-uppercase'} onClick={this.handleToggle}>Learn More</button>
        <Dialog
          active={this.state.active}
          onEscKeyDown={this.handleToggle}
          onOverlayClick={this.handleToggle}
        >
          <div className="container-fluid">
            <LearnMoreForm countryName={countryName} />
          </div>
        </Dialog>
      </div>
    );
  }
}
