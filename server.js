const express = require('express');
const app = express();

const hbs = require('hbs');
require('./hbs/helpers');

const { getDireccion } = require('./lugar/lugar');
const { getClima } = require('./clima/clima');

let direccion = 'Quito';
let direccion2 = 'Guayaquil';

const getInfo = async(direccion) => {

    try {
        const coors = await getDireccion(direccion);
        const info = await getClima(coors.lat, coors.lng);
        return `El clima en ${coors.diraccion} es ${info.temp}`;
    } catch (error) {
        return `No se pudo determinar el clima para ${direccion}`;
    }

};



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