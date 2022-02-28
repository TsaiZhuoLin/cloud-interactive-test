export interface StockQueryParams {
  interval: string;
  function: string;
  symbol: string;
  datatype: string;
  output_size: string;
  time_zone?: string;
}
export interface IMetaData {
  metaData: StockQueryParams;
}

export interface IKlineData {
  open: number | string;
  high: number | string;
  low: number | string;
  close: number | string;
  volume: number | string;
  timestamp: number | string;
}

export interface IStockData {
  metaData: StockQueryParams;
  klineData: IKlineData;
}
