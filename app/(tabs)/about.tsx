import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function About() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>About FinWatch</Text>
        <Text style={styles.subtitle}>
          Professional financial analysis platform
        </Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.sectionText}>
            FinWatch is dedicated to providing professional-grade financial analysis tools 
            for serious investors. We combine real-time market data with advanced charting 
            capabilities to help you make informed investment decisions.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Ionicons name="trending-up" size={20} color="#00D4AA" />
              <Text style={styles.featureText}>Real-time stock data</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="bar-chart" size={20} color="#00D4AA" />
              <Text style={styles.featureText}>Advanced trading charts</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="analytics" size={20} color="#00D4AA" />
              <Text style={styles.featureText}>Comprehensive analysis</Text>
            </View>
            <View style={styles.featureItem}>
              <Ionicons name="shield-checkmark" size={20} color="#00D4AA" />
              <Text style={styles.featureText}>Secure and reliable</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data Sources</Text>
          <Text style={styles.sectionText}>
            Our platform integrates with Yahoo Finance API to provide accurate, 
            up-to-date market data. We implement comprehensive fallback systems 
            to ensure you always have access to the information you need.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technology</Text>
          <Text style={styles.sectionText}>
            Built with React Native and Expo, FinWatch leverages TradingView's 
            Lightweight Charts library for professional-grade charting capabilities. 
            Our responsive design ensures optimal performance across all devices.
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
  header: {
    backgroundColor: '#0A2540',
    paddingHorizontal: 16,
    paddingVertical: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#e5e7eb',
    textAlign: 'center',
  },
  content: {
    padding: 16,
  },
  section: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A2540',
    marginBottom: 12,
  },
  sectionText: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
  },
  featureList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#0A2540',
    fontWeight: '500',
  },
});
