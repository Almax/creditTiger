import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import { connect} from 'react-redux';
import { save } from 'redux/modules/learnMore';
import { bindActionCreators } from 'redux';

@connect(
  null,
  dispatch => bindActionCreators({ save }, dispatch)
)
@reduxForm({
  form: 'learnMore',
  fields: ['country', 'email']
})
export default class LearnMoreForm extends Component {
  static propTypes = {
    save: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    values: PropTypes.object
  }

  render() {
    const { save, fields: {country, email}, handleSubmit, values } = this.props; // eslint-disable-line no-shadow

    return (
      <div>
        <input type="text" className="form-control" {...country}/>
        <input type="text" className="form-control" {...email}/>
        <button className="btn btn-success"
            onClick={handleSubmit(() => save(values)
              .then(result => {
                console.log('submission result', result);
              })
            )}>
            Save
        </button>
      </div>
    );
  }
}
