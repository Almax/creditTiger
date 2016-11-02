import React, { Component, PropTypes } from 'react';
// import { CardActions } from 'react-toolbox/lib/card';
// import RatingBar from '../RatingBar/RatingBar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hideCard } from 'redux/modules/filter';
import { CardBoxRoute } from 'components';

@connect(
  state => ({sort: state.sort}),
  dispatch => bindActionCreators({ hideCard }, dispatch)
)

export default class CardBox extends Component {
  static propTypes = {
    sort: PropTypes.object,
    card: PropTypes.object,
    hideCard: PropTypes.func
  }

  state = {
    mouseIsOver: false
  }

  handleHideClick = (cardKey) => {
    const { hideCard } = this.props; // eslint-disable-line no-shadow
    hideCard(cardKey);
  }

  handleMouseOver = () => {
    this.setState({mouseIsOver: true});
  }

  handleMouseLeave = () => {
    this.setState({mouseIsOver: false});
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
    const styles = require('./CardBox.scss');
    const imgUrl = require('../../images/' + cardKey + '.jpg');
    const imageStyle = {backgroundImage: 'url(' + imgUrl + ')'};

    // const scores = [
    //   {
    //     name: 'Sign-up Bonus',
    //     percentile: curBonusPrctl
    //   },
    //   {
    //     name: 'Minimum Spend',
    //     percentile: minSpendPrctl
    //   },
    //   {
    //     name: 'Annual Fee',
    //     percentile: annualFeePrctl
    //   },
    //   {
    //     name: 'Earn Rate',
    //     percentile: curBonusPrctl
    //   },
    //   {
    //     name: 'Other Perks',
    //     percentile: minSpendPrctl
    //   }
    // ];

    let annualFeeStr = 'Annual Fee $' + annualFee;
    if (annualFeeWaived === true) annualFeeStr += ' (waived first year)';

    return (
      <div className="col-sm-6 col-md-4">
        <div className={styles.recommend_title}>
          <h4>{this.recommendTitleName(curRank)} Recommendation</h4>
        </div>
        <div className={styles.card}
        onMouseEnter={this.handleMouseOver.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        >
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
    );
  }
}

// <div className="col-md-3">
//   <button className={styles.button + ' btn btn-default'}>Hide Card</button>
// </div>
// <div className="col-md-3">
//   <button className={styles.button + ' btn btn-default'}>Details</button>
// </div>



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
  // <CardActions>
  //   <Button label="Apply" />
  //   <Button label="Details" />
  //   <Button label="Hide" onMouseUp={this.handleHideClick.bind(this, cardKey)} />
  // </CardActions>
// </Card>


// <CardText>{dummyText}</CardText>
//       <Card className="col-md-4" style={{width: '280px'}}>

// FIX IT: Card details

// {this.state.mouseIsOver &&
//   <div className={styles.bottom}>
//     <div className={styles.header}>Scores</div>
//     {scores && scores.length &&
//       <div className={styles.scores_table}>
//         {scores.map((sco) => {
//           return (
//             <div className={styles.row}>
//               <div className={styles.name}>{ sco.name }</div>
//               <div className={styles.score_bar}>
//                 <RatingBar value={ sco.percentile } />
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     }
//     <button className={styles.hide} onClick={this.handleHideClick.bind(this, cardKey)}>Hide</button>
//   </div>
// }

