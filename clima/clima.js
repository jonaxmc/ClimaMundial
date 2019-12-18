const axios = require('axios');

const getClima = async(lat, lng) => {
    const resp = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lng }&units=metric&appid=a05323c3a54c0a4b65f091ab7e5916ee`);
    if (resp.data.code == '400') {
        console.log(resp.data.code);
        throw new Error('No se puede obtener el clima');
    }
    const clima = resp.data.main;

    return {
        temp: clima.temp,
        tempMin: clima.temp_min,
        tempMax: clima.temp_max
    }
};

module.exports = {
    getClima
};