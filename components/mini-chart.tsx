import React from 'react';
import { StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Stop } from 'react-native-svg';

interface MiniChartProps {
  data: number[];
  isPositive: boolean;
  height?: number;
}

export default function MiniChart({ data, isPositive, height = 40 }: MiniChartProps) {
  const color = isPositive ? '#00D4AA' : '#ef4444';
  const gradientColor = isPositive ? '#00D4AA' : '#ef4444';
  
  if (!data || data.length < 2) {
    return (
      <View style={[styles.container, { height }]}>
        <View style={styles.flatLine}>
          <View style={[styles.line, { backgroundColor: color }]} />
        </View>
      </View>
    );
  }

  // Calculate chart dimensions
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;
  const padding = 4;
  const chartWidth = 200; // Fixed width for consistent rendering
  const chartHeight = height - padding * 2;
  
  if (range === 0) {
    return (
      <View style={[styles.container, { height }]}>
        <View style={styles.flatLine}>
          <View style={[styles.line, { backgroundColor: color }]} />
        </View>
      </View>
    );
  }

  // Generate smooth path for the line
  const points = data.map((value, index) => {
    const x = (index / (data.length - 1)) * chartWidth;
    const y = chartHeight - ((value - minValue) / range) * chartHeight;
    return { x, y };
  });

  // Create smooth curve using quadratic bezier curves
  const createSmoothPath = (points: { x: number; y: number }[]) => {
    if (points.length < 2) return '';
    
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const next = points[i + 1];
      
      if (next) {
        // Use quadratic bezier for smooth curves
        const cp1x = prev.x + (curr.x - prev.x) / 2;
        const cp1y = prev.y;
        const cp2x = curr.x - (next.x - curr.x) / 2;
        const cp2y = curr.y;
        
        path += ` Q ${cp1x} ${cp1y} ${curr.x} ${curr.y}`;
      } else {
        // Last point
        path += ` L ${curr.x} ${curr.y}`;
      }
    }
    
    return path;
  };

  const linePath = createSmoothPath(points);
  
  // Create area path (line + bottom border)
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartHeight} L ${points[0].x} ${chartHeight} Z`;

  return (
    <View style={[styles.container, { height }]}>
      <View style={styles.chartContainer}>
        <Svg width={chartWidth} height={chartHeight} style={styles.svg}>
          <Defs>
            <LinearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor={gradientColor} stopOpacity="0.3" />
              <Stop offset="100%" stopColor={gradientColor} stopOpacity="0.05" />
            </LinearGradient>
          </Defs>
          
          {/* Area fill */}
          <Path
            d={areaPath}
            fill="url(#gradient)"
          />
          
          {/* Line */}
          <Path
            d={linePath}
            stroke={color}
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </Svg>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f8fafc',
    borderRadius: 8,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  svg: {
    flex: 1,
  },
  flatLine: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    height: 2,
    width: '80%',
    borderRadius: 1,
  },
});