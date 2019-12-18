const express = require('express');
const app = express();

const hbs = require('hbs');
require('./hbs/helpers');

const ubicacion = require('./lugar/lugar');
const clima = require('./clima/clima');

let direccion = 'Quito';
let direccion2 = 'Guayaquil';

const getInfo = async(direccion) => {
    try {
        const coords = await ubicacion.getCiudadLatLon(direccion);
        const temp = await clima.getClima(coords.lat, coords.lon);
        return `El clima de ${ direccion } es de ${ temp } °C.`;
    } catch (e) {
        return `No se pudo determinar el clima de ${ direccion }`;

    }
}



const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

// Express HBS engine
hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs');



app.get('/', function(req, res) {

    getInfo(direccion).then(resp => {
        res.render('home', {
            ciud: resp

        });
    }).catch(error => {
        res.render('home', {
            ciud: error
        });
    });

});






app.get('/about', (req, res) => {
    //res.send('Esta es mi primera web app');
    res.render('about');
});

app.get('/home2', (req, res) => {
    //res.send('Esta es mi primera web app');
    res.render('home2');
});

app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`);
});