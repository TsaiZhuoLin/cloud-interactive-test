export interface StockQueryParams {
  interval: string;
  function: string;
  symbol: string;
  datatype: string;
  output_size: string;
  time_zone?: string;
}

interface IMetaData {
  metaData: StockQueryParams;
}

interface IKlineData {}

const klineDataConfig = ["1. open", "2. high", "3. low", "4. close", "5. volume"];

export const convertStockData = (stockData: {}) => {
  const convertedStockData = [];
  const formatStockData: Array<IMetaData | IKlineData> = [];

  for (const [key, value] of Object.entries(stockData)) {
    convertedStockData.push({
      [key]: value,
    });
  }

  convertedStockData.forEach((item: IMetaData | IKlineData, index: number) => {
    if (index === 0) {
      console.log(`this is Object.values(item)[0] => `, Object.values(item)[0]);
      formatStockData.push({
        metaData: Object.values(item)[0],
      } as IMetaData);
    }

    if (index === 1) {
      const newValues = Object.values(item).map(klineValue => {
        const entriesKline = Object.entries(klineValue).map(kline => {
          const [date, klineDataSet] = kline;
          const timestamp = new Date(date).getTime();
          let newKlineDataObject = {};

          klineDataConfig
            .map((configKey: string) => {
              const getCorrectKey: string = configKey.split(" ")[1];
              const getValue: number = +klineDataSet[configKey];

              return {
                [getCorrectKey]: getValue,
              };
            })
            .forEach(i => {
              newKlineDataObject = {
                ...newKlineDataObject,
                ...i,
              };
            });

          return {
            ...newKlineDataObject,
            timestamp,
          };
        });

        return entriesKline;
      });

      formatStockData.push(newValues[0]);
    }
  });

  return formatStockData;
};
