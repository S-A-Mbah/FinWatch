export interface HistoricalData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: string;
  pe: number;
  high52: number;
  low52: number;
}

export interface ChartData {
  time: string;
  value: number;
}

export interface VolumeData {
  time: string;
  value: number;
  color: string;
}

// Mock data for popular stocks
const mockStockData: Record<string, StockData> = {
  AAPL: {
    symbol: 'AAPL',
    name: 'Apple Inc.',
    price: 175.43,
    change: 2.15,
    changePercent: 1.24,
    volume: 45678900,
    marketCap: '2.8T',
    pe: 28.5,
    high52: 198.23,
    low52: 124.17,
  },
  MSFT: {
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    price: 378.85,
    change: -1.23,
    changePercent: -0.32,
    volume: 23456700,
    marketCap: '2.8T',
    pe: 32.1,
    high52: 384.30,
    low52: 309.45,
  },
  GOOGL: {
    symbol: 'GOOGL',
    name: 'Alphabet Inc.',
    price: 142.56,
    change: 3.21,
    changePercent: 2.30,
    volume: 18765400,
    marketCap: '1.8T',
    pe: 25.3,
    high52: 151.55,
    low52: 115.55,
  },
  TSLA: {
    symbol: 'TSLA',
    name: 'Tesla, Inc.',
    price: 248.42,
    change: -5.67,
    changePercent: -2.23,
    volume: 67890100,
    marketCap: '790B',
    pe: 65.2,
    high52: 299.29,
    low52: 138.80,
  },
  AMZN: {
    symbol: 'AMZN',
    name: 'Amazon.com, Inc.',
    price: 155.88,
    change: 1.45,
    changePercent: 0.94,
    volume: 34567800,
    marketCap: '1.6T',
    pe: 52.8,
    high52: 189.77,
    low52: 101.15,
  },
  META: {
    symbol: 'META',
    name: 'Meta Platforms, Inc.',
    price: 485.12,
    change: 8.34,
    changePercent: 1.75,
    volume: 12345600,
    marketCap: '1.2T',
    pe: 24.7,
    high52: 531.49,
    low52: 197.26,
  },
  NVDA: {
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    price: 875.28,
    change: 12.45,
    changePercent: 1.44,
    volume: 45678900,
    marketCap: '2.1T',
    pe: 65.8,
    high52: 974.00,
    low52: 373.56,
  },
  NFLX: {
    symbol: 'NFLX',
    name: 'Netflix, Inc.',
    price: 612.34,
    change: -3.21,
    changePercent: -0.52,
    volume: 2345670,
    marketCap: '270B',
    pe: 45.2,
    high52: 639.00,
    low52: 379.11,
  },
};

// Generate mock historical data
function generateMockHistoricalData(symbol: string, days: number = 252): HistoricalData[] {
  const data: HistoricalData[] = [];
  const basePrice = mockStockData[symbol]?.price || 100;
  let currentPrice = basePrice;
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    // Generate realistic price movement
    const volatility = 0.02;
    const change = (Math.random() - 0.5) * volatility;
    const newPrice = currentPrice * (1 + change);
    
    const open = currentPrice;
    const close = newPrice;
    const high = Math.max(open, close) * (1 + Math.random() * 0.01);
    const low = Math.min(open, close) * (1 - Math.random() * 0.01);
    const volume = Math.floor(Math.random() * 10000000) + 1000000;
    
    data.push({
      date: date.toISOString().split('T')[0],
      open,
      high,
      low,
      close,
      volume,
    });
    
    currentPrice = close;
  }
  
  return data;
}

// Clean and deduplicate historical data
function cleanHistoricalData(data: HistoricalData[]): HistoricalData[] {
  // Remove duplicates by date
  const uniqueDataMap = new Map<string, HistoricalData>();
  data.forEach(item => {
    uniqueDataMap.set(item.date, item);
  });
  
  // Convert back to array and sort
  const uniqueData = Array.from(uniqueDataMap.values());
  uniqueData.sort((a, b) => a.date.localeCompare(b.date));
  
  return uniqueData;
}

// Convert historical data to chart format
export function convertToChartData(historicalData: HistoricalData[]): {
  priceData: ChartData[];
  volumeData: VolumeData[];
} {
  // Clean the data first
  const cleanedData = cleanHistoricalData(historicalData);
  
  const priceData: ChartData[] = [];
  const volumeData: VolumeData[] = [];
  
  cleanedData.forEach((item, index) => {
    const time = item.date;
    const value = item.close;
    
    priceData.push({ time, value });
    
    // Color volume bars based on price movement
    const isUp = index > 0 ? item.close > cleanedData[index - 1].close : true;
    const color = isUp ? '#00D4AA' : '#ef4444';
    
    volumeData.push({
      time,
      value: item.volume,
      color,
    });
  });
  
  return { priceData, volumeData };
}

// Yahoo Finance API functions
export async function fetchStockData(symbol: string): Promise<StockData> {
  try {
    // Try Yahoo Finance API first
    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=1d`
    );
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    const result = data.chart.result[0];
    const meta = result.meta;
    const quote = result.indicators.quote[0];
    
    const currentPrice = meta.regularMarketPrice;
    const previousClose = meta.previousClose;
    const change = currentPrice - previousClose;
    const changePercent = (change / previousClose) * 100;
    
    return {
      symbol: symbol.toUpperCase(),
      name: meta.longName || symbol,
      price: currentPrice,
      change,
      changePercent,
      volume: meta.regularMarketVolume,
      marketCap: meta.marketCap ? formatMarketCap(meta.marketCap) : 'N/A',
      pe: meta.trailingPE || 0,
      high52: meta.fiftyTwoWeekHigh,
      low52: meta.fiftyTwoWeekLow,
    };
  } catch (error) {
    console.warn(`Failed to fetch data for ${symbol}, using mock data:`, error);
    
    // Fallback to mock data
    const mockData = mockStockData[symbol.toUpperCase()];
    if (mockData) {
      return mockData;
    }
    
    // Generate random data if symbol not in mock data
    return {
      symbol: symbol.toUpperCase(),
      name: `${symbol} Inc.`,
      price: Math.random() * 500 + 50,
      change: (Math.random() - 0.5) * 10,
      changePercent: (Math.random() - 0.5) * 5,
      volume: Math.floor(Math.random() * 50000000) + 1000000,
      marketCap: 'N/A',
      pe: Math.random() * 50 + 10,
      high52: Math.random() * 1000 + 100,
      low52: Math.random() * 200 + 50,
    };
  }
}

export async function fetchHistoricalData(symbol: string, period: string = '1y'): Promise<HistoricalData[]> {
  try {
    const response = await fetch(
      `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?interval=1d&range=${period}`
    );
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    const result = data.chart.result[0];
    const timestamps = result.timestamp;
    const quotes = result.indicators.quote[0];
    
    const historicalData: HistoricalData[] = [];
    const seenTimestamps = new Set<string>(); // Use string keys for better deduplication
    
    for (let i = 0; i < timestamps.length; i++) {
      const timestamp = timestamps[i];
      const dateString = new Date(timestamp * 1000).toISOString().split('T')[0];
      
      // Skip duplicate dates (not just timestamps)
      if (seenTimestamps.has(dateString)) {
        console.warn(`Skipping duplicate date: ${dateString} for ${symbol}`);
        continue;
      }
      
      if (quotes.open[i] && quotes.high[i] && quotes.low[i] && quotes.close[i]) {
        seenTimestamps.add(dateString);
        historicalData.push({
          date: dateString,
          open: quotes.open[i],
          high: quotes.high[i],
          low: quotes.low[i],
          close: quotes.close[i],
          volume: quotes.volume[i] || 0,
        });
      }
    }
    
    // Sort by date to ensure chronological order
    historicalData.sort((a, b) => {
      return a.date.localeCompare(b.date);
    });
    
    // Final validation: check for any remaining duplicates
    const finalDates = historicalData.map(item => item.date);
    const uniqueDates = new Set(finalDates);
    if (finalDates.length !== uniqueDates.size) {
      console.warn(`Found ${finalDates.length - uniqueDates.size} duplicate dates after processing for ${symbol}`);
    }
    
    // Apply final cleaning to ensure no duplicates
    return cleanHistoricalData(historicalData);
  } catch (error) {
    console.warn(`Failed to fetch historical data for ${symbol}, using mock data:`, error);
    
    // Fallback to mock data
    const days = period === '1y' ? 252 : period === '6m' ? 126 : 30;
    return generateMockHistoricalData(symbol, days);
  }
}

export async function fetchHotStocks(): Promise<StockData[]> {
  const symbols = ['AAPL', 'MSFT', 'GOOGL', 'TSLA', 'AMZN', 'META', 'NVDA', 'NFLX'];
  
  try {
    const promises = symbols.map(symbol => fetchStockData(symbol));
    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    console.warn('Failed to fetch hot stocks, using mock data:', error);
    return Object.values(mockStockData);
  }
}

function formatMarketCap(marketCap: number): string {
  if (marketCap >= 1e12) {
    return `${(marketCap / 1e12).toFixed(1)}T`;
  } else if (marketCap >= 1e9) {
    return `${(marketCap / 1e9).toFixed(1)}B`;
  } else if (marketCap >= 1e6) {
    return `${(marketCap / 1e6).toFixed(1)}M`;
  }
  return marketCap.toString();
}
