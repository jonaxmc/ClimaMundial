const express = require('express');
const app = express();

const hbs = require('hbs');
require('./hbs/helpers');

const ubicacion = require('./lugar/lugar');
const clima = require('./clima/clima');

let direccion = 'Quito';
let direccion2 = 'Guayaquil';

const getInfo = async(direccion, direccion2) => {
    try {
        const coords = await ubicacion.getCiudadLatLon(direccion);
        const temp = await clima.getClima(coords.lat, coords.lon);
        const coords2 = await ubicacion.getCiudadLatLon(direccion2);
        const temp2 = await clima.getClima(coords2.lat, coords.lon);
        return [temp, temp2];

    } catch (e) {
        return `No se pudo determinar el clima de ${ direccion }`;

    }
}

let dir1 = 'Madrid';
let dir2 = 'Paris';
const getInfo2 = async(dir1, dir2) => {
    try {
        const coords = await ubicacion.getCiudadLatLon(dir1);
        const temp = await clima.getClima(coords.lat, coords.lon);
        const coords2 = await ubicacion.getCiudadLatLon(dir2);
        const temp2 = await clima.getClima(coords2.lat, coords.lon);
        return [temp, temp2];

    } catch (e) {
        return `No se pudo determinar el clima de ${ dir1 }`;

    }
}



const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/public'));

// Express HBS engine
hbs.registerPartials(__dirname + '/views/parciales');
app.set('view engine', 'hbs');



app.get('/ecuador', function(req, res) {

    getInfo(direccion, direccion2).then(resp => {
        res.render('ecuador', {
            ciud: resp[0],
            ciud2: resp[1]

        });
    }).catch(error => {
        res.render('ecuador', {
            ciud: error
        });
    });

});


app.get('/mundo', function(req, res) {

    getInfo2(dir1, dir2).then(resp => {
        res.render('mundo', {
            c1: resp[0],
            c2: resp[1]

        });
    }).catch(error => {
        res.render('mundo', {
            c1: error
        });
    });

});





app.get('/about', (req, res) => {
    //res.send('Esta es mi primera web app');
    res.render('about');
});

app.get('/', (req, res) => {
    //res.send('Esta es mi primera web app');
    res.render('home2');
});

app.get('/mundo', (req, res) => {
    //res.send('Esta es mi primera web app');
    res.render('mundo');
});

app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`);
});