import axios from 'axios';

// receives form data and POSTs it to the /hijackForm endpoint
export function sendPayload(payload) {
  return axios.post('/hijackForm', { payload });
}