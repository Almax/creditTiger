import React, {Component, PropTypes} from 'react';
import { LearnMoreForm } from 'components';
import { connect } from 'react-redux';
import _R from 'ramda';

@connect(
  state => ({
    cards: state.cards
  }),
  null
)
export default class LearnMore extends Component {
  static propTypes = {
    params: PropTypes.object,
    cards: PropTypes.object
  }

  render() {
    const { all } = this.props.cards;
    const cardKey = this.props.params.cardKey;
    const countryName = this.props.params.countryName;

    const card = _R.find(_R.propEq('cardKey', cardKey))(all);
    const signupUrl = card.signupUrl;
    const cleanUrl = signupUrl.replace(/^\/\/|^.*?:\/\//, '//');

    return (
      <div className="container-fluid">
        <LearnMoreForm countryName={countryName} />
        <div className="row no_gutter">
          <div className="col-md-12">
            <iframe src={cleanUrl} width="100%" height="2000px"></iframe>
          </div>
        </div>
      </div>
    );
  }
}
