import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { StockData } from '../lib/yahoo-finance';
import MiniChart from './mini-chart';

interface StockCardProps {
  stock: StockData;
  showChart?: boolean;
}

// Generate mock chart data for mini chart
const generateMockChartData = (currentPrice: number, changePercent: number): number[] => {
  const data: number[] = [];
  const basePrice = currentPrice / (1 + changePercent / 100);
  const volatility = 0.02;
  
  // Generate 20 data points
  for (let i = 0; i < 20; i++) {
    const progress = i / 19;
    const trend = changePercent > 0 ? 1 + progress * (changePercent / 100) : 1 - progress * Math.abs(changePercent / 100);
    const randomVariation = (Math.random() - 0.5) * volatility;
    const price = basePrice * trend * (1 + randomVariation);
    data.push(price);
  }
  
  return data;
};

export default function StockCard({ stock, showChart = false }: StockCardProps) {
  const isPositive = stock.change >= 0;
  const changeColor = isPositive ? '#00D4AA' : '#ef4444';
  const changeIcon = isPositive ? 'trending-up' : 'trending-down';

  return (
    <Link href={`/product/${stock.symbol}` as any} asChild>
      <TouchableOpacity style={styles.card}>
        <View style={styles.header}>
          <View style={styles.symbolContainer}>
            <Text style={styles.symbol}>{stock.symbol}</Text>
            <Text style={styles.name} numberOfLines={1}>
              {stock.name}
            </Text>
          </View>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${stock.price.toFixed(2)}</Text>
            <View style={styles.changeContainer}>
              <Ionicons 
                name={changeIcon} 
                size={12} 
                color={changeColor} 
                style={styles.changeIcon}
              />
              <Text style={[styles.change, { color: changeColor }]}>
                {isPositive ? '+' : ''}{stock.change.toFixed(2)} ({isPositive ? '+' : ''}{stock.changePercent.toFixed(2)}%)
              </Text>
            </View>
          </View>
        </View>

        {showChart && (
          <View style={styles.chartContainer}>
            <MiniChart 
              data={generateMockChartData(stock.price, stock.changePercent)}
              isPositive={isPositive}
              height={60}
            />
          </View>
        )}

        <View style={styles.footer}>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Volume</Text>
            <Text style={styles.metricValue}>
              {stock.volume.toLocaleString()}
            </Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>Market Cap</Text>
            <Text style={styles.metricValue}>{stock.marketCap}</Text>
          </View>
          <View style={styles.metric}>
            <Text style={styles.metricLabel}>P/E</Text>
            <Text style={styles.metricValue}>{stock.pe.toFixed(1)}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#f3f4f6',
    flex: 1,
    
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  symbolContainer: {
    flex: 1,
    marginRight: 8,
  },
  symbol: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0A2540',
    marginBottom: 2,
  },
  name: {
    fontSize: 12,
    color: '#6b7280',
    lineHeight: 16,
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0A2540',
    marginBottom: 2,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  changeIcon: {
    marginTop: 1,
  },
  change: {
    fontSize: 12,
    fontWeight: '600',
  },
  chartContainer: {
    height: 50,
    marginBottom: 8,
  },
  miniChart: {
    flex: 1,
    backgroundColor: '#f8fafc',
    borderRadius: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f3f4f6',
  },
  metric: {
    alignItems: 'center',
    flex: 1,
  },
  metricLabel: {
    fontSize: 10,
    color: '#6b7280',
    marginBottom: 2,
  },
  metricValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0A2540',
  },
});
