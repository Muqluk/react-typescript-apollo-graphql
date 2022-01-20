/*
  eslint-disable
    dot-notation
*/
import cache from './cache';

export default () => {
  const headers = {
    authorization: cache.get('ID_TOKEN'),
  };
  const additionalEmail = localStorage.getItem('additional_email');
  if (additionalEmail) {
    headers['additional_email'] = additionalEmail;
  }

  const email = localStorage.getItem('email');
  if (email) {
    headers['email'] = email;
  }

  return headers;
};
