/* eslint-disable react/prop-types */
const Country = ({ countryData }) => {
  // The Countries API takes a while to respond to a user search--our country state has an initial value of null which won't be updated by the API as quickly as the rest of the app rerenders. That means the null value will be passed to this component, so, in this case, we don't do anything but return null. This component will render with data when the Countries API call resolves.
  if (countryData === null) {
    return null;
  }

  const languages = Object.entries(countryData.languages);

  // Inline styles.
  const container = {
    display: 'flex',
    alignItems: 'center',
  };

  const languagesParagraph = {
    marginBottom: '8px',
  };

  const ul = {
    listStyleType: 'disc',
  };

  const imgStyle = {
    paddingTop: '20px',
    width: '200px',
    height: '200px',
  };

  const flag = {
    paddingLeft: '8px',
  };

  return (
    <div>
      <div style={container}>
        <h2>{countryData.name.common}</h2>
        <span style={flag}>{countryData.flag}</span>
      </div>
      <p>Its capital is {countryData.capital}. </p>
      <p>Its area is {countryData.area} square kilometers. </p>
      <div>
        <p style={languagesParagraph}>Languages spoken: </p>
        <ul style={ul}>
          {languages.map(([key, value]) => (
            <li key={key}>{value}</li>
          ))}
        </ul>
        <img
          style={imgStyle}
          src={countryData.flags.png}
          alt={countryData.flags.alt}
        />
      </div>
    </div>
  );
};

export default Country;
