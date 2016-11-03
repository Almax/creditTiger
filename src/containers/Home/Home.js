import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Checkbox from 'react-toolbox/lib/checkbox';

@connect(
  state => (
    {
      routes: state.routes,
      sort: state.sort
    }
  ),
  null
)

export default class Welcome extends Component {
  static propTypes = {
    routes: PropTypes.object,
    sort: PropTypes.object,
    history: PropTypes.object
  }

  handleCountryClick = (country, bool) => {
    if (bool) {
      this.props.history.push('/card_comparison/country/' + country);
    }
  }

  render() {
    const continentsWithCountries = this.props.routes.continentsWithCountries;
    const continents = Object.keys(continentsWithCountries);
    const { sort } = this.props;
    const styles = require('./Home.scss');

    return (
      <div className="container-fluid">
        <div className={styles.hero + ' row'}>
          <div className="col-md-12">
            <div className={styles.heroText}>
              <h1>Find Cards that will get you Free Flights to:</h1>
            </div>
          </div>
          <div className="col-md-2"></div>
          {continents.map((con) => {
            return (
              <div className="col-md-2">
                <div className={styles.countryBox}>
                  <h3>{con}</h3>
                  {continentsWithCountries[con].map((cou) => {
                    return (
                      <Checkbox
                        checked={sort.currentCountryName === cou}
                        label={cou}
                        onChange={this.handleCountryClick.bind(this, cou)}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div className="col-md-2"></div>
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
