import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Checkbox from 'react-toolbox/lib/checkbox';
import { sortCountry } from 'redux/modules/sort';
import { bindActionCreators } from 'redux';

@connect(
  state => (
    {
      routes: state.routes
    }
  ),
  dispatch => bindActionCreators({ sortCountry }, dispatch)
)

export default class Welcome extends Component {
  static propTypes = {
    routes: PropTypes.object,
    sortCountry: PropTypes.func
  }

  state = {
    currentCountry: ''
  }

  handleCountryClick = (country, bool) => {
    const { sortCountry } = this.props; // eslint-disable-line no-shadow
    if (bool) {
      this.setState({
        currentCountry: country
      });
      sortCountry(country, bool);
      this.props.history.push('/card_comparison');
    }
  }

  render() {
    const continentsWithCountries = this.props.routes.continentsWithCountries;
    const continents = Object.keys(continentsWithCountries);

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Where would you like a free flight?</h1>
          </div>
        </div>
        <div className="row">
          {continents.map((con) => {
            return (
              <div className="col-md-3">
                <h2>{con}</h2>
                {continentsWithCountries[con].map((cou) => {
                  return (
                    <Checkbox
                      checked={this.state.currentCountry === cou}
                      label={cou}
                      onChange={this.handleCountryClick.bind(this, cou)}
                    />
                  );
                })}
              </div>
            );
          })}

        </div>
      </div>
    );
  }
}

// <Button href="/card_comparison">Compare Cards</Button>
