import React, {Component} from 'react';
import { Button } from 'react-toolbox/lib/button';

export default class Welcome extends Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Where would you like a free flight?</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-md-3">
            Europe
            <Button href="/card_comparison">Compare Cards</Button>
          </div>
        </div>
      </div>
    );
  }
}

