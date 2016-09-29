import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Button } from 'react-toolbox/lib/button';

@connect(
  state => (
    {
      routes: state.routes
    }
  )
)

export default class Welcome extends Component {
  static propTypes = {
    routes: PropTypes.object
  }

  render() {
    const continentsWithCountries = this.props.routes.continentsWithCountries;
    const countries = Object.keys(continentsWithCountries);
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Where would you like a free flight?</h1>
          </div>
        </div>
        <div className="row">
          {countries.map((con) => {
            return (
              <div className="col-md-3">
                <h2>{con}</h2>
                {continentsWithCountries[con].map((cou) => {
                  return (
                    <div>{cou}</div>
                  );
                })}
                <Button href="/card_comparison">Compare Cards</Button>
              </div>
            );
          })}

        </div>
      </div>
    );
  }
}

