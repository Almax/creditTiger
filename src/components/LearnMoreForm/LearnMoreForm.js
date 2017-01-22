import React, {Component, PropTypes} from 'react';
import { reduxForm } from 'redux-form';
import { connect} from 'react-redux';
import { save } from 'redux/modules/learnMore';
import { bindActionCreators } from 'redux';
import ReactGA from 'react-ga';

@connect(
  null,
  dispatch => bindActionCreators({ save }, dispatch)
)
@reduxForm({
  form: 'learnMore',
  fields: ['card', 'country', 'email']
})
export default class LearnMoreForm extends Component {
  static propTypes = {
    cardObj: PropTypes.object,
    save: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    values: PropTypes.object,
    countryName: PropTypes.string,
    invalid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    initialValues: PropTypes.object
  }

  state = {
    submitSuccess: false
  }

  handleSuccess(result) {
    console.log('result', result.change_this);
    ReactGA.event({
      category: 'learn_more',
      action: 'email_successfully_added'
    });
    this.setState({
      submitSuccess: true
    });
  }

  render() {
    const { cardObj, save, countryName, fields: { email }, handleSubmit, // eslint-disable-line no-shadow
      values, invalid, submitting } = this.props; // eslint-disable-line no-shadow
    const styles = require('./LearnMoreForm.scss');

    const addnFormCls = this.state.submitSuccess ? ' hide' : '';
    const addnSuccessCls = this.state.submitSuccess ? '' : ' hide';

    return (
      <div className={styles.learnMoreForm + ' row no_gutter'}>
        <div className="col-md-12">
          <h4>
            <span>For more secrets on how to get free trips to </span>
            <span className={styles.countryNameInline}>
              {countryName}
            </span>
            <span> as well as...</span>
          </h4>
        </div>
        <div className={styles.separatorTab}></div>
        <ul>
          <li>Updates on {cardObj.issuerName} {cardObj.cardName} rewards changes</li>
          <li>Future reward cards for {countryName}</li>
          <li>Secret guide to maximizing your points in 2017</li>
        </ul>
        <div className={styles.separatorTab}></div>
        <div className={'col-xs-12 col-sm-6 col-md-6' + addnFormCls}>
          <input type="email" className={styles.email_input + ' form-control'}
            placeholder="Enter your email" {...email}/>
        </div>
        <div className={'col-xs-12 col-sm-5 col-sm-offset-1 col-md-5 col-md-offset-1' + addnFormCls}>
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

