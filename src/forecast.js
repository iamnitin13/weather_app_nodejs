require("dotenv").config();
const request = require("postman-request");

const forecast = (address, callback) => {
  const url = `${process.env.WEATHER_URL}?access_key=${process.env.ACCESS_KEY}&query=${address}`;
  request({ url, json: true }, (err, { body } = {}) => {
    const { error, location, current } = body || {};
    if (err) {
      callback(
        `Unable to connect to weather service due to ${err?.code}`,
        undefined
      );
    } else if (error) {
      callback(error.info, undefined);
    } else {
      const { name, region, country } = location;
      const { weather_descriptions, temperature, wind_speed } = current;

      const address = `${name}, ${region}, ${country}`;

      const rawData = {
        city: address,
        description: weather_descriptions.join(","),
        temp: temperature,
        wind: wind_speed,
      };
      callback(undefined, rawData);
    }
  });
};

module.exports = forecast;
