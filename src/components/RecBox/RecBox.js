import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hideCard } from 'redux/modules/filter';
import { CardBox, CardBoxRoute } from 'components';

@connect(
  state => ({sort: state.sort}),
  dispatch => bindActionCreators({ hideCard }, dispatch)
)

export default class RecBox extends Component {
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
    const { curRank, signupUrl } = this.props.card;
    const styles = require('./RecBox.scss');

    return (
      <div className="col-sm-6 col-md-4">
        <div className={styles.recommend_title}>
          <h4>{this.recommendTitleName(curRank)} Recommendation</h4>
        </div>
        <CardBox card={this.props.card} />
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

