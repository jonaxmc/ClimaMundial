const axios = require('axios');


const getDireccion = async(direccion) => {
    let encodingURL = encodeURI(direccion);

    let resp = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${ encodingURL }&key=AIzaSyB0XSbnG09joT8lAbRqwrSFvkrYtUw51zI`);

    if (resp.data.status === 'ZERO_RESULTS') {
        throw new Error(`No existen resultados para la ciudad ${ direccion }`);
    }

    let location = resp.data.results[0];
    let coors = location.geometry.location;

    return {
        diraccion: location.formatted_address,
        lat: coors.lat,
        lng: coors.lng
    }

};

module.exports = {
    getDireccion
};