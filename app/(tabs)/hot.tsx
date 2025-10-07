import React, { useEffect, useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import StockCard from '../../components/stock-card';
import { fetchHotStocks, StockData } from '../../lib/yahoo-finance';

export default function HotProducts() {
  const [stocks, setStocks] = useState<StockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const loadStocks = async () => {
    try {
      setLoading(true);
      const data = await fetchHotStocks();
      setStocks(data);
    } catch (error) {
      console.error('Failed to load stocks:', error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadStocks();
    setRefreshing(false);
  };

  useEffect(() => {
    loadStocks();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00D4AA" />
        <Text style={styles.loadingText}>Loading hot stocks...</Text>
      </View>
    );
  }

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.header}>
        <Text style={styles.title}>Hot Products</Text>
        <Text style={styles.subtitle}>
          Trending stocks and popular investments
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.grid}>
          {stocks.map((stock) => (
            <View key={stock.symbol} style={styles.gridItem}>
              <StockCard stock={stock} showChart={true} />
            </View>
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Data provided by Yahoo Finance
        </Text>
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
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#0A2540',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  content: {
    padding: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  gridItem: {
    width: '48%', // 2 columns on mobile, 3-4 on larger screens
    minWidth: 270,
    maxWidth: 370, // Maximum width to prevent cards from getting too wide
    marginBottom: 12,
  },
  footer: {
    padding: 16,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#9ca3af',
  },
});
