import Header from './components/Header';

const App = () => {
  return (
    <div>
      <Header title={'Country Data App'} />
      <label htmlFor="country-input">Look up countries: </label>
      <input type="text" id="country-input" />
    </div>
  );
};

export default App;
