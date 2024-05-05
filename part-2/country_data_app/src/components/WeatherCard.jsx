/* eslint-disable react/prop-types */
const WeatherCard = ({ countryName, capitalName, capitalWeather }) => {
  return capitalWeather.isMissing ? (
    <div style={{ marginTop: '20px', fontWeight: 'bold' }}>
      {capitalWeather.message}
    </div>
  ) : (
    <div>
      <h3>
        Current weather in {countryName}&apos;s capital, {capitalName}:
      </h3>
      <div>
        The temperature is {Math.round(capitalWeather.main.temp)}&deg;
        Fahrenheit, with a wind speed of {Math.round(capitalWeather.wind.speed)}{' '}
        miles per hour.
      </div>
      <br />
      <div>
        Description: {capitalWeather.weather[0].description.toUpperCase()}
      </div>
      <img
        src={`https://openweathermap.org/img/wn/${capitalWeather.weather[0].icon}@4x.png`}
        alt={`A graphic illustrating the weather description: ${capitalWeather.weather[0].description.toUpperCase()}`}
      />
    </div>
  );
};

export default WeatherCard;
