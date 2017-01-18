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

  handleSuccess(result) {
    console.log('success', result);
    this.setState({
      submitSuccess: true
    });
  }

  render() {
    const { save, countryName, fields: {email}, handleSubmit, // eslint-disable-line no-shadow
      values, invalid, submitting } = this.props; // eslint-disable-line no-shadow
    const pencil = require('./pencil.png');
    const styles = require('./LearnMoreForm.scss');
    console.log('invalid, submitting', invalid, submitting);

    const addnFormCls = this.state.submitSuccess ? ' hide' : '';
    const addnSuccessCls = this.state.submitSuccess ? '' : ' hide';

    return (
      <div className={styles.learnMoreForm + ' row'}>
        <div className="col-md-12">
          <h4>
            <span>For more secrets on how to get free travel credit for your trip to </span>
            <span className={styles.countryNameInline}>
              {countryName}
              <img src={pencil} className={styles.pencilInline} height="9px" />
            </span>
          </h4>
        </div>
        <div className={styles.separatorTab}></div>
        <div className={'col-xs-12 col-sm-6' + addnFormCls}>
          <input type="hidden" className="form-control" value={countryName}/>
          <input type="email" className={styles.email_input + ' form-control'} placeholder="kellythetraveler@gmail.com" {...email}/>
        </div>
        <div className={'col-xs-12 col-sm-3 col-md-1' + addnFormCls}>
          <button className={styles.success + ' btn btn-success'}
              onClick={handleSubmit(() => save(values)
                .then(result => {
                  this.handleSuccess(result).bind(this);
                })
              )}
              disabled={invalid || submitting}>
              Save
          </button>
        </div>
        <div className={styles.thanks + ' col-md-12 text-center' + addnSuccessCls}>
          <p>Great! We will update you soon.</p>
        </div>
      </div>
    );
  }
}
