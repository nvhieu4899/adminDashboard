const imgur = require('imgur');


// Setting
imgur.setClientId('b531d0668df6a3b');

// Getting
imgur.getClientId();

// Saving to disk. Returns a promise.
// NOTE: path is optional. Defaults to ~/.imgur
imgur.saveClientId()
    .then(function() {
        console.log('Saved.');
    })
    .catch(function(err) {
        console.log(err.message);
    });


// Loading from disk
// NOTE: path is optional. Defaults to ~/.imgur
imgur.loadClientId()
    .then(imgur.setClientId);
//Setting
imgur.setAPIUrl('https://api.imgur.com/3/');

//If setAPIUrl() is not called, API URL is read from process.env.IMGUR_API_URL

//Getting
module.exports = imgur;