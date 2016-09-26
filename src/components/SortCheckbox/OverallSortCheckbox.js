import React, {Component, PropTypes} from 'react';
import Checkbox from 'react-toolbox/lib/checkbox';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { sortOverall } from 'redux/modules/sort';

@connect(
  state => ({sort: state.sort}),
  dispatch => bindActionCreators({ sortOverall }, dispatch)
)

export default class OverallSortCheckbox extends Component {
  static propTypes = {
    sort: PropTypes.object,
    sortOverall: PropTypes.func.isRequired,
    label: PropTypes.string
  }


  handleChange = () => {
    const { sortOverall } = this.props; // eslint-disable-line no-shadow

    sortOverall();
  };

  render() {
    const { sort } = this.props;
    const currentCheck = sort.sortType === 'SET_OVERALL';

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

