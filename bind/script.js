import $ from 'jquery';
import { sendPayload } from './models/model';

// use jQuery ready funciton to execute hijackForm() function on DOM ready
// using jQuery ensures this function will trigger as intended on most browsers
$('document').ready(function(){
  hijackForm();
});

// this function is executed automatically on DOM ready by jQuery
// it replaces the default 'onclick' behavior for #submit_button
// with the sendData() function
function hijackForm() {
  document.getElementById('submit_button').onclick = function (event) { sendData(event) }; 
}

// this function prevents all previously bound event handlers from firing
// the payload object is obtained from the createPayload() function, then
// stringified and sent by axios to a local endpoint by way of the model
// when the promise resolves, we either redirect user or alert an error
function sendData(event) {
  event.preventDefault();
  event.stopPropagation();

  const payload = createPayload();

  sendPayload(payload)
  .then( response => {
    if (response.result && response.result == 'ok') {
      window.location.replace("/success/");
    } else {
      alert('The request failed!');
    }
  })
}

// the payload object is created from the pertinent form data
function createPayload() {
  return {
    user: {
      name: $('#user[name]').val(),
      email: $('#user[email]').val(),
      telephone: $('#user[telephone]').val()
    },
    shipping: {
      street_1: $('#address[street_1]').val(),
      street_2: $('#address[street_2]').val(),
      city: $('#address[city]').val(),
      state: $('#address[state]').text(),
      zip: $('#address[zip]').val(),
      country: "US"
    },
    session: {
      current_url: window.location.href//,
      //ip_address: ????
    }
  }
}