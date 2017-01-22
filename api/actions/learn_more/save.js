import _R from 'ramda';
import { mailchimp } from '../../clients/mailchimp';

export default function save(req) {
  const mailchimpListId = 'd980545431'; // FreeTravelGuy
  const countryInterestListId = 'f1fe964c05';
  const cardInterestListId = 'fba4f6cdc0';
  const mailchimpInterests = require('../../data/mailchimp.json'); // json-loader

  const country = req.body.country;
  const card = req.body.card;

  const countryObj = _R.find(_R.propEq('name', country))(mailchimpInterests.countryList);
  const cardObj = _R.find(_R.propEq('name', card))(mailchimpInterests.cardList);

  const interests = {};
  if (countryObj) {
    interests[countryObj.id] = true;
  }
  if (cardObj) {
    interests[cardObj.id] = true;
  }
  
  return new Promise((resolve, reject) => {
    mailchimp.post(`/lists/${mailchimpListId}/members`, {
      email_address: req.body.email,
      status: 'subscribed',
      interests
    }).then((results) => {
      resolve(results);
    }).catch((err) => {
      console.log('err', err);
      reject(err);
    });
  });
}
