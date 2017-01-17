import { mailchimp } from '../../clients/mailchimp';

export default function save(req) {
  const mailchimpListId = 'd980545431'; // FreeTravelGuy
  
  // FIX THIS: Add in country
  return new Promise((resolve, reject) => {
    mailchimp.post(`/lists/${mailchimpListId}/members`, {
      email_address: req.body.email,
      status: 'subscribed' 
    }).then((results) => {
      resolve(results);
    }).catch((err) => {
      console.log('err', err);
      reject(err);
    });
  });
}
