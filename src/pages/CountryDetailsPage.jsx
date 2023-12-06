import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

function CountryDetailsPage() {
  const { countryId } = useParams();

  const [fetching, setFetching] = useState(true);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    axios
      .get(`https://ih-countries-api.herokuapp.com/countries/${countryId}`) //this returns a promise
      .then(response => {
        console.log(response.data);
        setCountry(response.data);
      });
  }, []);

  return (
    <div className='container'>
      <h1>Country Details</h1>

      {!country && <p>Loading...</p>}

      {country && (
        <div>
          <h1>France</h1>

          <table className='table'>
            <thead></thead>
            <tbody>
              <tr>
                <td style={{ width: '30%' }}>Capital</td>
                <td>{country.capital}</td>
              </tr>
              <tr>
                <td>Area</td>
                <td>
                  {country.area} km
                  <sup>2</sup>
                </td>
              </tr>
              <tr>
                <td>Borders</td>
                <td>
                  <ul style={{ listStyleType: 'none' }}>
                    {country.borders.map(border => (
                      <li>
                        <a href={`/${border}`}>{border}</a>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default CountryDetailsPage;
