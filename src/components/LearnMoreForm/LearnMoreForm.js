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
    values: PropTypes.object,
    countryName: PropTypes.string,
    invalid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired
  }

  state = {
    submitSuccess: false
  }

  componentDidMount() {
    this.emailInput.focus();
  }

  handleSuccess(result) {
    console.log('success', result);
    this.setState({
      submitSuccess: true
    });
  }

  render() {
    const { save, countryName, fields: {email}, handleSubmit, // eslint-disable-line no-shadow
      values, invalid, submitting } = this.props; // eslint-disable-line no-shadow
    const styles = require('./LearnMoreForm.scss');

    const addnFormCls = this.state.submitSuccess ? ' hide' : '';
    const addnSuccessCls = this.state.submitSuccess ? '' : ' hide';

    return (
      <div className={styles.learnMoreForm + ' row no_gutter'}>
        <div className="col-md-12">
          <h4>
            <span>For more secrets on how to get free travel credit for your trip to </span>
            <span className={styles.countryNameInline}>
              {countryName}
            </span>
            <span> as well as...</span>
          </h4>
        </div>
        <div className={styles.separatorTab}></div>
        <ul>
          <li>Updates on Citi Prestige rewards changes</li>
          <li>Future reward cards for {countryName}</li>
          <li>Secret guide to maximizing your points in 2017</li>
        </ul>
        <div className={styles.separatorTab}></div>
        <div className={'col-xs-12 col-sm-6' + addnFormCls}>
          <input type="hidden" className="form-control" value={countryName}/>
          <input type="email" className={styles.email_input + ' form-control'}
            ref={(input) => { this.emailInput = input; }}
            placeholder="Enter your email" {...email}/>
        </div>
        <div className={'col-xs-12 col-sm-3 col-md-3' + addnFormCls}>
          <button className={styles.success + ' btn btn-success'}
              onClick={handleSubmit(() => save(values)
                .then(result => {
                  this.handleSuccess(result).bind(this);
                })
              )}
              disabled={invalid || submitting}>
              Yes, I want travel tips!
          </button>
        </div>
        <div className={styles.thanks + ' col-md-12 text-center' + addnSuccessCls}>
          <p>Great! We will update you soon.</p>
        </div>
      </div>
    );
  }
}
