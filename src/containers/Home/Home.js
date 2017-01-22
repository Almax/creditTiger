import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';
import { Link } from 'react-router';
import { flightsToUrl } from '../../helpers/Url';

@connect(
  state => (
    {
      routes: state.routes
    }
  ),
  null
)

export default class Home extends Component {
  static propTypes = {
    routes: PropTypes.object,
    history: PropTypes.object
  }

  handleCountryClick = (country, bool) => {
    if (bool) {
      ReactGA.event({
        category: 'home',
        action: 'country_clicked',
        label: country
      });
    }
  }

  render() {
    const continentsWithCountries = this.props.routes.continentsWithCountries;
    const continents = Object.keys(continentsWithCountries);
    const styles = require('./Home.scss');

    const arrowImg = require('./arrow_right.png');

    return (
      <div className="container-fluid">
        <div className={styles.hero + ' row'}>
          <div className="col-md-12">
            <div className={styles.heroText + ' text-center'}>
              <h1>Get Free Flights to Anywhere</h1>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12 text-center">
            <div className={styles.pick_destination}>
              Credit card signup bonuses can give you enough points to go anywhere. We've analyzed 1000's of credit cards, flight routes, and redemption methods to get you the most free flights to:
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xs-0 col-sm-0 col-md-2"></div>
          {continents.map((con) => {
            return (
              <div className="col-xs-12 col-sm-6 col-md-2">
                <div className={styles.countryBox + ' text-center'}>
                  <h4>{con.toUpperCase()}</h4>
                  <div className={styles.separatorTab}></div>
                  {continentsWithCountries[con].map((cou) => {
                    return (
                      <div>
                        <Link to={flightsToUrl(cou)}>
                          <button className={styles.countryButton} onClick={
                            this.handleCountryClick.bind(this, cou)}>{cou}</button>
                          <img className={styles.arrowImg} src={arrowImg} />
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div className="col-xs-0 col-sm-0 col-md-2"></div>
        </div>
        <div className={styles.valueAdds + ' row'}>
          <div className="col-md-8 col-md-offset-2">
            <div className="col-md-4">
              <div className={styles.valueAddCol}>
                <h3>Best offers to get you a free flight</h3>
                <p>Comparing rewards points is confusing. Comparing the number of free flights is simple.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className={styles.valueAddCol}>
                <h3>Every travel card compared</h3>
                <p>We have compared every major travel card in the US.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className={styles.valueAddCol}>
                <h3>Free Travel Guy is Free!</h3>
                <p>There are no charges or fees to use our service.</p>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.madeInSf + ' row'}>
          <div className="col-md-12">
            <h2>Made in San Francisco</h2>
          </div>
        </div>
      </div>
    );
  }
}
