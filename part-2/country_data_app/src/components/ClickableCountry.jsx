/* eslint-disable react/prop-types */
import Country from './Country';

const ClickableCountry = ({ country, isShown, onClick }) => {
  return (
    <li>
      {country}
      <button onClick={onClick}>{isShown ? 'show' : 'hide'}</button>
    </li>
  );
};

export default ClickableCountry;
