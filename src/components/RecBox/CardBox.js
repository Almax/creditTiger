import React, { Component, PropTypes } from 'react';

export default class Cardbox extends Component {
  static propTypes = {
    card: PropTypes.object
  }

  render() {
    const { cardKey, cardName, issuerName, curRank, curBonusVal, annualFee, annualFeeWaived } = this.props.card;
    const imgUrl = require('../../images/' + cardKey + '.jpg');
    const imageStyle = {backgroundImage: 'url(' + imgUrl + ')'};

    let annualFeeStr = 'Annual Fee $' + annualFee;
    if (annualFeeWaived === true) annualFeeStr += ' (waived first year)';

    const styles = require('./CardBox.scss');

    return (
      <div className={styles.card}>
        <div className={styles.background} style={imageStyle}></div>
        <div className={styles.background_overlay}></div>
        <div className={styles.top}>
          <div className={styles.rank}>{ curRank }</div>
          <div className={styles.card_name}>{ cardName }</div>
          <div className={styles.issuer_name}>{ issuerName }</div>
          <div className={styles.sign_up}>Sign-up Bonus Value ${ curBonusVal }</div>
          <div className={styles.annual_fee}>{ annualFeeStr }</div>
        </div>
      </div>

    );
  }
}
