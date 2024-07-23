import { parsePhoneNumberFromString } from 'libphonenumber-js';

function formatPhoneNumber(phoneNumber, country = 'SY') {
  if(!phoneNumber) return '';
  const phone = parsePhoneNumberFromString(phoneNumber, country) || '';
  return phone ? phone.formatInternational() : phoneNumber;
}

export default formatPhoneNumber;

