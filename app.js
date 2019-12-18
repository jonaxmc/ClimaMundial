const { getDireccion } = require('./lugar/lugar');
const { getClima } = require('./clima/clima');

let direccion = 'Quito';

const getInfo = async(direccion) => {

    try {
        const coors = await getDireccion(direccion);
        const info = await getClima(coors.lat, coors.lng);
        return `El clima en ${coors.diraccion} es ${info.temp}`;
    } catch (error) {
        console.log(`No se pudo determinar el clima para ${direccion}`);
    }

};

getInfo(direccion)
    .then(resp => console.log(resp))
    .catch(err => console.log(err));

/* getDireccion(argv.direccion).then((result) => {
    //console.log(result);
    getClima(result.lat, result.lng).then((res) => {
        console.log(res);
    }).catch(e => {
        console.log("ERRRRRRRRRRRRROR", e);
    });
}).catch((err) => {
    console.log(`¡¡¡ERROR!!!`, err);
}); */