// react, redux, hooks
import React, { useState, FormEvent, ChangeEvent, useEffect } from "react";
import { useGetStockQuery } from "../../features/stock/stockApi";

// styled components
import { StyledStockContainer } from "./styledStock";

// plugins
import { init } from "klinecharts";

// utils
import { convertStockData } from "../../utils/convertStockData";

const metaDataConfig = [
  "1. Information",
  "2. Symbol",
  "3. Last Refreshed",
  "4. Interval",
  "5. Output Size",
  "6. Time Zone",
];

const defaultStockName = "AAPL";

const Stock = () => {
  const chart = init(`klineChart`);
  const [searchStockName, setSearchStockName] = useState<string>(defaultStockName);
  const [submitStockName, setSubmitStockName] = useState<string>(searchStockName);
  const [currentStockName, setCurrentStockName] = useState<string>(defaultStockName);

  const { data: stockData } = useGetStockQuery({
    interval: "5min",
    function: "TIME_SERIES_INTRADAY",
    symbol: submitStockName,
    datatype: "json",
    output_size: "compact",
  });

  useEffect(() => {
    if (stockData && Object.keys(stockData).length !== 0) {
      const convertedStockData = convertStockData(stockData);
      const resMetaData = convertedStockData[0].metaData;
      if (typeof resMetaData === "string") {
        setCurrentStockName("Wrong Stock Name");
        return alert("Wrong Stock Name");
      }
      console.log(`this is convertedStockData => `, typeof resMetaData);
      const currentStockSymbol = convertedStockData[0].metaData[metaDataConfig[1]];

      setCurrentStockName(currentStockSymbol);
      chart?.applyNewData(convertedStockData[1]);
    }
  }, [stockData]);

  const handleStockNameChange = (e: ChangeEvent<HTMLInputElement>): void =>
    setSearchStockName(e.target.value.toUpperCase());

  const handleOnSubmit = (e: FormEvent): void => {
    e.preventDefault();
    setSubmitStockName(searchStockName);
  };
  return (
    <div>
      <h1>{currentStockName}</h1>
      <form onSubmit={handleOnSubmit}>
        <input
          type="text"
          value={searchStockName}
          onChange={handleStockNameChange}
        />
        <button type="submit">Search</button>
      </form>
      <StyledStockContainer>
        <div id="klineChart"></div>
      </StyledStockContainer>
    </div>
  );
};

export default Stock;

// params: {
//   interval: '5min',
//   function: 'TIME_SERIES_INTRADAY',
//   symbol: 'AAPL',
//   datatype: 'json',
//   output_size: 'compact'
// },
