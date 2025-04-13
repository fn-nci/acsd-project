/* Author: Ailsa Prideaux-Mooney, April 2025 */

import React, { useEffect, useState } from 'react';
import '../styles/IrishInfo.scss'; // importing styles

const IrishInfo = () => {
  const [countryData, setCountryData] = useState(null);  //store ireland's country data from restcountries.com api
  const [exchangeRates, setExchangeRates] = useState(null);  //exchange rates from Exchangerate api
  const [selectedCurrency, setSelectedCurrency] = useState('USD'); //selected currency - default to USD
  const [convertedAmount, setConvertedAmount] = useState(1); //sefault to 1 euro
  const [universities, setUniversities] = useState(null); // state to store universities data
  const [news, setNews] = useState([]); //state for the news articles from the Guardian api
  const [isExpanded, setIsExpanded] = useState(false); //state to track whether the extra news is shown or not

  const exchangeRateApiKey = '05b8fd49539614b92eea35e3'; //my ExchangeRate API key
  const newsApiKey = '2d966926-c59f-4390-ac23-93b4fd2697d5'; //my Guardian API key

  //fetch country data for Ireland
  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/name/ireland?fullText=true');  //api call
        const data = await response.json();
        setCountryData(data[0]); //set countrydata as ireland - first object in the array at index 0
      } catch (error) {
        console.error('Error fetching country data:', error);  //log errors if there are any
      }
    };

    fetchCountryData();  //call the function
  }, []);  //empty array so it only runs once when component mounts

  //fetch exchange rates for Euro from ExchangeRate API
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${exchangeRateApiKey}/latest/EUR`);  //api call
        const data = await response.json();  //parse response

        if (data.result === 'success') {
          setExchangeRates(data.conversion_rates); //store conversion rates
        } else {
          console.error('Error fetching exchange rates');  //to handle api error
        }
      } catch (error) {
        console.error('Error fetching exchange rates:', error);  //log error if any
      }
    };

    fetchExchangeRates();   //call function
  }, []);  //empty array so it only runs on mount

  //fetch universities in Ireland using Hipolabs API
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch('http://universities.hipolabs.com/search?country=Ireland'); //api call
        const data = await response.json();  //parse response
        setUniversities(data); //store universities data 
      } catch (error) {
        console.error('Error fetching universities data:', error);  //log error if any
      }
    };

    fetchUniversities();  //call the function
  }, []);  //empty array - run once on component mounnt


  //fetch news about Ireland from The Guardian api
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`https://content.guardianapis.com/search?q=ireland&api-key=${newsApiKey}`);  //api call
        const data = await response.json();  //parse response
        setNews(data.response.results); //store news articles
      } catch (error) {
        console.error('Error fetching news:', error);  //log error if any
      }
    };

  fetchNews();  //call function
}, []); //empty array to fetch news once on component mount

//to toggle visibility of additional news articles
const handleToggle = () => {
  setIsExpanded(!isExpanded); //toggle the visibility of extra news - initially set to hidden
};

  //handle currency change in dropdown
  const handleCurrencyChange = (e) => {
    const currency = e.target.value;   //get selected value
    setSelectedCurrency(currency);   //update selected currency

    if (exchangeRates) {
      const conversionRate = exchangeRates[currency];   //get exchange rate
      setConvertedAmount(conversionRate); //set new converted amount
    }
  };

  //loading states for each data source
  if (!countryData) {
    return <div>Loading country data...</div>;   //wait for country data to load
  }

  if (!exchangeRates) {
    return <div>Loading exchange rates...</div>;  //wait for exchange rates to load
  }

  if (universities === null) {
    return <div>Loading universities...</div>;  //wait for universities to load
  }  


  return (
    <div className="irish-info-container">
      {/* Left Container for country data and currency exchange */}
      <div className="left-container">
        <h2>Facts about {countryData.name.common}</h2>

        {/*flag image */}
        {/* alt text for image */}
        <img
          src={countryData.flags.png}
          alt={`Flag of ${countryData.name.common}`} 
          className="flag-image"     //className to use for styling
        />
        <br/><br/>
        <p><strong>Official Name:</strong> {countryData.name.official}</p>
        <p><strong>Capital City:</strong> {countryData.capital[0]}</p>
        <p><strong>Region:</strong> {countryData.region}</p>
        <p><strong>Subregion:</strong> {countryData.subregion}</p>
        <p><strong>Population:</strong> {countryData.population.toLocaleString()}</p>
        <p><strong>Area:</strong> {countryData.area.toLocaleString()} km²</p>
        <p><strong>Languages:</strong> {Object.values(countryData.languages).join(', ')}</p>
        <p><strong>Currency:</strong> {countryData.currencies.EUR.name} ({countryData.currencies.EUR.symbol})</p>
        <p><strong>National Flower:</strong> Shamrock </p> {/*adding a line under api data*/}
        {/*shamrock image */}
        <div className="shamrock-image-container">  {/* classname for styling */}
          <img src={require('../assets/shamrock.png')} alt="Shamrock" className="shamrock-image" />
        </div>
    <br/>
        <h2>Currency Converter</h2>
        {/*currency dropdown */}
        {/* label for dropdown menu */}
        <label htmlFor="currency-select">Choose a currency:</label>  
        {/* label id, input value from state, update selected currency */}
        <select id="currency-select" value={selectedCurrency} onChange={handleCurrencyChange}> 
          {/* iterate thru exchange rates */}
           {/* create option for each currency code */}
          {Object.keys(exchangeRates).map((currencyCode) => (   
            <option key={currencyCode} value={currencyCode}> 
              {currencyCode}
            </option>
          ))}
        </select>

        {/*show exchange rate result */}
        <p><br/>
        {/* result rounded to two decimal points */}
          1 EUR is equal to {convertedAmount.toFixed(2)} {selectedCurrency}.  
        </p>

      </div> 

      {/* right Container for list of events */}
      <div className="right-container">

        <h2>Popular Irish Events</h2><br/>
        <ul>   {/*unordered list, all links open in a new window*/}
          <li><a href="https://guinnesscorkjazz.com/" target="_blank" title="Cork Jazz Festival">Cork Jazz Festival</a></li>
          <li><a href="https://www.diff.ie/" target="_blank" title="Dublin International Film Festival">Dublin International  Film Festival</a></li>
          <li><a href="https://internationaldublinwritersfestival.com/" target="_blank" title="The International Dublin Writers’ Festival">The International Dublin Writers’ Festival</a></li>
          <li><a href="https://thecatlaughs.com/" target="_blank" title="Kilkenny Cat Laughs Comedy Festival">Kilkenny Cat Laughs Comedy Festival</a></li>
          <li><a href="https://www.irishtourism.com/festival-of-world-cultures" target="_blank" title="Festival of World Cultures">Festival of World Cultures</a></li>
          <li><a href="https://fleadhcheoil.ie/" target="_blank" title="Fleadh Cheoil na hEireann">Fleadh Cheoil na hEireann</a></li>
          <li><a href="https://www.giaf.ie/" target="_blank" title="Galway Arts Festival">Galway Arts Festival</a></li>
          <li><a href="https://www.galwayoysterfestival.com/2025-festival-programme/" target="_blank" title="Galway Oyster Festival">Galway Oyster Festival</a></li>
          <li><a href="https://galwayraces.com/" target="_blank" title="Galway Races Festival">Galway Races</a></li>
          <li><a href="https://www.kilkennyarts.ie/" target="_blank" title="Kilkenny Arts Festival">Kilkenny Arts Festival</a></li>
          <li><a href="https://matchmakerireland.com/" target="_blank" title="Lisdoonvarna Matchmaking Festival">Lisdoonvarna Matchmaking Festival</a></li>
          <li><a href="https://writersweek.ie/" target="_blank" title="Listowel Writers Week">Listowel Writers Week</a></li>
          <li><a href="https://www.npa.ie/" target="_blank" title="National Ploughing Championship">National Ploughing Championship</a></li>
          <li><a href="https://puckfair.ie/" target="_blank" title="Puck Fair">Puck Fair</a></li>
          <li><a href="https://roseoftralee.ie/" target="_blank" title="Rose of Tralee">Rose of Tralee</a></li>
          <li><a href="https://stpatricksfestival.ie/" target="_blank" title="St Patrick's Day">St Patrick's Day</a></li>
          <li><a href="https://www.wexfordopera.com/" target="_blank" title="Wexford Opera Festival">Wexford Opera Festival</a></li>
        </ul>
      </div>

      {/*news section */}
      {/*wrapper for news section */}
      <div className="news-container">  
      <h2>Latest Irish News</h2>
      {/*checking news length is greater than 0 - so if there are articles available */}
      {news.length > 0 ? (  
        <>   {/*start of fragment - to get ul and div together*/}
          <ul>
            {/*show first 3 news articles - - start at index 0, end at index 3 to return 0,1,2 */}
            {news.slice(0, 3).map((article, index) => (
              <li key={index} className="news-article">
                <a href={article.webUrl} target="_blank" rel="noopener noreferrer">  {/*open in new tab*/}
                  {article.webTitle} ({article.sectionName})  {/*show title and section of article*/}
                </a>
              </li>
            ))}
          </ul>

          {/* show rest of articles only if isExpanded is true */}
          <div className={`hidden-news ${isExpanded ? 'expanded' : ''}`}>   {/* if true, add classname IsExpanded, if false, add empty string */}
            <ul>
              {news.slice(3).map((article, index) => (
                //start at index 3 because the first 3 articles are already showing
                <li key={index + 3} className="news-article">  {/*+3 to take into account that we're starting at 3 */}
                  <a href={article.webUrl} target="_blank" rel="noopener noreferrer">  {/*open in new tab*/}
                    {article.webTitle} ({article.sectionName})  {/*show title and section of article*/}
                  </a>
                </li>
              ))}
            </ul>
         </div>
       </> 
       //end of fragment
      ) : (
        // else - show no news msg if no articles available   
        <p>No news available at the moment.</p>
      )}

      {/* show/hide button - if isExpanded is true, show less, otherwise show more */}
      <button className="show-more-btn" onClick={handleToggle}>
        {isExpanded ? 'Show Less' : 'Show More'}
      </button>
    </div>
    {/* link to the guardian newspaper as the source of the articles */}
    <div className="news-source">
      News Source:  <a href="https://www.theguardian.com/" target="_blank" rel="noopener noreferrer">The Guardian</a>
    </div>


      {/* section about irish universities */}
      <div className="studying-section">
        <div className="studying-container">
          <h2>Studying in Ireland</h2>
          <p>
            Ireland is home to a number of top-notch universities. The number of international students 
            participating in higher education in Ireland hit a record high during the 2023/24 
            academic year, with over 40,000 students from overseas enrolled in Ireland's third-level institutes.<br/>
            Source: <a href="https://monitor.icef.com/2025/01/irish-higher-education-booked-another-strong-year-of-foreign-enrolment-growth-in-2024/#:~:text=The%20number%20of%20international%20students%20enrolled%20in%20Irish,representing%20a%2015%25%20increase%20over%20the%20previous%20year." target="_blank" rel="noopener noreferrer">ICEF Monitor</a>
          </p> 
        </div><br/>
        <h3>Universities in Ireland</h3>
        Find your future Alma Mater here. Explore Ireland's bastions of academic excellence. 
        {/* universities grid */}
        <div className="universities-grid">
          {universities.map((university, index) => (  //iterate through universities array
            <div key={index} className="university-card">   {/*card container */}
              <a href={university.web_pages[0]} target="_blank" rel="noopener noreferrer">
                <h4>{university.name}</h4>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IrishInfo;
