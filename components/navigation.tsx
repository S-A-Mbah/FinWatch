import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Navigation() {
  return (
    <View style={styles.navbar}>
      <View style={styles.navContent}>
        {/* Logo and Brand */}
        <View style={styles.brand}>
          <Ionicons name="trending-up" size={24} color="#00D4AA" />
          <Text style={styles.brandText}>FinWatch</Text>
        </View>

        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  navContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    maxWidth: 1200,
    alignSelf: 'center',
    width: '100%',
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0A2540',
  },
  desktopNav: {
    flexDirection: 'row',
    gap: 24,
    display: 'none', // Will be shown on larger screens
  },
  navItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  navText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#0A2540',
  },
  mobileMenuButton: {
    padding: 8,
    display: 'flex', // Will be hidden on larger screens
  },
});
