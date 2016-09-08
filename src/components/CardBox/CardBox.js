import React, {Component, PropTypes} from 'react';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import RatingBar from '../RatingBar/RatingBar';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { hideCard } from 'redux/modules/filter';

@connect(
  null,
  dispatch => bindActionCreators({ hideCard }, dispatch)
)

export default class CardBox extends Component {
  static propTypes = {
    card: PropTypes.object,
    hideCard: PropTypes.func
  }

  handleRemoveClick = (cardKey) => {
    const { hideCard } = this.props; // eslint-disable-line no-shadow
    hideCard(cardKey);
  }


  render() {
    const { cardKey, cardName, issuer, imageFullName, bonusRewardValuePerc, minSpendPerc, annualFeePerc } = this.props.card;
    const imageUrl = require('../../images/' + imageFullName);

    return (
      <Card className="col-md-3" style={{width: '280px'}}>
        <CardTitle
          title={ cardName }
          subtitle={ issuer }
        />
        <CardMedia
          aspectRatio="wide"
          image={ imageUrl }
        />
        <CardText>Bonus Rewards</CardText>
        <RatingBar value={ bonusRewardValuePerc } />
        <CardText>Annual Fee</CardText>
        <RatingBar type="linear" mode="determinate" value={ annualFeePerc } />
        <CardText>Minimum Spend</CardText>
        <RatingBar type="linear" mode="determinate" value={ minSpendPerc } />
        <CardActions>
          <Button label="Apply" />
          <Button label="Details" />
          <Button label="Hide" onMouseUp={this.handleRemoveClick.bind(this, cardKey)} />
        </CardActions>
      </Card>
    );
  }
}


// <CardText>{dummyText}</CardText>
