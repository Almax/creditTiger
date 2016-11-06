import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { CardBoxRoute } from 'components';

@connect(
  state => ({sort: state.sort}),
  null
)

export default class RecBox extends Component {
  static propTypes = {
    sort: PropTypes.object,
    card: PropTypes.object
  }

  recommendTitleName = (rank) => {
    switch (rank) {
      case (1):
        return 'Top';
      case (2):
        return '2nd';
      case (3):
        return '3rd';
      default:
        const newRank = rank + 1;
        return newRank + 'th';
    }
  }

  render() {
    const { cardKey, cardName, issuerName, curRank, curBonusVal, annualFee, annualFeeWaived, signupUrl } = this.props.card;
    const imgUrl = require('../../images/' + cardKey + '.jpg');

    let annualFeeStr = '$' + annualFee + ' Annual Fee';
    if (annualFeeWaived === true) annualFeeStr += ' (waived first year)';

    const styles = require('./RecBox.scss');

    return (
      <div className="col-sm-6 col-md-4">
        <div className={styles.recommend_title}>
          <h4>{this.recommendTitleName(curRank)} Recommendation</h4>
        </div>
        <div className={styles.rec_box_card_route}>
          <div className={styles.card}>
            <h3>{ cardName }</h3>
            <h5>{ issuerName }</h5>
            <div className="row">
              <div className="col-md-6">
                <img className="img-responsive" src={imgUrl} />
              </div>
              <div className="col-md-6">
                <div>${ curBonusVal } Sign-up Bonus Value</div>
                <div>{ annualFeeStr }</div>
              </div>
            </div>
          </div>
          {this.props.sort.sortType === 'SET_COUNTRY' &&
            <CardBoxRoute card={this.props.card} />
          }
          <div className={styles.card_buttons + ' row'}>
            <div className="col-md-4 col-md-offset-4">
              <a href={signupUrl} target="_blank">
                <button className={styles.button + ' btn btn-success'}>Apply Now</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
