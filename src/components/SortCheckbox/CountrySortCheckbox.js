// deprecated?

import React, {Component, PropTypes} from 'react';
import Checkbox from 'react-toolbox/lib/checkbox';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sortCountry, unsortCountry } from 'redux/modules/sort';

@connect(
  state => ({sort: state.sort}),
  dispatch => bindActionCreators({ sortCountry, unsortCountry }, dispatch)
)

export default class CountrySortCheckbox extends Component {
  static propTypes = {
    sort: PropTypes.object,
    sortCountry: PropTypes.func.isRequired,
    unsortCountry: PropTypes.func.isRequired,
    countryName: PropTypes.string,
    label: PropTypes.string
  }


  handleChange = (bool) => {
    const { sortCountry, unsortCountry, countryName } = this.props; // eslint-disable-line no-shadow

    if (bool) {
      sortCountry(countryName, bool);
    } else {
      unsortCountry();
    }
  };

  render() {
    const { sort, countryName } = this.props;
    const currentCheck = sort.sortType === 'SET_COUNTRY' && sort.countryName === countryName;

    return (
      <div>
        <Checkbox
          checked={currentCheck}
          label={this.props.label}
          onChange={this.handleChange.bind(this)}
        />
      </div>
    );
  }
}
