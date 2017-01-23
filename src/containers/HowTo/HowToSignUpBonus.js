import React, { Component, PropTypes } from 'react';
import marked from 'marked';

const howTo = `
# How do Sign-Up Bonuses Work?

Simply put, learning how the credit card and airline points work is confusing and is a part-time job for many. To get the most out of this site or any credit card bonus, read this to the end.

### What is a sign-up bonus?

A sign-up bonus is an incentive made by banks to entice new customers. Within the travel space, they are typically:
1. Credit card points - Chase Ultimate Rewards, Amex Membership Rewards, Citi ThankYou Rewards, etc.
2. Airline points - Southwest Rapid Rewards, United MileagePlus, Alaska Mileage Plan, etc.
3. Travel credit - Reimbursement for travel spending on flights, hotels, etc.
4. Hotel stays - Free nights at hotels typically with some limitations.

### How do you get the bonus?

You must spend a certain amount of money within a set period of time to receive the bonus.

This isn't as intimidating as it might sound. For example if the minimum spend is $3,000 in 3 months, it doesn't mean that you have to spend $3,000 more than you already do. You could simply move your current spending to the new card. You could move your monthly bills, nightlife, groceries, and dining expenses to the new card. For an average American consumer that spends $1,000-$3,000 a month on their credit card, this is doable.

### Is it worth it? What's a good bonus?

It's very hard to tell what a good deal is when it comes to credit cards. This is one of the main reasons Free Travel Guy was created. Learning how rewards points work is confusing for many reasons:
1. Every credit card and airline point is worth a different amount.
2. Points can convert to each other in different ways.
3. Every airline route is a different cost in each point.
4. Banks and airlines are constantly putting new rules in place to slow people taking advantage of the system.
5. Sign-up bonuses are in constant flux. The best offers are only around for a few months.

This site is the best way to compare travel cards in the fairest way possible: Number of Free Flights.

### What kind of points are the best points?

There is no best point for everyone. It depends on what you want to use the points for. Generally bank points are more valuable because they can be converted to many different types of airline points. Airline points are typically less flexible. That said it depends on where you want to go. If you want to fly lots of intra-US flights, the Southwest cards are great. Or if you want to fly a specific Delta route, the Delta card might be great. If you just have a destination in mind, Free Travel Guy offers an apple-to-apples comparison of all the top travel cards.

### Will it hurt your credit score?

Applying for a credit card can temporarily hurt your credit score by 10-30 points but it will return back to normal levels after a few months. If you plan on buying a house in the next 3 months, it'd be better to not take on any kind of debt including a credit card. Assuming you don't abuse any of your credit lines, new credit cards should not hurt your credit score.

### Is it too good to be true?

If you know how to redeem the offer and you use the bonuses, you can absolutely receive more benefits than it costs to you. If you abuse the new credit card, it can hurt your credit score just like anything else.

### Will it cost anything?

Many travel credit cards have annual fees. With Free Travel Guy, you can filter by cards with waived or no annual fees.

### After you get the points, how do you redeem the trip?

Redeeming the trip is another confusing part of the process. Free Travel Guy has already found which sign-up bonus and redemption methods will get you the most free flights. Once you have the specific redemption method, ex. transfer 32,000 Amex Membership Rewards points to FlyingBlue points, there are already 10's of articles online for how to do the transfer.
`;

export default class HowToSignUpBonus extends Component {
  static propTypes = {
    history: PropTypes.object
  }
  render() {
    const styles = require('./HowToSignUpBonus.scss');
    return (
      <div className="container">
        <div className={styles.howTo + ' col-xs-12 col-sm-12 col-md-8 col-md-offset-2'}>
          <div dangerouslySetInnerHTML={{__html: marked(howTo)}}/>
          <div className={styles.button_container}>
            <div className={'btn btn-success full_width text-uppercase'} onClick={() => {this.props.history.goBack();}}>Okay</div>
        </div>
        </div>
      </div>
    );
  }
}
