const request  = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/4c28c81b16abad2b4b917fd6e38e65a1/${latitude},${longitude}`;
    request({ url: url, json: true}, (error, response) => {
        if(error){
            callback("some thing wrong");
        } else if(response.body.error) {
            callback("Invalid location")
        } else {
            const {temperature, precipIntensity} = response.body.currently;
            //console.log(`It is currently ${temperature} degree out. There is ${precipIntensity}% chances of rain.`);
            callback(undefined, {temperature, precipIntensity});
        }
    });
}

module.exports = forecast;