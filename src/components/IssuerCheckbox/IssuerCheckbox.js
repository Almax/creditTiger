import React, {Component, PropTypes} from 'react';
import Checkbox from 'react-toolbox/lib/checkbox';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { issuerBoxChange } from 'redux/modules/filter';

@connect(
  null,
  dispatch => bindActionCreators({issuerBoxChange}, dispatch)
)

export default class IssuerCheckbox extends Component {

  static propTypes = {
    issuerBoxChange: PropTypes.func.isRequired,
    issuerName: PropTypes.string
  }

  state = {
  };

  handleChange = (field, bool) => {
    const { issuerBoxChange, issuerName } = this.props; // eslint-disable-line no-shadow

    this.setState({[field]: bool});
    issuerBoxChange(issuerName, bool);
  };

  render() {
    const { issuerName } = this.props; // eslint-disable-line no-shadow
    return (
      <Checkbox
        checked={this.state[issuerName]}
        label={issuerName}
        onChange={this.handleChange.bind(this, issuerName)}
      />
    );
  }
}

