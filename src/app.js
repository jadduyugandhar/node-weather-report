const path = require('path');

const hbs = require('hbs');
const express = require('express');
const app = express();

app.use(express.static(path.join(__dirname, '../public')));

const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

let port = process.inv.PORT || 3002;

/*
*   Setup handlebars engine and locations.
*  
*/
app.set('view engine','hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Yugandhar'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Yugandhar'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Yugandhar',
        helpText: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
    });
});

app.get('/weather', (req, res) => {
    let address = req.query.location
    if(!address) {
        return res.send(
            {
                error: 'Please provide address'
            }
        )
    }

    geocode(address, (error, location) => {
        if(error){
            return res.send({ error });
        } else {
            forecast(location.latitude, location.longitude, (error, weather) => {
                if(error){
                    return res.send({ error });
                } else {
                    return res.send({
                        forecast: `It is currently ${weather.temperature} degree out. There is ${weather.precipIntensity}% chances of rain.`,
                        location: address
                    });
                     //console.log();
                }
            })
        }
        
    });
    
});

app.get('/help/*', (req, res) => {
    res.render("404", {
        title: '404',
        name: 'Yugandhar',
        errorMessage: 'Help article not found'
    });
});

app.get('*', (req, res) => {
    res.render("404", {
        title: '404',
        name: 'Yugandhar',
        errorMessage: 'Page Not found'
    });
});

app.listen(port, ()=>{
    console.log("server started..!");
});