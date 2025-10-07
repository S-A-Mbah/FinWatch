import { IChartApi } from 'lightweight-charts';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, Platform, StyleSheet, Text, View } from 'react-native';
import { ChartData, HistoricalData, VolumeData } from '../lib/yahoo-finance';

// Conditional import for web only
let createChart: any;
if (Platform.OS === 'web') {
  try {
    const lightweightCharts = require('lightweight-charts');
    createChart = lightweightCharts.createChart;
  } catch (error) {
    console.warn('TradingView charts not available:', error);
  }
}

interface TradingViewChartProps {
  data: HistoricalData[];
  symbol: string;
  height?: number;
}

export default function TradingViewChart({ data, symbol, height = 400 }: TradingViewChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);
  const [chartData, setChartData] = useState<{ priceData: ChartData[]; volumeData: VolumeData[] } | null>(null);

  useEffect(() => {
    if (data && data.length > 0) {
      // Sort data by date to ensure chronological order
      const sortedData = [...data].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateA - dateB;
      });
      
      // Remove any remaining duplicates by using a Map
      const uniqueDataMap = new Map<string, HistoricalData>();
      sortedData.forEach(item => {
        uniqueDataMap.set(item.date, item);
      });
      
      const uniqueData = Array.from(uniqueDataMap.values());
      
      // Convert historical data to chart format
      const priceData: ChartData[] = [];
      const volumeData: VolumeData[] = [];
      
      uniqueData.forEach((item, index) => {
        const time = item.date;
        const value = item.close;
        
        priceData.push({ time, value });
        
        // Color volume bars based on price movement
        const isUp = index > 0 ? item.close > uniqueData[index - 1].close : true;
        const color = isUp ? '#00D4AA' : '#ef4444';
        
        volumeData.push({
          time,
          value: item.volume,
          color,
        });
      });
      
      // Final validation: ensure no duplicate times
      const times = priceData.map(item => item.time);
      const uniqueTimes = new Set(times);
      if (times.length !== uniqueTimes.size) {
        console.error(`Found ${times.length - uniqueTimes.size} duplicate times in chart data`);
        return;
      }
      
      setChartData({ priceData, volumeData });
    }
  }, [data]);

  useEffect(() => {
    if (!chartContainerRef.current || !chartData || Platform.OS !== 'web' || !createChart) return;

    // Clean up existing chart
    if (chartRef.current) {
      chartRef.current.remove();
    }

    // Create new chart
    const chart = createChart(chartContainerRef.current, {
      width: Dimensions.get('window').width - 32,
      height: height,
      layout: {
        background: { color: '#ffffff' },
        textColor: '#0A2540',
      },
      grid: {
        vertLines: { color: '#f3f4f6' },
        horzLines: { color: '#f3f4f6' },
      },
      crosshair: {
        mode: 1,
      },
      rightPriceScale: {
        borderColor: '#f3f4f6',
      },
      timeScale: {
        borderColor: '#f3f4f6',
        timeVisible: true,
        secondsVisible: false,
      },
    });

    // Add price series (area chart)
    const priceSeries = chart.addAreaSeries({
      lineColor: '#00D4AA',
      topColor: '#00D4AA20',
      bottomColor: '#00D4AA05',
      lineWidth: 2,
    });

    // Add volume series (histogram)
    const volumeSeries = chart.addHistogramSeries({
      color: '#6b7280',
      priceFormat: {
        type: 'volume',
      },
      priceScaleId: 'volume',
    });

    // Set data with error handling
    try {
      priceSeries.setData(chartData.priceData);
      volumeSeries.setData(chartData.volumeData);
    } catch (error) {
      console.error('Error setting chart data:', error);
      // If there's still an error, try with a subset of data
      const safeData = chartData.priceData.slice(0, Math.min(50, chartData.priceData.length));
      const safeVolumeData = chartData.volumeData.slice(0, Math.min(50, chartData.volumeData.length));
      priceSeries.setData(safeData);
      volumeSeries.setData(safeVolumeData);
    }

    // Configure volume series
    chart.priceScale('volume').applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    // Add moving averages
    const ma20Data = calculateMovingAverage(chartData.priceData, 20);
    const ma50Data = calculateMovingAverage(chartData.priceData, 50);

    if (ma20Data.length > 0) {
      const ma20Series = chart.addLineSeries({
        color: '#f59e0b',
        lineWidth: 1,
        title: 'MA 20',
      });
      ma20Series.setData(ma20Data);
    }

    if (ma50Data.length > 0) {
      const ma50Series = chart.addLineSeries({
        color: '#8b5cf6',
        lineWidth: 1,
        title: 'MA 50',
      });
      ma50Series.setData(ma50Data);
    }

    chartRef.current = chart;

    // Handle resize
    const handleResize = () => {
      if (chartRef.current) {
        chartRef.current.applyOptions({
          width: Dimensions.get('window').width - 32,
        });
      }
    };

    const subscription = Dimensions.addEventListener('change', handleResize);

    return () => {
      subscription?.remove();
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [chartData, height]);

  // Calculate moving average
  const calculateMovingAverage = (data: ChartData[], period: number): ChartData[] => {
    const result: ChartData[] = [];
    
    for (let i = period - 1; i < data.length; i++) {
      const slice = data.slice(i - period + 1, i + 1);
      const sum = slice.reduce((acc, item) => acc + item.value, 0);
      const average = sum / period;
      
      result.push({
        time: data[i].time,
        value: average,
      });
    }
    
    return result;
  };

  if (!chartData) {
    return (
      <View style={[styles.container, { height }]}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading chart...</Text>
        </View>
      </View>
    );
  }

  if (Platform.OS !== 'web') {
    return (
      <View style={[styles.container, { height }]}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Charts available on web only</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <div
        ref={chartContainerRef}
        style={{
          width: '100%',
          height: height,
          borderRadius: 8,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
  },
});
