const request  = require('request');
const geocode = (address,  callback) => {
    const access_token = "pk.eyJ1IjoiamFkZHV5dWdhbmRoYXIiLCJhIjoiY2p6d29ianJ3MTN2ZzNjcW80bndnb2s5NCJ9.hMjtnM8HQjw6dh3PbZUj8w";
    const locationUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=${access_token}`;

    request({url: locationUrl},(error, response)=>{
        if( error ) {
            callback('There is something wrong with system..!');
        } else if(JSON.parse(response.body).features.length === 0) {
            callback("Invalid location.");
        } else {
            const responseObj = JSON.parse(response.body);
            const [ latitude, longitude] = responseObj.features[0].center;
            callback(undefined, { latitude, longitude });
        }
        
    });
}

module.exports = geocode;