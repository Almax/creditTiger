import React, {Component, PropTypes} from 'react';
import Checkbox from 'react-toolbox/lib/checkbox';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sortContinent, unsortContinent } from 'redux/modules/sort';

@connect(
  state => ({sort: state.sort}),
  dispatch => bindActionCreators({ sortContinent, unsortContinent }, dispatch)
)

export default class ContinentSortCheckbox extends Component {
  static propTypes = {
    sort: PropTypes.object,
    sortContinent: PropTypes.func.isRequired,
    unsortContinent: PropTypes.func.isRequired,
    continentName: PropTypes.string,
    label: PropTypes.string
  }


  handleChange = (bool) => {
    const { sortContinent, unsortContinent, continentName } = this.props; // eslint-disable-line no-shadow

    if (bool) {
      sortContinent(continentName, bool);
    } else {
      unsortContinent();
    }
  };

  render() {
    const { sort, continentName } = this.props;
    const currentCheck = sort.sortType === 'SET_CONTINENT' && sort.continentName === continentName;

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

