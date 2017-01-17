import React, {Component} from 'react';
import { LearnMoreForm } from 'components';

export default class LearnMore extends Component {
  static propTypes = {
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h1>Learn More</h1>
            <LearnMoreForm />
          </div>
        </div>
      </div>
    );
  }
}
