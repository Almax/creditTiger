import React, { Component, PropTypes } from 'react';
// import { Card, CardTitle, CardMedia, CardText, CardActions } from 'react-toolbox/lib/card';
// import { Button } from 'react-toolbox/lib/button';
import RatingBar from '../RatingBar/RatingBar';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import { hideCard } from 'redux/modules/filter';


// @connect(
//   null,
//   dispatch => bindActionCreators({ hideCard }, dispatch)
// )

export default class CardBox extends Component {
  static propTypes = {
    card: PropTypes.object,
  //   hideCard: PropTypes.func
  }

  state = {
    mouseIsOver: false
  }

  // handleHideClick = (cardKey) => {
  //   const { hideCard } = this.props; // eslint-disable-line no-shadow
  //   hideCard(cardKey);
  // }

  handleMouseOver = () => {
    this.setState({mouseIsOver: true});
  }

  handleMouseLeave = () => {
    this.setState({mouseIsOver: false});
  }


  render() {
    const { cardKey, cardName, issuerName, curRank, curBonusVal, annualFee, curBonusPrctl, minSpendPrctl, annualFeePrctl } = this.props.card;
    const styles = require('./CardBox.scss');
    const imgUrl = require('../../images/' + cardKey + '.jpg');
    const imageStyle = {backgroundImage: 'url(' + imgUrl + ')'};

    const scores = [
      {
        name: 'Sign-up Bonus',
        percentile: curBonusPrctl
      },
      {
        name: 'Minimum Spend',
        percentile: minSpendPrctl
      },
      {
        name: 'Annual Fee',
        percentile: annualFeePrctl
      },
      {
        name: 'Earn Rate',
        percentile: curBonusPrctl
      },
      {
        name: 'Other Perks',
        percentile: minSpendPrctl
      }
    ];

    return (
      <div className="col-md-4">
        <div className={styles.card}
        onMouseEnter={this.handleMouseOver.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        >
          <div className={styles.background} style={imageStyle}></div>
          <div className={styles.background_overlay}></div>
          {!this.state.mouseIsOver &&
            <div className={styles.top}>
              <div className={styles.rank}>{ curRank }</div>
              <div className={styles.card_name}>{ cardName }</div>
              <div className={styles.issuer_name}>{ issuerName }</div>
              <div className={styles.sign_up}>Sign-up Bonus Value ${ curBonusVal }</div>
              <div className={styles.annual_fee}>Annual Fee ${ annualFee }</div>
            </div>
          }
          {this.state.mouseIsOver &&
            <div className={styles.bottom}>
              <div className={styles.header}>Scores</div>
              {scores && scores.length &&
                <div className={styles.scores_table}>
                  {scores.map((sco) => {
                    return (
                      <div className={styles.row}>
                        <div className={styles.name}>{ sco.name }</div>
                        <div className={styles.score_bar}>
                          <RatingBar value={ sco.percentile } />
                        </div>
                      </div>
                    );
                  })}
                </div>
              }
            </div>
          }
        </div>
      </div>
    );
  }
}


// <Card>
//   <CardTitle
//     title={ cardName }
//     subtitle={ issuerName }
//   />
//   <CardMedia
//     aspectRatio="wide"
//     image={ img }
//   />
//   <CardText>Bonus Rewards</CardText>
//   <RatingBar value={ curBonusPrctl } />
//   <CardText>Annual Fee</CardText>
//   <RatingBar type="linear" mode="determinate" value={ annualFeePrctl } />
//   <CardText>Minimum Spend</CardText>
//   <RatingBar type="linear" mode="determinate" value={ minSpendPrctl } />
//   <CardActions>
//     <Button label="Apply" />
//     <Button label="Details" />
//     <Button label="Hide" onMouseUp={this.handleHideClick.bind(this, cardKey)} />
//   </CardActions>
// </Card>


// <CardText>{dummyText}</CardText>
//       <Card className="col-md-4" style={{width: '280px'}}>

