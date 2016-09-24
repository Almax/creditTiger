import React, {Component, PropTypes} from 'react';
import Checkbox from 'react-toolbox/lib/checkbox';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
import { sortContinent } from 'redux/modules/sort';

// @connect(
//   null,
//   dispatch => bindActionCreators({ annualFeeChange }, dispatch)
// )

export default class ContinentSortCheckbox extends Component {
  static propTypes = {
    continentName: PropTypes.string,
    label: PropTypes.string
  }

  state = {
    check: false
  };

  handleChange = (bool) => {
    const { continentName } = this.props; // eslint-disable-line no-shadow

    this.setState({['check']: bool});
    sortContinent(continentName, bool);
  };

  render() {
    return (
      <div>
        <Checkbox
          checked={this.state.check}
          label={this.props.label}
          onChange={this.handleChange.bind(this)}
        />
        {this.props.continentName}
      </div>
    );
  }
}

