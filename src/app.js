const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const port = 3000;

const publicDirectoryPath = path.join(__dirname , '../public');
const viewPath = path.join(__dirname , '../templates/views')
const partialPath = path.join(__dirname , '../templates/partials');

// setup for handlebars & views path
app.set('view engine' , 'hbs');
app.set('views' , viewPath);
hbs.registerPartials(partialPath);

//set for static files path
app.use(express.static(publicDirectoryPath));

app.get('/' , (req , res) => {
    res.render('index' , {
        title : 'Weather',
        name : 'Shailesh Parab'
    });
});

app.get('/about' , (req , res) => {
    res.render('about' , {
        title : 'About',
        name : 'Shailesh Parab'
    })
});

app.get('/help' , (req , res) => {
    res.render('help' , {
        title : 'Help',
        name : 'Shailesh Parab'
    });
});

app.get('/weather' , (req ,res) => {
    if(!req.query.address){
        return res.send({
            'errormsg' : 'Kindly provide the address'
        });
    }

    let address = req.query.address;
    geocode(address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({
                'errormsg' : error
            });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    'errormsg' : error
                });
            }

            return res.send({
                'forecast' : forecastData,
                'location' : location,
                'address' : address
            });
        })
    })
});

app.get('/products' , (req , res) => {
    if(!req.query.search){
        return res.send({
            errprmsg : 'No Product Found'
        });
    }
    console.log(req.query.search);
    res.send({
        products : []
    });
});

app.get('/help/*' , (req , res) => {
    res.render('404' , {
        title : '404',
        name : 'Shailesh Parab',
        error_msg : 'Help Page Not Found'
    });
});

app.get('*' , (req , res) => {
    res.render('404' , {
        title : '404',
        name : 'Shailesh Parab',
        error_msg : 'Page Not Found'
    })
})


app.listen(port , () => {
    console.log("NodeJs Server Started!");
});