import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  const features = [
    {
      icon: 'trending-up',
      title: 'Real-time Data',
      description: 'Get live stock prices and market data with lightning-fast updates',
    },
    {
      icon: 'bar-chart',
      title: 'Advanced Charts',
      description: 'Professional trading charts with technical indicators and analysis tools',
    },
    {
      icon: 'analytics',
      title: 'Comprehensive Analysis',
      description: 'Deep insights with financial metrics, ratios, and market analysis',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>
            Professional Stock Analysis
          </Text>
          <Text style={styles.heroSubtitle}>
            Track, analyze, and invest with confidence using our comprehensive financial platform
          </Text>
          <View style={styles.heroButtons}>
            <Link href="/hot" asChild>
              <TouchableOpacity style={styles.primaryButton}>
                <Text style={styles.primaryButtonText}>Explore Stocks</Text>
                <Ionicons name="arrow-forward" size={20} color="#ffffff" />
              </TouchableOpacity>
            </Link>
            <TouchableOpacity style={styles.secondaryButton}>
              <Text style={styles.secondaryButtonText}>Learn More</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Features Section */}
      <View style={styles.features}>
        <View style={styles.featuresContent}>
          <Text style={styles.featuresTitle}>Why Choose FinWatch?</Text>
          <Text style={styles.featuresSubtitle}>
            Professional-grade tools for serious investors
          </Text>
          
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Ionicons name={feature.icon as any} size={32} color="#00D4AA" />
                </View>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureDescription}>{feature.description}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>

      {/* CTA Section */}
      <View style={styles.cta}>
        <View style={styles.ctaContent}>
          <Text style={styles.ctaTitle}>Ready to Start Trading?</Text>
          <Text style={styles.ctaSubtitle}>
            Join thousands of investors who trust FinWatch for their financial decisions
          </Text>
          <Link href="/hot" asChild>
            <TouchableOpacity style={styles.ctaButton}>
              <Text style={styles.ctaButtonText}>Get Started Now</Text>
              <Ionicons name="arrow-forward" size={20} color="#ffffff" />
            </TouchableOpacity>
          </Link>
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
  hero: {
    backgroundColor: '#0A2540',
    paddingVertical: 60,
    paddingHorizontal: 16,
  },
  heroContent: {
    maxWidth: 800,
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 44,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#e5e7eb',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 28,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#00D4AA',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 2,
    borderColor: '#ffffff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  secondaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  features: {
    paddingVertical: 60,
    paddingHorizontal: 16,
  },
  featuresContent: {
    maxWidth: 800,
    alignSelf: 'center',
    alignItems: 'center',
  },
  featuresTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0A2540',
    textAlign: 'center',
    marginBottom: 16,
  },
  featuresSubtitle: {
    fontSize: 18,
    color: '#6b7280',
    textAlign: 'center',
    marginBottom: 48,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 24,
    justifyContent: 'center',
  },
  featureCard: {
    backgroundColor: '#ffffff',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
    minWidth: 280,
    maxWidth: 320,
  },
  featureIcon: {
    width: 64,
    height: 64,
    backgroundColor: '#f0fdfa',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A2540',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 16,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 24,
  },
  cta: {
    backgroundColor: '#00D4AA',
    paddingVertical: 60,
    paddingHorizontal: 16,
  },
  ctaContent: {
    maxWidth: 600,
    alignSelf: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  ctaTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 32,
    opacity: 0.9,
    lineHeight: 24,
  },
  ctaButton: {
    backgroundColor: '#0A2540',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ctaButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});
