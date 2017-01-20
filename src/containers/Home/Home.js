import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

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

  static contextTypes = {
    router: PropTypes.object
  }

  handleCountryClick = (country, bool) => {
    if (bool) {
      this.context.router.push('/card_comparison/country/' + country);
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
              <h1>Find Cards that will get you Free Flights</h1>
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
                        <button className={styles.countryButton} onClick={
                          this.handleCountryClick.bind(this, cou)}>{cou}</button>
                        <img className={styles.arrowImg} src={arrowImg} />
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
                <h3>1-10 Roundtrips</h3>
                <p>depending on your destination of choice.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className={styles.valueAddCol}>
                <h3>$0</h3>
                <p>of extra spend. Unless you want cards with annual fees.</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className={styles.valueAddCol}>
                <h3>Every Country</h3>
                <p>that has an international airport.</p>
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
