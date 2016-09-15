import React, {Component, PropTypes} from 'react';
import { Card, CardTitle, CardMedia, CardText, CardActions } from 'react-toolbox/lib/card';
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

  handleHideClick = (cardKey) => {
    const { hideCard } = this.props; // eslint-disable-line no-shadow
    hideCard(cardKey);
  }

  render() {
    const { cardKey, cardName, issuerName, curBonusPrctl, minSpendPrctl, annualFeePrctl } = this.props.card;
    const img = require('../../images/' + cardKey + '.jpg');

    return (
      <div className="col-md-4">
        <Card>
          <CardTitle
            title={ cardName }
            subtitle={ issuerName }
          />
          <CardMedia
            aspectRatio="wide"
            image={ img }
          />
          <CardText>Bonus Rewards</CardText>
          <RatingBar value={ curBonusPrctl } />
          <CardText>Annual Fee</CardText>
          <RatingBar type="linear" mode="determinate" value={ annualFeePrctl } />
          <CardText>Minimum Spend</CardText>
          <RatingBar type="linear" mode="determinate" value={ minSpendPrctl } />
          <CardActions>
            <Button label="Apply" />
            <Button label="Details" />
            <Button label="Hide" onMouseUp={this.handleHideClick.bind(this, cardKey)} />
          </CardActions>
        </Card>
      </div>
    );
  }
}


// <CardText>{dummyText}</CardText>
//       <Card className="col-md-4" style={{width: '280px'}}>

