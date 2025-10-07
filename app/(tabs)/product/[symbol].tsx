import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import TradingViewChart from '../../../components/tradingview-chart';
import { fetchHistoricalData, fetchStockData, HistoricalData, StockData } from '../../../lib/yahoo-finance';

export default function ProductDetail() {
  const { symbol } = useLocalSearchParams<{ symbol: string }>();
  const [stock, setStock] = useState<StockData | null>(null);
  const [historicalData, setHistoricalData] = useState<HistoricalData[]>([]);
  const [loading, setLoading] = useState(true);
  const [chartLoading, setChartLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState('1y');

  const periods = [
    { label: '1D', value: '1d' },
    { label: '1W', value: '1wk' },
    { label: '1M', value: '1mo' },
    { label: '3M', value: '3mo' },
    { label: '6M', value: '6mo' },
    { label: '1Y', value: '1y' },
  ];

  const loadStockData = async () => {
    if (!symbol) return;
    
    try {
      setLoading(true);
      const [stockData, histData] = await Promise.all([
        fetchStockData(symbol),
        fetchHistoricalData(symbol, selectedPeriod),
      ]);
      setStock(stockData);
      setHistoricalData(histData);
    } catch (error) {
      console.error('Failed to load stock data:', error);
    } finally {
      setLoading(false);
      setChartLoading(false);
    }
  };

  const handlePeriodChange = async (period: string) => {
    if (!symbol) return;
    
    setSelectedPeriod(period);
    setChartLoading(true);
    
    try {
      const histData = await fetchHistoricalData(symbol, period);
      setHistoricalData(histData);
    } catch (error) {
      console.error('Failed to load historical data:', error);
    } finally {
      setChartLoading(false);
    }
  };

  useEffect(() => {
    loadStockData();
  }, [symbol]);

  if (loading || !stock) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00D4AA" />
        <Text style={styles.loadingText}>Loading stock data...</Text>
      </View>
    );
  }

  const isPositive = stock.change >= 0;
  const changeColor = isPositive ? '#00D4AA' : '#ef4444';
  const changeIcon = isPositive ? 'trending-up' : 'trending-down';

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => {
            // Check if we can go back in history, otherwise go to hot page
            router.push('/hot');
            
          }}
        >
          <Ionicons name="arrow-back" size={24} color="#0A2540" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.symbol}>{stock.symbol}</Text>
          <Text style={styles.name}>{stock.name}</Text>
        </View>
      </View>

      {/* Price Section */}
      <View style={styles.priceSection}>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>${stock.price.toFixed(2)}</Text>
          <View style={styles.changeContainer}>
            <Ionicons 
              name={changeIcon} 
              size={16} 
              color={changeColor} 
            />
            <Text style={[styles.change, { color: changeColor }]}>
              {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
            </Text>
          </View>
        </View>
      </View>

      {/* Chart Section */}
      <View style={styles.chartSection}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Price Chart</Text>
          <View style={styles.periodSelector}>
            {periods.map((period) => (
              <TouchableOpacity
                key={period.value}
                style={[
                  styles.periodButton,
                  selectedPeriod === period.value && styles.periodButtonActive,
                ]}
                onPress={() => handlePeriodChange(period.value)}
              >
                <Text
                  style={[
                    styles.periodButtonText,
                    selectedPeriod === period.value && styles.periodButtonTextActive,
                  ]}
                >
                  {period.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        {chartLoading ? (
          <View style={styles.chartLoading}>
            <ActivityIndicator size="large" color="#00D4AA" />
            <Text style={styles.chartLoadingText}>Loading chart...</Text>
          </View>
        ) : (
          <TradingViewChart 
            data={historicalData} 
            symbol={stock.symbol}
            height={400}
          />
        )}
      </View>

      {/* Key Statistics */}
      <View style={styles.statsSection}>
        <Text style={styles.statsTitle}>Key Statistics</Text>
        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Market Cap</Text>
            <Text style={styles.statValue}>{stock.marketCap}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>P/E Ratio</Text>
            <Text style={styles.statValue}>{stock.pe.toFixed(1)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Volume</Text>
            <Text style={styles.statValue}>{stock.volume.toLocaleString()}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>52W High</Text>
            <Text style={styles.statValue}>${stock.high52.toFixed(2)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>52W Low</Text>
            <Text style={styles.statValue}>${stock.low52.toFixed(2)}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>52W Range</Text>
            <Text style={styles.statValue}>
              {(((stock.price - stock.low52) / (stock.high52 - stock.low52)) * 100).toFixed(1)}%
            </Text>
          </View>
        </View>
      </View>

      {/* 52-Week Range Visualization */}
      <View style={styles.rangeSection}>
        <Text style={styles.rangeTitle}>52-Week Range</Text>
        <View style={styles.rangeContainer}>
          <View style={styles.rangeLabels}>
            <Text style={styles.rangeLabel}>${stock.low52.toFixed(2)}</Text>
            <Text style={styles.rangeLabel}>${stock.high52.toFixed(2)}</Text>
          </View>
          <View style={styles.rangeBar}>
            <View style={styles.rangeTrack}>
              <View 
                style={[
                  styles.rangeFill,
                  {
                    left: `${((stock.price - stock.low52) / (stock.high52 - stock.low52)) * 100}%`,
                  }
                ]}
              />
              <View 
                style={[
                  styles.rangeIndicator,
                  {
                    left: `${((stock.price - stock.low52) / (stock.high52 - stock.low52)) * 100}%`,
                  }
                ]}
              />
            </View>
          </View>
          <Text style={styles.currentPriceLabel}>
            Current: ${stock.price.toFixed(2)}
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    marginRight: 16,
    padding: 8,
  },
  headerContent: {
    flex: 1,
  },
  symbol: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0A2540',
  },
  name: {
    fontSize: 16,
    color: '#6b7280',
    marginTop: 2,
  },
  priceSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  priceContainer: {
    alignItems: 'flex-start',
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0A2540',
    marginBottom: 8,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  change: {
    fontSize: 18,
    fontWeight: '600',
  },
  chartSection: {
    backgroundColor: '#ffffff',
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A2540',
  },
  periodSelector: {
    flexDirection: 'row',
    gap: 8,
  },
  periodButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    backgroundColor: '#f3f4f6',
  },
  periodButtonActive: {
    backgroundColor: '#00D4AA',
  },
  periodButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  periodButtonTextActive: {
    color: '#ffffff',
  },
  chartLoading: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartLoadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6b7280',
  },
  statsSection: {
    backgroundColor: '#ffffff',
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A2540',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statItem: {
    width: '30%',
    minWidth: 120,
  },
  statLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0A2540',
  },
  rangeSection: {
    backgroundColor: '#ffffff',
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  rangeTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A2540',
    marginBottom: 16,
  },
  rangeContainer: {
    gap: 12,
  },
  rangeLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rangeLabel: {
    fontSize: 14,
    color: '#6b7280',
  },
  rangeBar: {
    height: 8,
    backgroundColor: '#f3f4f6',
    borderRadius: 4,
    position: 'relative',
  },
  rangeTrack: {
    height: '100%',
    backgroundColor: '#e5e7eb',
    borderRadius: 4,
    position: 'relative',
  },
  rangeFill: {
    position: 'absolute',
    top: 0,
    height: '100%',
    width: 4,
    backgroundColor: '#00D4AA',
    borderRadius: 2,
  },
  rangeIndicator: {
    position: 'absolute',
    top: -4,
    width: 8,
    height: 16,
    backgroundColor: '#00D4AA',
    borderRadius: 4,
    transform: [{ translateX: -2 }],
  },
  currentPriceLabel: {
    fontSize: 14,
    color: '#0A2540',
    fontWeight: '500',
    textAlign: 'center',
  },
});
