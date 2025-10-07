# FinWatch - Financial Stock Analysis Application

A professional financial application built with Expo and React Native, featuring real-time stock data, advanced charting capabilities, and comprehensive market analysis.

## Features

- **Real-time Stock Data**: Live stock prices and market data from Yahoo Finance API
- **Advanced Charts**: Professional trading charts using TradingView Lightweight Charts
- **Stock Screener**: Browse trending stocks and popular investments
- **Comprehensive Analysis**: Key statistics, 52-week ranges, and performance metrics
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Fallback Data**: Comprehensive mock data ensures the app always works

## Technology Stack

- **Framework**: Expo with React Native
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Charts**: TradingView Lightweight Charts
- **Data Source**: Yahoo Finance API with fallback mock data
- **Navigation**: Expo Router
- **Icons**: Expo Vector Icons

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npx expo start
   ```

3. **Run on different platforms**
   ```bash
   # Web
   npx expo start --web
   
   # iOS Simulator
   npx expo start --ios
   
   # Android Emulator
   npx expo start --android
   ```

## Project Structure

```
app/
  ├── _layout.tsx          # Root layout with navigation
  ├── index.tsx            # Home page with hero section
  ├── about.tsx            # About page
  ├── hot-products/        # Stock screener page
  └── product/[symbol].tsx # Stock detail page with charts

components/
  ├── navigation.tsx       # Navigation component
  ├── stock-card.tsx      # Stock card component
  ├── tradingview-chart.tsx # TradingView chart component
  └── mini-chart.tsx      # Mini chart component

lib/
  └── yahoo-finance.ts    # API service with fallback data
```

## Key Features

### Home Page
- Hero section with app description
- Feature cards highlighting capabilities
- Call-to-action buttons

### Hot Products Page
- Grid of stock cards with real-time data
- Mini chart previews
- Clickable navigation to detail pages

### Product Detail Page
- Interactive TradingView charts
- Multiple time periods (1D, 1W, 1M, 3M, 6M, 1Y)
- Key statistics and metrics
- 52-week range visualization
- Moving averages (MA 20, MA 50)

### Data Management
- Yahoo Finance API integration
- Comprehensive fallback mock data
- Error handling and loading states
- Real-time data updates

## Design System

- **Primary Color**: Deep blue (#0A2540)
- **Accent Color**: Teal (#00D4AA)
- **Typography**: Clean, professional fonts
- **Layout**: Mobile-first responsive design
- **Visual Style**: Professional, trustworthy aesthetic

## API Integration

The app integrates with Yahoo Finance API for real-time stock data. When the API is unavailable, comprehensive mock data ensures the app continues to function seamlessly.

## Charts

TradingView Lightweight Charts provide professional-grade charting capabilities:
- Area charts for price data
- Volume histograms with color coding
- Moving averages (20-day and 50-day)
- Interactive crosshairs and tooltips
- Responsive sizing

## Development

This project uses Expo Router for file-based routing and includes:
- TypeScript support
- ESLint configuration
- Responsive design patterns
- Error boundaries and loading states
- Platform-specific optimizations

## License

This project is for educational and demonstration purposes.