import React, { useContext, useEffect, useState } from 'react';
import './Coin.css';
import { useParams } from 'react-router-dom';
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/lineChart/LineChart';

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null);
  const [HistoricalData, setHistoricalData] = useState(null);
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-2EdEm61R7e4W44LpPv1zrH4P',
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`,
        options
      );
      if (!response.ok) throw new Error('Failed to fetch coin data.');
      const data = await response.json();
      setCoinData(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const fetchHistoricalData = async () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-2EdEm61R7e4W44LpPv1zrH4P',
      },
    };

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
        options
      );
      if (!response.ok) throw new Error('Failed to fetch historical data.');
      const data = await response.json();
      setHistoricalData(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  if (coinData && HistoricalData) {
    return (
      <div className='coin'>
        <div className="coin-name">
          <img src={coinData.image?.large} alt={`${coinData.name} logo`} />
          <p>
            <b>
              {coinData.name} ({coinData.symbol?.toUpperCase()})
            </b>
          </p>
        </div>
        <div className="coin-chart">
          <LineChart HistoricalData={HistoricalData} />
        </div>

          <div className="coin-info">
            <ul>
              <li>
                Crypto Market Rank
              </li>
              <li>
                {coinData.market_cap_rank}
              </li>
            </ul>

            <ul>
              <li>
                Current Price
              </li>
              <li>
                {currency.symbol}
                {coinData.market_data.current_price [currency.name].toLocaleString()}
              </li>
            </ul>


            <ul>
              <li>
                Market Cap
              </li>
              <li>
                {currency.symbol}
                {coinData.market_data.market_cap [currency.name].toLocaleString()}
              </li>
            </ul>

            <ul>
              <li>
                24 Hour high
              </li>
              <li>
                {currency.symbol}
                {coinData.market_data.high_24h [currency.name].toLocaleString()}
              </li>
            </ul>

            <ul>
              <li>
                24 Hour low
              </li>
              <li>
                {currency.symbol}
                {coinData.market_data.low_24h [currency.name].toLocaleString()}
              </li>
            </ul>



          </div>
      </div>
    );
  } else {
    return (
      <div className='spinner'>
        <div className='spin'></div>
      </div>
    );
  }
};

export default Coin;
