const Mailchimp = require('mailchimp-api-v3');
const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);
const fs = require('fs-extra');
const JSON3 = require('json3');

const OUTPUT_MAILCHIMP_JSON = './api/data/mailchimp.json';

const mailchimpListId = 'd980545431';
const countryInterestId = 'f1fe964c05';
const cardInterestId = 'fba4f6cdc0';

mailchimp.batch([
  {
    method: 'get',
    path: `/lists/${mailchimpListId}/interest-categories/${countryInterestId}/interests`
  },
  {
    method: 'get',
    path: `/lists/${mailchimpListId}/interest-categories/${cardInterestId}/interests`
  }
]).then((results) => {
  const [countryList, cardList] = results;

  const mail = {
    countryList: countryList.interests,
    cardList: cardList.interests
  }

  savedMailchimpJson = JSON3.stringify(mail, null, 2);

  fs.outputFileSync(OUTPUT_MAILCHIMP_JSON, savedMailchimpJson);
});
